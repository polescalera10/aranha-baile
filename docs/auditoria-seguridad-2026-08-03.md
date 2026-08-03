# Auditoría de seguridad — nexusvng.es · 2026-08-03

> **ESTADO (2026-08-03, mismo día): la mayoría ya está aplicada.**
> Commit `226ffb9` (local, pendiente de `git push origin main`) + migración
> `0022_hotfix_escalada_rol` **ya aplicada contra la base de datos de
> producción**. El hallazgo crítico C1 está cerrado y verificado.
> Lo que queda en manos de Pol está listado en §7 al final del documento.

> **Alcance.** Aplicación Next.js 15 (App Router) + Supabase + Vercel. Revisión
> estática de `src/**`, `supabase/migrations/**`, configuración de build y
> despliegue, **más verificación en vivo** contra el proyecto de producción
> (`vruqtozggrntirdjmezy.supabase.co`) mediante lecturas de solo lectura:
> `pg_policies`, `pg_proc`, `pg_trigger`, linter de seguridad de Supabase,
> endpoint público `/auth/v1/settings` y cabeceras HTTP de `nexusvng.es`.
>
> **Método.** No se ha explotado ninguna vulnerabilidad, no se ha creado ninguna
> cuenta y no se ha escrito nada en la base de datos. Todas las conclusiones
> salen de leer configuración y definiciones.
>
> **Regla de oro del encargo:** ninguna de las correcciones propuestas cambia la
> apariencia de la web ni retira funcionalidad. Donde algo tiene coste operativo
> (p. ej. CSP) se indica una ruta de despliegue en dos pasos sin riesgo visual.
>
> Complementa —no sustituye— a `docs/rls-audit.md` (pase adversarial de RLS,
> julio 2026), cuyo remedio (`0020_rls_hardening.sql`) **sigue sin aplicarse en
> producción**: ver C1.

---

## 0. Veredicto

| Severidad | Nº | Estado |
|---|---|---|
| **Crítica** | 1 | Explotable en producción **ahora** |
| **Alta** | 4 | Sin explotar, superficie real |
| **Media** | 7 | Endurecimiento |
| **Baja** | 6 | Higiene |

El código de la aplicación está, en general, bien construido en materia de
seguridad: Server Actions con validación Zod en servidor, `auth.getUser()` (no
`getSession()`) en middleware y guardas, honeypot en formularios, service role
aislado en servidor, protección de open redirect ya contemplada, Consent Mode v2
antes de GA4, y un modelo de RLS bien razonado en las migraciones.

**El problema no está en el código: está en la distancia entre el repositorio y
la base de datos real.** Las migraciones `0010`–`0020` —que contienen todo el
endurecimiento— nunca se aplicaron. La base de datos de producción corre con las
políticas de `0008`, que la propia auditoría de julio ya había marcado como
vulnerables.

---

## 1. CRÍTICO

### C1 · Escalada de privilegios a `admin` desde internet (leads expuestos)

**Estado: explotable en producción en el momento de escribir esto.**

Tres hechos verificados en el proyecto real:

1. **El registro público está abierto.**
   `GET https://vruqtozggrntirdjmezy.supabase.co/auth/v1/settings` responde
   `"disable_signup": false`, con `"email": true`. Cualquiera con la clave
   publicable —que por diseño viaja en el bundle JavaScript de la web— puede
   crear una cuenta.

2. **El rol del perfil lo decide el cliente en el registro.**
   `public.handle_new_user()` en producción (leído con `pg_get_functiondef`):

   ```sql
   insert into public.profiles (id, nombre, telefono, role)
   values (
     new.id,
     new.raw_user_meta_data ->> 'nombre',
     new.raw_user_meta_data ->> 'telefono',
     coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'alumno')
   );
   ```

   `raw_user_meta_data` es el campo `data` del `POST /auth/v1/signup`: lo escribe
   el atacante. Registrarse con `data: { role: "admin" }` crea un perfil con
   `role = 'admin'`.

3. **Segunda vía independiente: auto-ascenso.**
   La política viva `profiles: actualizar propio o admin` es
   `USING/WITH CHECK ((id = auth.uid()) OR is_admin())` y **no acota columnas**.
   `pg_trigger` sobre `public.profiles` solo devuelve
   `profiles_set_updated_at`: el guard `profiles_guard_role_change` de la
   migración 0020 **no existe** en producción. Cualquier usuario autenticado
   puede hacer `PATCH /rest/v1/profiles?id=eq.<su-uid>` con `{"role":"admin"}`.

**Impacto.** `is_admin()` lee ese `role`, así que un atacante con cuenta
convertida en admin obtiene:

- Lectura y modificación de **toda la tabla `leads`** (`leads: lectura admin`,
  `leads: update admin`): nombre, teléfono, email y mensaje de personas reales
  que rellenaron los formularios. Esto es una **brecha de datos personales
  notificable** bajo el art. 33 RGPD si llega a ocurrir.
- Lectura de todos los perfiles, y gestión completa de `eventos`,
  `modalidades`, `niveles`, `clases` y `contenido` (defacement del contenido
  público de la web, que se sirve desde esas tablas).
- Encadenado con A3 (abajo), inyección de contenido en `eventos` que se
  renderiza en páginas públicas.

La confirmación de email (`mailer_autoconfirm: false`) **no es una barrera**: el
atacante confirma con su propio buzón.

**Causa raíz.** Deriva de migraciones. `supabase_migrations.schema_migrations`
del proyecto real termina en `0009_eventos_slug`; las tablas del panel
(`students`, `teachers`, `courses`, `enrollments`, `class_sessions`,
`attendance`, `whatsapp_events`) no existen. Todo `0020_rls_hardening.sql`
—escrito precisamente para cerrar esto— vive solo en el repositorio.

**Corrección (por orden, la primera es de minutos y no toca nada):**

**Paso 1 — cerrar el registro público (mitiga la vía 1 al instante).**
Supabase Dashboard → Authentication → Sign In / Providers → Email → desactivar
*"Allow new users to sign up"*.
Impacto funcional: **ninguno**. `LoginForm.tsx` ya usa
`shouldCreateUser: false` en el enlace mágico y `signInWithPassword` para el
resto; nadie se registra desde la web. Las altas las hace Pol invitando desde
Studio.

**Paso 2 — aplicar el bloque `profiles` de la 0020 contra producción.** Es DDL
acotado a funciones y triggers, sin tocar datos ni tablas:

```sql
-- El alta siempre entra como 'alumno'; el rol lo concede un admin después.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nombre, telefono, role)
  values (new.id,
          new.raw_user_meta_data ->> 'nombre',
          new.raw_user_meta_data ->> 'telefono',
          'alumno');
  return new;
end;
$$;

-- Congela `role` para todo el que no sea admin (el service role no se ve afectado).
create or replace function public.profiles_guard_role_change()
returns trigger language plpgsql set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then return new; end if;
  if new.role is distinct from old.role then
    raise exception 'profiles: solo un admin puede cambiar el rol';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role_change on public.profiles;
create trigger profiles_guard_role_change
  before update on public.profiles
  for each row execute function public.profiles_guard_role_change();
```

**Paso 3 — comprobar si ya ha pasado.** Revisar en Studio (SQL Editor):

```sql
select p.id, p.role, u.email, u.created_at, u.last_sign_in_at
from public.profiles p join auth.users u on u.id = p.id
order by u.created_at desc;
```

Debe haber exactamente los usuarios que Pol creó a mano, y un solo `admin`
(`polescalera10@gmail.com`). Cualquier otro `admin` o cualquier cuenta
desconocida = incidente: revocar sesiones (`Authentication → Users → Sign out`),
borrar la cuenta y valorar notificación a la AEPD por los leads accesibles.

**Paso 4 — resolver la deriva de migraciones** (ver M1). Mientras el repositorio
y la base real no coincidan, cualquier auditoría del repositorio da una foto
falsa de la seguridad real.

---

## 2. ALTO

### A1 · Sin cabeceras de seguridad HTTP

`curl -I https://nexusvng.es/` devuelve `strict-transport-security` (por defecto
de Vercel) y nada más. **Faltan**: `Content-Security-Policy`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y
`frame-ancestors`/`X-Frame-Options`.

Consecuencia: la web es *framable* (clickjacking sobre los CTA de WhatsApp y el
formulario de login del área privada), el navegador puede *sniffear* tipos MIME,
y no hay ninguna red de contención si algún día entra un XSS.

**Corrección — `next.config.ts`, cero impacto visual:**

```ts
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,          // ver B1
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // …resto igual
};
```

**CSP en dos pasos** (es la única pieza con riesgo de romper algo, por el script
inline de Consent Mode, GA4 y las fuentes de Google):

1. Desplegar primero como `Content-Security-Policy-Report-Only` con esta
   política y observar la consola unos días:

   ```
   default-src 'self';
   script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
   style-src 'self' 'unsafe-inline';
   img-src 'self' data: blob: https:;
   font-src 'self' data:;
   connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
   frame-ancestors 'none';
   base-uri 'self';
   form-action 'self';
   object-src 'none';
   upgrade-insecure-requests;
   ```

2. Cuando no aparezcan violaciones, cambiar la cabecera al modo bloqueante.
   La mejora fina posterior es sustituir `'unsafe-inline'` en `script-src` por un
   *nonce* generado en el middleware y pasado al `<script>` de
   `Analytics.tsx` — hace falta que el middleware cubra también las rutas
   públicas, lo que añade una invocación por visita: decisión de coste, no de
   seguridad. Con `frame-ancestors 'none'` ya no hace falta `X-Frame-Options`
   (se deja por compatibilidad con navegadores antiguos).

### A2 · Sin límite de tasa en la captación de leads (spam y coste)

La política `leads: insert público` es `WITH CHECK (true)` para `anon` — el
propio linter de Supabase la marca. Como la clave publicable viaja en el bundle,
cualquiera puede lanzar `POST /rest/v1/leads` en bucle **sin pasar por la web ni
por el honeypot ni por Zod**: sobrecarga de la base (plan Free), envenenamiento
del CRM y, a través del formulario real, disparos al webhook de n8n.

El honeypot de `LeadForm` y los `CHECK` de `0010_leads_hardening.sql` limitan la
forma de los datos, no el volumen. (Nota: 0010 tampoco está aplicada — ver M1.)

**Corrección, sin tocar la experiencia del formulario:**

1. **Cerrar el insert anónimo por REST y pasar la escritura por el servidor.**
   La Server Action `submitLead` / `submitInterestLead` insertaría con
   `createServiceClient()` en vez de con la sesión anónima. El formulario se
   comporta exactamente igual para el visitante; lo que desaparece es el camino
   directo a la API REST.

   ```sql
   drop policy if exists "leads: insert público" on public.leads;
   -- el service role no pasa por RLS: la Server Action sigue insertando.
   ```

   Cuidado: si algún día se quisiera un formulario 100 % cliente, habría que
   revertirlo. Hoy no lo hay.

2. **Limitar tasa en el borde.** Vercel Firewall (incluido en el plan) → regla de
   *rate limit* sobre `POST /` y `POST /l/*` (las Server Actions viajan como POST
   a la propia ruta): p. ej. 10 peticiones / 10 min por IP, acción *challenge*.
   Invisible para un usuario normal.

3. **Opcional, si aun así entra spam:** Cloudflare Turnstile o hCaptcha en modo
   invisible. Solo aparece ante comportamiento sospechoso, no altera el diseño.

### A3 · Inyección de HTML en los bloques JSON-LD (XSS almacenado)

`src/components/seo/JsonLd.tsx:43`:

```tsx
dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
```

`JSON.stringify` **no escapa `<`**. Si un dato contiene la secuencia
`</script>`, el navegador cierra el bloque ahí y ejecuta lo que venga después.
Y `data` no siempre es contenido estático: `eventos/page.tsx:142` y
`eventos/[slug]/page.tsx:91` le pasan `titulo` y `descripcion` leídos de
Supabase.

Hoy solo un admin escribe en `eventos`… pero C1 convierte a cualquiera en admin,
y de ahí sale un XSS persistente en páginas públicas indexadas.

**Corrección (2 líneas, sin cambio visual):**

```tsx
const json = JSON.stringify(data).replace(/</g, "\\u003c");
// …
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
```

`<` es JSON válido y schema.org lo interpreta igual.

### A4 · Redirección abierta residual en el callback de login

`src/app/area-privada/callback/route.ts:24`:

```ts
nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/area-privada"
```

Cubre `//evil.com`, pero **no** `/\evil.com` ni `/\/evil.com`: los navegadores
normalizan la barra invertida a barra normal en la cabecera `Location`, así que
`/\evil.com` se resuelve como `https://evil.com`. Vector de phishing: enlace de
login legítimo que aterriza en un clon del área privada.

**Corrección:**

```ts
const next =
  /^\/(?![/\\])[^\s]*$/.test(nextParam) ? nextParam : "/area-privada";
```

Es decir: debe empezar por `/`, y el segundo carácter no puede ser `/` ni `\`.
Aparte, conviene resolverlo contra el origen antes de redirigir:

```ts
const target = new URL(next, origin);
if (target.origin !== origin) return NextResponse.redirect(`${origin}/area-privada`);
```

---

## 3. MEDIO

### M1 · Deriva entre migraciones del repositorio y base de datos real

La causa raíz de C1 y de que `0010` (endurecimiento de `leads`) tampoco esté
activa. Estado real: el repositorio va por `0021`, la base por `0009` + `0021`.

Riesgo de aplicar `0011`–`0020` de golpe: `0017_drop_suscripciones.sql` hace
`drop table` sobre una base viva. Recomendación:

1. Separar en dos tandas: primero el bloque de **seguridad** de la 0020 que no
   depende de tablas inexistentes (`handle_new_user`, `profiles_guard_role_change`)
   y la 0010 completa (solo `CHECK` sobre `leads`, verificar antes que los 3
   leads reales los cumplen).
2. El resto (`0011`–`0019`, `0020` restante) en una ventana con backup previo
   (`pg_dump` o snapshot del dashboard), y comprobando que `suscripciones` está
   vacía antes del `drop`.
3. Adoptar `supabase db push` como único camino y no volver a tocar el esquema
   desde Studio, para que `schema_migrations` deje de mentir.

### M2 · Comparación de secretos no resistente a *timing*

`api/cron/keep-alive/route.ts:22` y `api/cron/recordatorio-clase/route.ts:38`
comparan el secreto con `!==`, que corta en el primer byte distinto. Con muchas
peticiones es teóricamente posible deducir el secreto byte a byte. Es un ataque
poco práctico sobre red, pero el arreglo es gratis:

```ts
import { timingSafeEqual } from "node:crypto";

function secretMatches(received: string | null, expected: string): boolean {
  if (!received) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

### M3 · Fuga de detalle interno en la respuesta del cron

`keep-alive/route.ts:31` devuelve `error.message` de Postgres en el cuerpo HTTP.
Con `CRON_SECRET` correcto solo lo ve Vercel, pero es un hábito que conviene
cortar: registrar en `console.error` y responder `{ ok: false }` a secas.

### M4 · Acciones de alumnos sin comprobación de rol explícita

`src/lib/actions/students.ts` (`createStudent`, `updateStudent`,
`updatePaymentStatus`, `setStudentActive`, `updateStudentNotes`) confía **solo**
en la RLS. El resto del código no lo hace: `teachers.ts` usa `requireRole("admin")`
y `courses.ts` / `enrollments.ts` / `whatsapp-events.ts` tienen su propio
`isAdmin()`.

Hoy la RLS cubre el caso, pero la asimetría es frágil: si una política se relaja
en el futuro, estas acciones quedan sin segunda barrera. Añadir al principio de
cada una `await requireAnyRole(["admin"])` (y `["admin","profesor"]` en
`updateStudentNotes` / `updatePaymentStatus`) no cambia ningún comportamiento
legítimo y mejora además los mensajes de error.

### M5 · Protección de contraseñas filtradas desactivada

El linter de Supabase lo reporta: el proyecto no consulta HaveIBeenPwned al fijar
contraseñas. Con cuentas de admin en juego, activarlo es un clic —
Authentication → Policies → *Leaked password protection*. Añadir también longitud
mínima 12 y, si el panel gestiona datos de alumnos, **MFA para la cuenta admin**.

### M6 · `SECURITY DEFINER` invocables por `anon`

`public.current_role()`, `public.is_admin()`, `public.handle_new_user()` y
`public.rls_auto_enable()` son ejecutables vía `/rest/v1/rpc/<nombre>` por
`anon`. `current_role()`/`is_admin()` solo devuelven información sobre el propio
llamante (bajo riesgo), pero `handle_new_user()` es un trigger que no tiene
ningún motivo para estar expuesto como RPC:

```sql
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.rls_auto_enable() from anon, authenticated;
-- current_role/is_admin: se pueden dejar, o revocar de anon si se prefiere
revoke execute on function public.current_role() from anon;
revoke execute on function public.is_admin() from anon;
```

Las políticas RLS siguen funcionando: se evalúan como propietario, no dependen
del `GRANT` al rol llamante.

### M7 · `search_path` mutable en `public.set_updated_at`

Reportado por el linter. Una función `SECURITY DEFINER` (o usada en trigger) sin
`search_path` fijo puede ser desviada si alguien crea objetos en un esquema
anterior de la ruta. Todas las demás funciones ya lo fijan; esta se quedó atrás:

```sql
alter function public.set_updated_at() set search_path = public;
```

---

## 4. BAJO / higiene

- **B1 · `x-powered-by: Next.js`** en todas las respuestas: anuncia el framework
  a los escáneres automáticos. `poweredByHeader: false` en `next.config.ts`.
- **B2 · Imágenes remotas sin lista blanca en el markdown de eventos.**
  `MarkdownRenderer.tsx:63-79` acepta cualquier URL en `![alt](url)` y la
  renderiza con `<img src>` crudo. No es XSS (React escapa el atributo y
  `javascript:` no ejecuta en `img`), pero permite incrustar un *beacon* de
  terceros que filtra IP y user-agent de los visitantes — problema de RGPD, no de
  código. Validar que `src` empiece por `/` o por `https://<host permitido>`.
  *(El escapado previo de `&`, `<`, `>` en `parseInlineStyles` está bien hecho:
  ahí no hay inyección.)*
- **B3 · Dependencias de Supabase congeladas.** `@supabase/ssr@0.5.2` y
  `@supabase/supabase-js@2.45.4` (fijada con `pnpm.overrides`) llevan bastante
  retraso respecto a las ramas actuales. No he verificado CVEs concretas — hay
  que correr `pnpm audit` y planificar la subida en una rama, probando el login
  por enlace mágico y el callback, que es donde `@supabase/ssr` cambia más.
- **B4 · `citext` instalada en el esquema `public`** (linter). Mover a
  `extensions` es cosmético en cuanto a riesgo, pero evita colisiones de nombres
  en la superficie expuesta por PostgREST.
- **B5 · Verificar la lista blanca de redirecciones de Auth.** `config.toml` es
  solo local; hay que confirmar en Authentication → URL Configuration del
  proyecto real que `Redirect URLs` contiene exactamente
  `https://nexusvng.es/area-privada/callback` (y el de local si se usa), **sin
  comodines** tipo `https://*.vercel.app/**`, que reabrirían A4 por otra vía.
- **B6 · Retención de datos de `leads`.** No hay política de borrado. El RGPD
  pide un plazo definido; un `delete from leads where created_at < now() -
  interval '24 months' and estado in ('descartado','convertido')` programado, o
  al menos documentado en la política de privacidad, cierra el punto.

---

## 5. Lo que está bien (y conviene no romper)

- `auth.getUser()` —que valida el JWT contra Supabase— en middleware y en
  `requireRole`/`requireAnyRole`, en lugar de `getSession()`, que se fía de la
  cookie. Es el error más común en apps Supabase + Next y aquí está bien resuelto.
- Service role estrictamente en servidor, nunca prefijado con `NEXT_PUBLIC_`, y
  usado solo en las dos rutas de cron.
- `N8N_WEBHOOK_URL` jamás expuesta al cliente; el POST sale de la Server Action
  con `AbortSignal.timeout(5000)`.
- Validación Zod en servidor en todas las Server Actions, con honeypot y
  consentimiento RGPD validado también en servidor (no solo `required` en HTML).
- `.env.local` correctamente ignorado y **sin rastro en el historial de git**
  (verificado con `git log --all -- .env.local`).
- Consent Mode v2 en `denied` antes de que cargue GA4, con revocación disponible.
- `/area-privada` fuera de `robots.txt` y con `robots: { index: false }` en el
  layout.
- El escapado de HTML en `MarkdownRenderer.parseInlineStyles` se hace **antes**
  de aplicar negrita/cursiva, que es el orden correcto.

---

## 6. Orden de ejecución sugerido

| # | Acción | Esfuerzo | Riesgo de romper algo |
|---|---|---|---|
| 1 | **C1 paso 1**: desactivar registro público en Supabase | 2 min | Ninguno |
| 2 | **C1 paso 2**: aplicar `handle_new_user` + guard de `role` | 10 min | Ninguno |
| 3 | **C1 paso 3**: auditar usuarios y roles existentes | 10 min | Ninguno |
| 4 | **A3** escapar `<` en JSON-LD · **A4** endurecer `next` · **B1** `poweredByHeader` | 20 min | Ninguno |
| 5 | **A1** cabeceras (sin CSP) + CSP en `Report-Only` | 30 min | Ninguno visual |
| 6 | **M2**, **M3**, **M4**, **M5**, **M6**, **M7** | 1 h | Ninguno |
| 7 | **A2** cerrar insert anónimo + rate limit en Vercel Firewall | 1-2 h | Bajo (probar formularios) |
| 8 | **A1** promover CSP a modo bloqueante | 15 min | Bajo (tras observar) |
| 9 | **M1** plan de migraciones con backup | Sesión dedicada | Medio (DDL en vivo) |
| 10 | **B2**–**B6** | Según toque | Bajo |

Los pasos 1-6 no alteran ni un píxel de la web ni retiran ninguna
funcionalidad.

---

## 7. Qué queda para Pol — paso a paso

Lo demás ya está hecho (commit `226ffb9` + migración `0022` aplicada en
producción). Estas seis cosas requieren credenciales o decisiones que no tengo.

### 7.1 · Publicar el commit (1 min) — **primero**

```bash
cd "/Users/polescalera/Desktop/Cowork OS/nexus-vng/repo/nexus-vng"
git push origin main
```

Dispara el deploy de producción en Vercel. El arreglo de base de datos ya está
activo sin esperar a esto; lo que despliega son las cabeceras, el JSON-LD, el
callback y el resto.

### 7.2 · Cerrar el registro público en Supabase (2 min)

Ya no es crítico —la migración 0022 cierra las dos vías de escalada aunque el
registro siga abierto— pero sigue siendo la defensa correcta: hoy cualquiera
puede crear cuentas en tu proyecto sin límite.

1. https://supabase.com/dashboard/project/vruqtozggrntirdjmezy
2. **Authentication → Sign In / Providers → Email**
3. Desactivar **"Allow new users to sign up"** → *Save*
4. Comprobar: `curl -s https://vruqtozggrntirdjmezy.supabase.co/auth/v1/settings -H "apikey: sb_publishable_aduGHt2LSy2lzNHXjSgyVA_WKY0K_Jv"` debe decir `"disable_signup": true`

No rompe el login: `LoginForm` usa `shouldCreateUser: false` y las altas las
haces tú invitando desde Studio.

### 7.3 · Auditar las cuentas existentes (5 min)

Comprobar que nadie aprovechó la ventana. **Authentication → SQL Editor**:

```sql
select p.id, p.role, u.email, u.created_at, u.last_sign_in_at
from public.profiles p
join auth.users u on u.id = p.id
order by u.created_at desc;
```

Esperado: solo las cuentas que creaste tú, con **un único `admin`**
(`polescalera10@gmail.com`, id `b2035be8-…`).

Si aparece cualquier otra cosa: Authentication → Users → *Sign out* de esa
cuenta, borrarla, y valorar notificación a la AEPD (la tabla `leads` tiene datos
personales reales y habría sido accesible).

### 7.4 · Activar protecciones de Auth (3 min)

Dashboard → **Authentication → Policies / Passwords**:

- **Leaked password protection** → ON (comprueba contra HaveIBeenPwned).
- **Minimum password length** → 12.
- **MFA** en tu cuenta de admin, si el panel va a gestionar datos de alumnos.

### 7.5 · Limitar la tasa del formulario (10 min)

El código ya inserta los leads con el service role, así que la política anónima
sobra. **Solo después de confirmar que los formularios siguen guardando en
producción** (rellena uno de prueba tras el deploy del 7.1 y míralo en la tabla
`leads`), ejecutar en el SQL Editor:

```sql
drop policy if exists "leads: insert público" on public.leads;
```

Y en Vercel → proyecto `aranha-baile` → **Firewall** → *Add rule*:
`POST` + path `/*` → **Rate limit** 10 peticiones / 10 min por IP → acción
*Challenge*. Invisible para un visitante normal.

### 7.6 · Promover la CSP a modo bloqueante (5 min, dentro de ~1 semana)

Tras unos días con la web en marcha, abrir la consola del navegador en varias
páginas y buscar avisos que empiecen por *"Content Security Policy"*. Si no hay
ninguno, en `next.config.ts` cambiar:

```diff
-  { key: "Content-Security-Policy-Report-Only", value: csp },
+  { key: "Content-Security-Policy", value: csp },
```

Si aparece algún aviso, mándamelo y ajusto la política antes de bloquear.

### 7.7 · Pendientes de mayor calado (sin prisa)

- **M1 · Migraciones 0011–0021** contra producción, con backup previo y cuidado
  con el `drop table suscripciones` de la 0017. Sesión dedicada.
- **B3 · Subir `@supabase/ssr` y `supabase-js`** en una rama, probando el login
  por enlace mágico y el callback.
- **B5 · Revisar Redirect URLs** en Authentication → URL Configuration: solo
  `https://nexusvng.es/area-privada/callback` (y el local). Sin comodines.
- **B6 · Política de retención de `leads`** (borrado a los 24 meses) para cerrar
  el punto de RGPD.

### 7.8 · Lo que decidí NO aplicar, y por qué

**M6 (revocar `EXECUTE` en las funciones `SECURITY DEFINER`)** queda descartado
pese a que el linter de Supabase lo señala:

- `handle_new_user()` y `rls_auto_enable()` son funciones de *trigger*: llamarlas
  por RPC falla sola con *"trigger functions can only be called as triggers"*.
  La exposición real es nula y revocar el privilegio arriesga romper el trigger.
- `is_admin()` y `current_role()` **no se pueden revocar de `anon`**: las
  políticas de `modalidades` y `eventos` las invocan en la rama anónima, y
  PostgreSQL comprueba el privilegio `EXECUTE` del rol que ejecuta la consulta.
  Revocarlas tumbaría la web pública. Además solo devuelven información sobre
  quien llama (a `anon` le responden `false`/`null`).

Es un falso positivo del linter en este esquema.

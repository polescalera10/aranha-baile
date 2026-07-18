# Aranha Baile

Dos aplicaciones en un mismo repo Next.js:

- **Web pública** — landing y páginas SEO de la escuela de baile Aranha (salsa cubana, bachata y más) en Vilanova i la Geltrú. Objetivo nº1: convertir visitas en mensajes de WhatsApp.
- **Panel interno** (`/area-privada`) — gestión de la escuela: alumnos, cursos con aforo separado leader/follower y lista de espera, profesores, pasar lista desde el móvil y comunicación por WhatsApp vía n8n.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript estricto) |
| Estilos | Tailwind CSS v4 — design tokens en `src/app/globals.css` (`@theme`) |
| Backend / Auth | Supabase (Postgres + Auth + RLS) via `@supabase/ssr` |
| Validación | Zod + Server Actions |
| Animación | Framer Motion (respeta `prefers-reduced-motion`) |
| Mensajería | n8n autohospedado + WhatsApp Cloud API (la app nunca llama a Meta) |
| Paquetes | pnpm |

## Requisitos

- **Node.js** 20+ (Next 15 exige ≥ 18.18)
- **pnpm** 10 (el repo fija `pnpm@10.33.0` en `packageManager`)
- **Docker Desktop** + **Supabase CLI** — para la base de datos local (`supabase start` levanta Postgres, Auth y Studio en contenedores)

## Setup local desde cero

```bash
git clone <url-del-repo> && cd aranha-baile
pnpm install
cp .env.example .env.local
supabase start        # levanta la BD local; imprime URL y claves
pnpm db:reset         # aplica migraciones 0001-0019 + supabase/seed.sql
pnpm dev              # http://localhost:3000
```

La web pública compila y se ve **sin Supabase**: las modalidades caen a un fallback estático (`src/content/landing.ts`) si faltan las variables. El panel interno sí necesita la BD.

### Variables de entorno (`.env.local`)

| Variable | Ámbito | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | público | URL del proyecto Supabase. En local, la "API URL" que imprime `supabase start` (`http://127.0.0.1:54321`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | público | Anon key. En local, la que imprime `supabase start`. |
| `SUPABASE_SERVICE_ROLE_KEY` | **solo servidor** | Service role — salta RLS. La usan la ruta cron y queries de admin. Nunca prefijarla con `NEXT_PUBLIC_`. |
| `N8N_WEBHOOK_URL` | **solo servidor** | Webhook de n8n que recibe leads del formulario público y todos los eventos WhatsApp del panel. Si falta, la app lo avisa por consola y omite el POST (no rompe nada). |
| `CRON_SECRET` | **solo servidor** | Secreto compartido del cron de recordatorios. Quien llame a `/api/cron/recordatorio-clase` debe enviarlo en el header `x-cron-secret`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | público | Teléfono de WhatsApp de la escuela, internacional sin `+` ni espacios (ej: `34600000000`). CTA de la web pública. |
| `NEXT_PUBLIC_SITE_URL` | público | URL canónica (metadata, sitemap, OpenGraph). |

### Crear el primer admin

No hay registro público: `/area-privada` solo tiene login (email + contraseña). El primer usuario se crea a mano:

1. Abre Supabase Studio (local: `http://localhost:54323`) → **Authentication → Add user** → crea el usuario con email confirmado y contraseña.
2. Un trigger crea automáticamente su fila en `profiles` con `role = 'alumno'`.
3. En **Table Editor → profiles**, cambia su `role` a `admin`.
4. Entra en `http://localhost:3000/area-privada` — el middleware te redirige a `/area-privada/admin`.

Para dar acceso a un profesor: mismo proceso con `role = 'profesor'`, y vincula su fila de `teachers` poniendo `teachers.profile_id` = id del usuario.

### Tipos de la BD

`src/types/database.ts` está **escrito a mano** espejando las migraciones (exporta tipos con nombre: `Student`, `Course`, `WhatsappEventType`…). Existe `pnpm db:types`, que **sobrescribe** ese archivo con el formato generado por `supabase gen types` (interfaz `Database`), distinto del que consume el código. Si cambias el esquema, lo normal es actualizar los tipos a mano junto con la migración; usa `db:types` solo si vas a migrar el proyecto al formato generado.

## Panel interno

### Rutas y roles

| Ruta | Rol | Qué es |
|---|---|---|
| `/area-privada` | — | Login. Redirige por rol tras autenticar. |
| `/area-privada/admin` | admin | Inicio: accesos a los módulos. |
| `/area-privada/admin/alumnos` | admin | Lista con filtros + alta (`/nuevo`), ficha (`/[id]`), edición (`/[id]/editar`) e inactivos (`/inactivos`: sin asistencia en 14 días). |
| `/area-privada/admin/cursos` | admin | CRUD de cursos, aforo leader/follower, matrículas, lista de espera y sesiones. |
| `/area-privada/admin/profesores` | admin | CRUD de profesores, cursos asignados y horas impartidas. |
| `/area-privada/admin/whatsapp` | admin | Log de `whatsapp_events` + composer de broadcast por curso o nivel. |
| `/area-privada/profesor` | profesor | "Hoy": agenda de sesiones del día con acceso directo a pasar lista. |
| `/area-privada/profesor/asistencia/[sessionId]` | profesor | Pasar lista (mobile-first): toggles presente/ausente; al guardar, la sesión pasa a `impartida`. |
| `/area-privada/profesor/cursos` | profesor | Mis cursos y sus alumnos (`/alumnos/[id]` para la ficha). |

El rol `alumno` existe en el enum pero no tiene panel en el MVP (roadmap). `middleware.ts` refresca la sesión y protege `/area-privada/**`. RLS respalda todo: el admin ve todo; el profesor solo sus cursos, sesiones (incluidas sustituciones), matrículas, asistencia y las fichas de sus alumnos (`supabase/migrations/0019_rls_dashboard.sql`).

### Flujo de la métrica de éxito

1. **Alta de alumno** — `/area-privada/admin/alumnos/nuevo` (rol de baile, nivel, pareja, estado de cuota manual).
2. **Matricular en un curso** — desde el detalle del curso, eligiendo rol leader/follower. Si el aforo de ese rol está lleno, entra en `lista_espera`; al promoverlo se dispara `confirmacion_lista_espera` por WhatsApp.
3. **Pasar lista** — el profesor abre `/area-privada/profesor`, toca la sesión de hoy y marca presentes. Guardar marca la sesión como `impartida` y alimenta la detección de inactivos.
4. **Recordatorio WhatsApp** — el cron diario genera las sesiones de mañana y despacha un `recordatorio_clase` por alumno matriculado.

## Integración n8n / WhatsApp

**La app nunca llama a Meta/WhatsApp.** Cada evento: (1) inserta una fila en `whatsapp_events` con `status = 'pendiente'`, (2) hace POST a `N8N_WEBHOOK_URL`, (3) 2xx → `enviado` + `sent_at`; fallo → `error`. `enviado` significa "entregado a n8n", no entrega real del mensaje. El despacho es best-effort: un fallo del webhook nunca revierte la operación de negocio (código en `src/lib/whatsapp/dispatch.ts` y `src/lib/n8n/client.ts`).

Shape del POST (común a todos los tipos):

```json
{
  "event_id": "uuid de whatsapp_events.id (clave de idempotencia)",
  "type": "recordatorio_clase | cuota_pendiente | alumno_inactivo | confirmacion_lista_espera | broadcast",
  "student_id": "uuid o null",
  "payload": { "…claves según el tipo…" },
  "created_at": "ISO 8601"
}
```

El contrato completo de `payload` por tipo de evento está en **`docs/whatsapp-contracts.md`** — es la referencia para montar los flujos de n8n. Ojo: el formulario público de leads hace POST a la misma URL con otro shape (sin `event_id` ni `type`); distingue ambos casos en el flujo de entrada.

### Conectar n8n

1. Crea un workflow en n8n con un nodo **Webhook** (método POST) y copia su URL de producción en `N8N_WEBHOOK_URL`.
2. En ese workflow, enruta por `type` (y por `payload.kind` dentro de `broadcast`) y envía la plantilla correspondiente por WhatsApp Cloud API. Usa `event_id` como clave de idempotencia.
3. **Cron de recordatorios**: añade un segundo workflow con nodo **Schedule** (diario, p. ej. 10:00 Europe/Madrid) que haga:

   ```
   GET https://<tu-app>/api/cron/recordatorio-clase
   Header: x-cron-secret: <CRON_SECRET>
   ```

   Sirve cualquier cron externo (no tiene por qué ser n8n). La ruta es idempotente: reejecutarla el mismo día no duplica recordatorios (responde `{ sessions, dispatched, skipped }`).

### Probar sin n8n

1. Abre [webhook.site](https://webhook.site) y pon su URL única como `N8N_WEBHOOK_URL` en `.env.local`.
2. Dispara cualquier acción del panel (p. ej. "Avisar por WhatsApp" en un alumno con cuota pendiente) y mira el JSON recibido.
3. Prueba el cron a mano:

   ```bash
   curl -H "x-cron-secret: tu-cron-secret" http://localhost:3000/api/cron/recordatorio-clase
   ```

## Scripts

| Script | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo (`http://localhost:3000`). |
| `pnpm build` | Build de producción. |
| `pnpm start` | Sirve el build. |
| `pnpm lint` | ESLint (`next lint`). |
| `pnpm format` | Prettier sobre todo el repo. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm db:reset` | `supabase db reset` — recrea la BD local: migraciones + seed. |
| `pnpm db:push` | `supabase db push` — empuja migraciones al proyecto Supabase vinculado. |
| `pnpm db:types` | Regenera `src/types/database.ts` desde la BD local (ver aviso en "Tipos de la BD"). |

## Estructura

```
src/
├── app/
│   ├── (public)/                    landing + páginas SEO (ISR)
│   ├── area-privada/
│   │   ├── page.tsx · LoginForm     login (Supabase Auth)
│   │   └── (dashboard)/
│   │       ├── admin/               alumnos · cursos · profesores · whatsapp
│   │       └── profesor/            hoy · asistencia/[sessionId] · cursos · alumnos
│   ├── api/cron/recordatorio-clase/ endpoint del cron diario
│   └── globals.css                  TOKENS de diseño (@theme)
├── components/    area · forms · landing · layout · seo · ui
├── lib/
│   ├── actions/   Server Actions (students, courses, enrollments, attendance, teachers, whatsapp-events, leads)
│   ├── queries/   lecturas (queries planas, composición en JS)
│   ├── supabase/  clientes server / browser / service role
│   ├── n8n/       client.ts (POST al webhook)
│   ├── whatsapp/  dispatch.ts (tabla + webhook)
│   └── auth.ts · format.ts · validation/ · site.ts
├── content/       copy de la landing (fallback sin BD)
└── types/         database.ts (tipos a mano)
supabase/
├── migrations/    0001-0019 (web pública: 0001-0010 · panel: 0011-0019)
└── seed.sql       datos base + bloque de datos de prueba (solo local)
docs/whatsapp-contracts.md   contrato de payloads app → n8n
design-reference/            prototipos y chats del diseño original
```

## Convenciones para contribuir

- **Tokens de diseño**: nada de colores sueltos en JSX. Todo vía tokens de `@theme` en `globals.css` (`ink`, `red`, `gold`, `warm`, jerarquía de texto).
- **Mutaciones = Server Actions + Zod**: validación en servidor siempre (`src/lib/actions/` + `src/lib/validation/`).
- **Nada de embeds PostgREST**: queries planas (`select` simples por tabla) y composición en JS con `Map`. Evita `select("*, tabla_relacionada(*)")`.
- **Weekday**: convención del proyecto `1 = Lunes … 7 = Domingo` (helpers en `src/lib/format.ts`). Ojo al convertir desde `Date.getDay()` (0 = Domingo).
- **RLS es la barrera real**: la UI oculta, pero la seguridad la imponen las policies (0008 y 0019). Toda tabla nueva lleva RLS y policies documentadas en su migración.
- **Tipos**: `src/types/database.ts` se mantiene a mano en sincronía con las migraciones (ver "Tipos de la BD").
- **Mobile-first** en el panel: el profesor pasa lista con el móvil, el admin trabaja en desktop.

## Deploy

- **App**: Vercel. Configura en el proyecto todas las variables de `.env.example` con los valores de producción.
- **BD**: proyecto de Supabase cloud. Vincula (`supabase link --project-ref <ref>`) y aplica migraciones con `pnpm db:push`.
- **Seed en producción**: `supabase/seed.sql` tiene dos bloques — datos base (modalidades + niveles, necesarios) y **datos de prueba del panel** (profesores/alumnos/cursos ficticios). El propio archivo avisa: vacía el bloque de prueba antes del primer deploy; en producción solo deben entrar los datos base.
- **Cron**: apunta el Schedule de n8n a la URL de producción con el `CRON_SECRET` de producción.
- `/area-privada/**` es NOINDEX; `sitemap.xml` y `robots.txt` se generan desde `NEXT_PUBLIC_SITE_URL`.

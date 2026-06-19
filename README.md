# Aranha Baile

Web pública de la escuela de baile **Aranha** (salsa cubana, bachata y más) en Vilanova i la Geltrú.
Objetivo nº1: convertir visitas en mensajes de **WhatsApp**. Construida sobre Supabase con el
esquema preparado para crecer hacia un área privada con roles (alumno · profesor · admin).

## Stack

- **Next.js 15** (App Router, TypeScript estricto) — público en SSG/ISR, área privada dinámica.
- **Tailwind CSS v4** — design tokens centralizados en `src/app/globals.css` (`@theme`).
- **Supabase** — Postgres + Auth + RLS + Storage (`@supabase/ssr`).
- **Framer Motion** — scroll reveal y microinteracciones (respeta `prefers-reduced-motion`).
- **Zod** — validación en servidor. **Server Actions** para formularios.
- **pnpm** · ESLint · Prettier.

## Arranque

```bash
pnpm install
cp .env.example .env.local   # rellena las variables
pnpm dev                     # http://localhost:3000
```

La web compila y se ve **sin Supabase**: las modalidades caen a un fallback estático
(`src/content/landing.ts`) si no hay variables de entorno.

### Variables de entorno

| Variable | Ámbito | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | público | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | público | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **solo servidor** | Service role (salta RLS) |
| `N8N_WEBHOOK_URL` | **solo servidor** | Webhook n8n (email + WhatsApp) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | público | Teléfono WhatsApp (ej: `34600000000`) |
| `NEXT_PUBLIC_SITE_URL` | público | URL canónica (metadata/sitemap) |

## Supabase

Migraciones versionadas en `supabase/migrations/` y datos base en `supabase/seed.sql`.

```bash
supabase start            # entorno local
pnpm db:reset             # aplica migraciones + seed
pnpm db:push              # empuja migraciones al proyecto vinculado
pnpm db:types             # regenera src/types/database.ts desde la BD
```

Esquema: `profiles` (roles + trigger de alta), `leads` (insert público, lectura admin),
`modalidades`, `niveles`, `clases`, `inscripciones`, `suscripciones` (seguimiento, sin pago),
`asistencia`, `contenido`, `eventos`. **RLS** activado en todas las tablas (`0008_rls_policies.sql`):
anon solo inserta leads y lee catálogo público; alumno ve lo suyo; profesor gestiona sus clases;
admin todo.

## Mapa de rutas

```
/                          Landing (objetivo WhatsApp)               público · ISR
/clases/[modalidad]        Página por modalidad (generateStaticParams) público · ISR
/profesores · /profesores/[slug]                                      público
/horarios /eventos /sobre-nosotros /contacto /faq                     público
/aviso-legal /privacidad /cookies                                     público
/area-privada              Login (Supabase Auth) → redirige por rol    NOINDEX
/area-privada/{alumno|profesor|admin}   Placeholder protegido          NOINDEX
sitemap.xml · robots.txt
```

`middleware.ts` refresca la sesión y protege `/area-privada/**` (redirige al login sin sesión y al
panel correcto según rol).

## Formularios → CRM

Los formularios (clase de prueba, founding, contacto) usan una **Server Action**
(`src/lib/actions/leads.ts`): validan con Zod → insertan en `leads` → hacen `POST` al webhook de
n8n (que gestiona email + WhatsApp). El webhook nunca se expone al cliente.

## Estructura

```
src/
├── app/
│   ├── (public)/        landing + páginas SEO (layout con footer + sticky WA)
│   ├── area-privada/    login + paneles por rol
│   ├── layout.tsx       fuentes (next/font) + JSON-LD LocalBusiness
│   ├── sitemap.ts robots.ts globals.css (TOKENS)
├── components/  landing · layout · ui · forms · seo · area
├── lib/         supabase · actions · validation · queries · whatsapp · site · auth
├── content/     copy de la landing (placeholder)
└── types/       database.ts
supabase/migrations · supabase/seed.sql
design-reference/    bundle original de Claude Design (prototipo + chats)
```

## Tokens de diseño

Toda la marca vive en `@theme` (`globals.css`): colores (`ink`, `red`, `gold`, `warm`, fondos
cálidos, jerarquía de texto), tipografías (`font-display` Anton, `font-body` Inter), radios y
sombras. **Regla:** nada de colores sueltos en JSX, siempre vía token.

## i18n

Estructura lista para añadir catalán (CA) con `hreflang` más adelante. ES por defecto; sin traducir
todavía.

## Pendiente / PLACEHOLDER

Buscar `PLACEHOLDER` en el código: copy final, fotografía real a color, NAP (dirección/teléfono),
redes sociales, textos legales y datos del bloque Founding.

-- ════════════════════════════════════════════════════════════════════════════
-- 0003 · modalidades + niveles
--   modalidades alimentan las rutas /clases/[modalidad] (generateStaticParams).
-- ════════════════════════════════════════════════════════════════════════════

create table public.modalidades (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  nombre      text not null,
  descripcion text,
  orden       integer not null default 0,
  activo      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index modalidades_activo_orden_idx on public.modalidades (activo, orden);

create trigger modalidades_set_updated_at
  before update on public.modalidades
  for each row execute function public.set_updated_at();

create table public.niveles (
  id     uuid primary key default gen_random_uuid(),
  nombre text not null,
  orden  integer not null default 0
);

comment on table public.modalidades is 'Salsa cubana, bachata, reparto, reggaeton, lady style, heels…';
comment on table public.niveles is 'Cero absoluto → avanzado.';

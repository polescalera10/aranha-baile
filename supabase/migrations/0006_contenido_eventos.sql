-- ════════════════════════════════════════════════════════════════════════════
-- 0006 · contenido + eventos
-- ════════════════════════════════════════════════════════════════════════════

create type public.contenido_tipo as enum ('video', 'comentario', 'fiesta', 'evento');

create table public.contenido (
  id           uuid primary key default gen_random_uuid(),
  tipo         public.contenido_tipo not null,
  modalidad_id uuid references public.modalidades (id) on delete set null,
  clase_id     uuid references public.clases (id) on delete set null,
  titulo       text not null,
  url          text,
  body         text,
  created_by   uuid references public.profiles (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index contenido_modalidad_idx on public.contenido (modalidad_id);
create index contenido_clase_idx on public.contenido (clase_id);

create trigger contenido_set_updated_at
  before update on public.contenido
  for each row execute function public.set_updated_at();

create type public.evento_tipo as enum ('fiesta', 'masterclass', 'social', 'otro');

create table public.eventos (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  descripcion text,
  fecha       timestamptz not null,
  tipo        public.evento_tipo not null default 'social',
  publico     boolean not null default true, -- true: se muestra en /eventos · false: interno
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index eventos_publico_fecha_idx on public.eventos (publico, fecha);

create trigger eventos_set_updated_at
  before update on public.eventos
  for each row execute function public.set_updated_at();

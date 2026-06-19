-- ════════════════════════════════════════════════════════════════════════════
-- 0005 · suscripciones (seguimiento, NO pago) + asistencia
--   Lógica de negocio: 1 modalidad = 1 clase semanal; cada mes hay un crédito
--   gastable en otra modalidad distinta.
-- ════════════════════════════════════════════════════════════════════════════

create type public.plan_tipo as enum ('1_modalidad', '2_modalidades');

create table public.suscripciones (
  id                 uuid primary key default gen_random_uuid(),
  alumno_id          uuid not null references public.profiles (id) on delete cascade,
  plan               public.plan_tipo not null default '1_modalidad',
  creditos_mensuales smallint not null default 1 check (creditos_mensuales >= 0),
  activa             boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index suscripciones_alumno_idx on public.suscripciones (alumno_id);

create trigger suscripciones_set_updated_at
  before update on public.suscripciones
  for each row execute function public.set_updated_at();

create table public.asistencia (
  id         uuid primary key default gen_random_uuid(),
  alumno_id  uuid not null references public.profiles (id) on delete cascade,
  clase_id   uuid not null references public.clases (id) on delete cascade,
  fecha      date not null default current_date,
  presente   boolean not null default false,
  created_at timestamptz not null default now(),
  unique (alumno_id, clase_id, fecha)
);

create index asistencia_alumno_idx on public.asistencia (alumno_id);
create index asistencia_clase_fecha_idx on public.asistencia (clase_id, fecha);

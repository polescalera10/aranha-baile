-- ════════════════════════════════════════════════════════════════════════════
-- 0004 · clases + inscripciones
-- ════════════════════════════════════════════════════════════════════════════

create table public.clases (
  id           uuid primary key default gen_random_uuid(),
  modalidad_id uuid not null references public.modalidades (id) on delete cascade,
  nivel_id     uuid references public.niveles (id) on delete set null,
  profesor_id  uuid references public.profiles (id) on delete set null,
  dia_semana   smallint not null check (dia_semana between 1 and 7), -- 1=Lun … 7=Dom
  hora         time not null,
  plazas_total smallint not null default 12 check (plazas_total >= 0),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index clases_modalidad_idx on public.clases (modalidad_id);
create index clases_profesor_idx on public.clases (profesor_id);

create trigger clases_set_updated_at
  before update on public.clases
  for each row execute function public.set_updated_at();

-- Estado de una inscripción de alumno a una clase.
create type public.inscripcion_estado as enum ('activa', 'pausada', 'baja');

create table public.inscripciones (
  id         uuid primary key default gen_random_uuid(),
  alumno_id  uuid not null references public.profiles (id) on delete cascade,
  clase_id   uuid not null references public.clases (id) on delete cascade,
  estado     public.inscripcion_estado not null default 'activa',
  created_at timestamptz not null default now(),
  unique (alumno_id, clase_id)
);

create index inscripciones_alumno_idx on public.inscripciones (alumno_id);
create index inscripciones_clase_idx on public.inscripciones (clase_id);

-- ════════════════════════════════════════════════════════════════════════════
-- 0012 · teachers
--   Profesores como entidad propia. `profile_id` nullable: un profe puede
--   existir sin login (lo gestiona el admin); si tiene login, se vincula a
--   `profiles`. Backfill desde los profiles con role='profesor' existentes.
-- ════════════════════════════════════════════════════════════════════════════

create table public.teachers (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid references public.profiles (id) on delete set null,
  full_name           text not null,
  phone               text, -- E.164
  disciplines         text[] not null default '{}', -- valores = modalidades.slug, p.ej. {'salsa-cubana','bachata'}
  weekly_availability jsonb not null default '{}',
  active              boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on column public.teachers.weekly_availability is
  'Bloques de disponibilidad por día. Forma: {"mon":[{"start":"18:00","end":"21:00"}],"tue":[],...} con claves mon..sun.';

-- 1 fila de teachers por profile como máximo, sin bloquear varios profes sin login.
create unique index teachers_profile_id_key
  on public.teachers (profile_id)
  where profile_id is not null;

create index teachers_active_idx on public.teachers (active);

create trigger teachers_set_updated_at
  before update on public.teachers
  for each row execute function public.set_updated_at();

-- Backfill: cada profile profesor existente obtiene su fila de teachers.
insert into public.teachers (profile_id, full_name, phone)
select id, coalesce(nombre, 'Profesor sin nombre'), telefono
from public.profiles
where role = 'profesor'
on conflict do nothing;

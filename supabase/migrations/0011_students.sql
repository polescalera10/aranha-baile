-- ════════════════════════════════════════════════════════════════════════════
-- 0011 · students
--   Alumnos como entidad CRM propia, SIN login (el rol `alumno` de profiles
--   queda reservado para el roadmap). Nivel vía FK a `niveles` (catálogo vivo),
--   pareja como autorreferencia, estado de cuota manual (sin pagos en MVP).
-- ════════════════════════════════════════════════════════════════════════════

create type public.dance_role as enum ('leader', 'follower', 'both');
create type public.payment_status as enum ('al_dia', 'pendiente');

create table public.students (
  id                 uuid primary key default gen_random_uuid(),
  full_name          text not null,
  phone              text not null, -- E.164, p.ej. +34600000000
  email              text,
  dance_role         public.dance_role not null,
  nivel_id           uuid references public.niveles (id) on delete set null,
  partner_id         uuid references public.students (id) on delete set null,
  payment_status     public.payment_status not null default 'pendiente',
  is_founding_member boolean not null default false,
  notes              text, -- notas privadas del profe (lesiones, observaciones)
  active             boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index students_partner_idx on public.students (partner_id);
create index students_nivel_idx on public.students (nivel_id);
create index students_active_idx on public.students (active);

create trigger students_set_updated_at
  before update on public.students
  for each row execute function public.set_updated_at();

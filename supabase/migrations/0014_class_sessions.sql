-- ════════════════════════════════════════════════════════════════════════════
-- 0014 · class_sessions
--   Instancia concreta de un curso en una fecha. Se generan desde el horario
--   semanal del curso (Server Action / job diario). La asistencia y las
--   sustituciones cuelgan de aquí, no del curso.
-- ════════════════════════════════════════════════════════════════════════════

create type public.session_status as enum ('programada', 'impartida', 'cancelada');

create table public.class_sessions (
  id                    uuid primary key default gen_random_uuid(),
  course_id             uuid not null references public.courses (id) on delete cascade,
  session_date          date not null,
  status                public.session_status not null default 'programada',
  substitute_teacher_id uuid references public.teachers (id) on delete set null,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (course_id, session_date)
);

create index class_sessions_course_idx on public.class_sessions (course_id);
create index class_sessions_date_idx on public.class_sessions (session_date, status);

create trigger class_sessions_set_updated_at
  before update on public.class_sessions
  for each row execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════════════════════
-- 0016 · asistencia → attendance
--   La asistencia deja de ser (alumno, clase, fecha) y pasa a colgar de una
--   `class_session` concreta. `recorded_by` guarda quién pasó lista
--   (nullable: si se borra el perfil no se pierde el histórico).
-- ════════════════════════════════════════════════════════════════════════════

drop policy if exists "asistencia: alumno ve la suya / profesor de su clase / admin" on public.asistencia;
drop policy if exists "asistencia: profesor de la clase registra / admin" on public.asistencia;

alter table public.asistencia rename to attendance;

-- Nueva dimensión: la sesión concreta.
alter table public.attendance add column class_session_id uuid references public.class_sessions (id) on delete cascade;

-- Fuera las dimensiones antiguas (tabla sin datos reales: sin backfill).
alter table public.attendance drop constraint asistencia_alumno_id_clase_id_fecha_key;
drop index if exists asistencia_clase_fecha_idx;
alter table public.attendance drop column clase_id;
alter table public.attendance drop column fecha;

alter table public.attendance alter column class_session_id set not null;

-- Retarget del FK: profiles → students.
alter table public.attendance drop constraint asistencia_alumno_id_fkey;
alter table public.attendance rename column alumno_id to student_id;
alter table public.attendance
  add constraint attendance_student_id_fkey
  foreign key (student_id) references public.students (id) on delete cascade;

alter table public.attendance rename column presente to present;
alter table public.attendance rename column created_at to recorded_at;
alter table public.attendance add column recorded_by uuid references public.profiles (id) on delete set null;

alter table public.attendance
  add constraint attendance_session_student_key unique (class_session_id, student_id);

alter index asistencia_alumno_idx rename to attendance_student_idx;
create index attendance_session_idx on public.attendance (class_session_id);

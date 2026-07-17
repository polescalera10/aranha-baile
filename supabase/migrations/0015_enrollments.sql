-- ════════════════════════════════════════════════════════════════════════════
-- 0015 · inscripciones → enrollments
--   La matrícula pasa a colgar de `students` (alumnos sin login) en vez de
--   `profiles`. Se añade el rol dentro del curso (leader/follower) y el
--   estado `lista_espera` al enum existente (se conserva `pausada`: pausa
--   temporal sin baja; no cuenta contra aforo).
--   El control de aforo por rol vive en la Server Action de matrícula.
-- ════════════════════════════════════════════════════════════════════════════

drop policy if exists "inscripciones: alumno ve lo suyo / profesor de su clase / admin" on public.inscripciones;
drop policy if exists "inscripciones: alumno gestiona la suya" on public.inscripciones;

alter table public.inscripciones rename to enrollments;

-- Retarget del FK: profiles → students.
alter table public.enrollments drop constraint inscripciones_alumno_id_fkey;
alter table public.enrollments rename column alumno_id to student_id;
alter table public.enrollments
  add constraint enrollments_student_id_fkey
  foreign key (student_id) references public.students (id) on delete cascade;

alter table public.enrollments rename column clase_id to course_id;
alter table public.enrollments rename column estado to status;
alter table public.enrollments rename column created_at to enrolled_at;

create type public.enrollment_role as enum ('leader', 'follower');
alter table public.enrollments add column role_in_course public.enrollment_role not null default 'leader';
alter table public.enrollments alter column role_in_course drop default; -- la app lo indica siempre

alter type public.inscripcion_estado add value 'lista_espera';

alter index inscripciones_alumno_idx rename to enrollments_student_idx;
alter index inscripciones_clase_idx rename to enrollments_course_idx;

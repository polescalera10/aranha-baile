-- ════════════════════════════════════════════════════════════════════════════
-- 0019 · Row Level Security del panel interno
--   Modelo (helpers public.current_role / public.is_admin definidos en 0002):
--     · admin    → acceso total a todo.
--     · profesor → ve/gestiona sus cursos, sus sesiones (también las que
--                  cubre como sustituto), la matrícula y asistencia de esos
--                  cursos, y las fichas de sus alumnos (incl. actualizar
--                  notas y estado de cuota).
--     · profesor sin login (teachers.profile_id null) → sus filas solo son
--                  alcanzables por la rama is_admin(): comparar con
--                  auth.uid() da NULL y nunca concede acceso.
--     · alumno   → sin acceso al panel en el MVP (rol reservado al roadmap).
--   Las políticas antiguas de clases/inscripciones/asistencia se retiraron
--   en 0013/0015/0016; las de suscripciones cayeron con la tabla en 0017.
-- ════════════════════════════════════════════════════════════════════════════

alter table public.students        enable row level security;
alter table public.teachers        enable row level security;
alter table public.class_sessions  enable row level security;
alter table public.whatsapp_events enable row level security;
-- courses / enrollments / attendance ya tenían RLS activado desde 0008
-- (el rename de tabla lo conserva); aquí solo se definen políticas nuevas.

-- ── students ─────────────────────────────────────────────────────────────────
-- Lectura: admin, o profesor con el alumno matriculado en un curso suyo, o
-- profesor sustituto de una sesión de un curso donde está matriculado.
create policy "students: lectura profesor con matrícula / admin"
  on public.students for select
  using (
    public.is_admin()
    or exists (
      select 1
      from public.enrollments e
      join public.courses c on c.id = e.course_id
      join public.teachers t on t.id = c.teacher_id
      where e.student_id = students.id and t.profile_id = auth.uid()
    )
    or exists (
      select 1
      from public.enrollments e
      join public.class_sessions cs on cs.course_id = e.course_id
      join public.teachers t on t.id = cs.substitute_teacher_id
      where e.student_id = students.id and t.profile_id = auth.uid()
    )
  );

-- El profe puede actualizar la ficha de sus alumnos (notas, estado de cuota).
create policy "students: profesor actualiza sus alumnos"
  on public.students for update
  using (
    exists (
      select 1
      from public.enrollments e
      join public.courses c on c.id = e.course_id
      join public.teachers t on t.id = c.teacher_id
      where e.student_id = students.id and t.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.enrollments e
      join public.courses c on c.id = e.course_id
      join public.teachers t on t.id = c.teacher_id
      where e.student_id = students.id and t.profile_id = auth.uid()
    )
  );

create policy "students: gestión admin"
  on public.students for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── teachers ─────────────────────────────────────────────────────────────────
-- Lectura para autenticados: los profes necesitan ver nombres de compañeros
-- (sustituciones, curso compartido). Gestión solo admin.
create policy "teachers: lectura autenticados"
  on public.teachers for select
  to authenticated
  using (true);

create policy "teachers: gestión admin"
  on public.teachers for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── courses ──────────────────────────────────────────────────────────────────
create policy "courses: lectura autenticados"
  on public.courses for select
  to authenticated
  using (true);

create policy "courses: profesor gestiona los suyos / admin"
  on public.courses for all
  using (
    public.is_admin()
    or exists (
      select 1 from public.teachers t
      where t.id = courses.teacher_id and t.profile_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.teachers t
      where t.id = courses.teacher_id and t.profile_id = auth.uid()
    )
  );

-- ── enrollments ──────────────────────────────────────────────────────────────
create policy "enrollments: profesor de su curso / admin"
  on public.enrollments for select
  using (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = enrollments.course_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1
      from public.class_sessions cs
      join public.teachers t on t.id = cs.substitute_teacher_id
      where cs.course_id = enrollments.course_id and t.profile_id = auth.uid()
    )
  );

create policy "enrollments: profesor de su curso gestiona / admin"
  on public.enrollments for all
  using (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = enrollments.course_id and t.profile_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = enrollments.course_id and t.profile_id = auth.uid()
    )
  );

-- ── class_sessions ───────────────────────────────────────────────────────────
-- El profe titular del curso y el sustituto de la sesión ven y gestionan
-- (p.ej. marcar `impartida` al guardar la lista).
create policy "class_sessions: profesor titular o sustituto / admin"
  on public.class_sessions for select
  using (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = class_sessions.course_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.teachers t
      where t.id = class_sessions.substitute_teacher_id and t.profile_id = auth.uid()
    )
  );

create policy "class_sessions: profesor titular o sustituto gestiona / admin"
  on public.class_sessions for all
  using (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = class_sessions.course_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.teachers t
      where t.id = class_sessions.substitute_teacher_id and t.profile_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1
      from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = class_sessions.course_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.teachers t
      where t.id = class_sessions.substitute_teacher_id and t.profile_id = auth.uid()
    )
  );

-- ── attendance ───────────────────────────────────────────────────────────────
-- Pasar lista: profe titular del curso de la sesión o sustituto de la sesión.
create policy "attendance: profesor de la sesión / admin"
  on public.attendance for select
  using (
    public.is_admin()
    or exists (
      select 1
      from public.class_sessions cs
      join public.courses c on c.id = cs.course_id
      join public.teachers t on t.id = c.teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1
      from public.class_sessions cs
      join public.teachers t on t.id = cs.substitute_teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
  );

create policy "attendance: profesor de la sesión registra / admin"
  on public.attendance for all
  using (
    public.is_admin()
    or exists (
      select 1
      from public.class_sessions cs
      join public.courses c on c.id = cs.course_id
      join public.teachers t on t.id = c.teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1
      from public.class_sessions cs
      join public.teachers t on t.id = cs.substitute_teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1
      from public.class_sessions cs
      join public.courses c on c.id = cs.course_id
      join public.teachers t on t.id = c.teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
    or exists (
      select 1
      from public.class_sessions cs
      join public.teachers t on t.id = cs.substitute_teacher_id
      where cs.id = attendance.class_session_id and t.profile_id = auth.uid()
    )
  );

-- ── whatsapp_events ──────────────────────────────────────────────────────────
-- Solo admin en el MVP (el profe no necesita ver el log de comunicaciones).
-- La ruta cron usa el service role y no pasa por RLS.
create policy "whatsapp_events: gestión admin"
  on public.whatsapp_events for all
  using (public.is_admin())
  with check (public.is_admin());

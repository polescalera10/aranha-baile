-- ════════════════════════════════════════════════════════════════════════════
-- 0020 · Endurecimiento RLS del panel (pase adversarial Fase 4)
--
-- Contexto: auditoría estática de las políticas de 0019 simulando accesos
-- directos a la API REST de Supabase (anon key pública + sesión), que se
-- saltan las Server Actions y su validación (mismo precedente que
-- 0010_leads_hardening.sql). Hallazgos completos: docs/rls-audit.md.
--
-- Qué corrige esta migración:
--   1. Escalada de rol vía profiles: el signup público podía autoasignarse
--      role='admin' por raw_user_meta_data, y cualquier usuario podía subirse
--      el rol editando su propia fila de profiles.
--   2. class_sessions: un profesor podía INSERTAR una sesión en un curso
--      ajeno nombrándose sustituto (la rama substitute del with check la
--      aceptaba) y con ello ganar lectura de alumnos/matrículas y escritura
--      de asistencia de ese curso.
--   3. enrollments/courses: la app solo permite gestionarlos al admin, pero
--      la RLS dejaba al profesor matricular UUIDs arbitrarios en sus cursos
--      (→ lectura de fichas ajenas) y crear/borrar cursos propios.
--   4. students: el update del profesor no acotaba columnas — podía cambiar
--      teléfono, nombre, partner_id, active… de sus alumnos vía REST cuando
--      la app solo le ofrece notas y estado de cuota.
--   5. teachers/courses legibles por CUALQUIER autenticado (`using (true)`),
--      incluidos logins con role='alumno': teléfonos de profesores y catálogo
--      interno expuestos. La web pública no consulta estas tablas.
--   6. attendance: se podía pasar lista en sesiones canceladas, sobre alumnos
--      no matriculados y firmando (`recorded_by`) como otro usuario.
--   7. CHECKs defensivos (paridad con 0010): límites de Zod replicados en BD.
--
-- NO corrige (riesgo aceptado / pendiente, ver docs/rls-audit.md):
--   · Control de aforo por rol: sigue solo en la Server Action de matrícula.
--     Un trigger robusto exige serializar el conteo (locks) y no compensa en
--     el MVP: la escritura de enrollments queda limitada al admin.
-- ════════════════════════════════════════════════════════════════════════════

-- ── profiles · el rol nunca lo decide el propio usuario ──────────────────────
-- El trigger de alta de 0002 confiaba en raw_user_meta_data->>'role', que en
-- el signup público (enable_signup) controla el propio cliente: cualquiera con
-- la anon key podía registrarse como admin. El alta siempre entra como
-- 'alumno'; los roles profesor/admin los concede el admin después (Studio o
-- service role, que no pasan por RLS ni por el guard de abajo).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nombre, telefono, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nombre',
    new.raw_user_meta_data ->> 'telefono',
    'alumno'
  );
  return new;
end;
$$;

-- La política de 0008 "profiles: actualizar propio o admin" no acota columnas:
-- un alumno podía hacer UPDATE de su propia fila poniendo role='admin' (y
-- is_admin() se lo creería). El guard congela `role` para no-admins; el
-- service role (auth.uid() null) y los admins no se ven afectados.
create or replace function public.profiles_guard_role_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if new.role is distinct from old.role then
    raise exception 'profiles: solo un admin puede cambiar el rol';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role_change on public.profiles;
create trigger profiles_guard_role_change
  before update on public.profiles
  for each row execute function public.profiles_guard_role_change();

-- ── teachers · lectura solo para el equipo (admin/profesor) ──────────────────
-- `using (true)` exponía nombre, teléfono y disponibilidad de los profes a
-- cualquier autenticado (p. ej. un login role='alumno'). El profesor sí
-- necesita leer a sus compañeros (nombres de sustitutos, formularios admin).
drop policy if exists "teachers: lectura autenticados" on public.teachers;

create policy "teachers: lectura admin/profesor"
  on public.teachers for select
  to authenticated
  using (public.current_role() in ('admin', 'profesor'));

-- ── courses · lectura del equipo, gestión solo admin ─────────────────────────
-- Lectura: el profesor necesita el catálogo completo (agenda, nombres de los
-- cursos que cubre como sustituto); el alumno con login no pinta nada aquí.
drop policy if exists "courses: lectura autenticados" on public.courses;

create policy "courses: lectura admin/profesor"
  on public.courses for select
  to authenticated
  using (public.current_role() in ('admin', 'profesor'));

-- Escritura: en la app solo el admin crea/edita cursos (saveCourse exige
-- isAdmin). La política de 0019 dejaba al profesor crear y borrar cursos
-- propios vía REST — capacidad que la app nunca ofrece: fuera.
drop policy if exists "courses: profesor gestiona los suyos / admin" on public.courses;

create policy "courses: gestión admin"
  on public.courses for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── class_sessions · cierre de la autoasignación como sustituto ──────────────
-- El agujero más grave de 0019: el with check del `for all` aceptaba la rama
-- "yo soy el sustituto de la fila NUEVA", así que un profesor podía INSERTAR
-- (o re-apuntar vía UPDATE de course_id) una sesión en un curso ajeno con
-- substitute_teacher_id = él mismo, y las políticas de students/enrollments/
-- attendance le abrían entonces los datos de ese curso.
--   · INSERT/DELETE: solo admin (las sesiones las genera el admin o el cron
--     con service role, que no pasa por RLS).
--   · UPDATE: titular o sustituto siguen pudiendo (marcar impartida al pasar
--     lista), pero un trigger congela todo salvo `status` y solo permite la
--     transición programada → impartida (la única que hace la app).
drop policy if exists "class_sessions: profesor titular o sustituto gestiona / admin" on public.class_sessions;

create policy "class_sessions: gestión admin"
  on public.class_sessions for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "class_sessions: profesor titular o sustituto actualiza"
  on public.class_sessions for update
  to authenticated
  using (
    exists (
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
    exists (
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

-- Guard de columnas: para no-admins (titular o sustituto) solo puede cambiar
-- `status`, y solo programada → impartida. Bloquea re-apuntar la sesión a otro
-- curso, moverla de fecha, cambiar el sustituto o "des-cancelar" vía REST.
create or replace function public.class_sessions_guard_teacher_update()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if new.id is distinct from old.id
    or new.course_id is distinct from old.course_id
    or new.session_date is distinct from old.session_date
    or new.substitute_teacher_id is distinct from old.substitute_teacher_id
    or new.created_at is distinct from old.created_at
  then
    raise exception 'class_sessions: el profesor solo puede cambiar el estado de la sesión';
  end if;
  if new.status is distinct from old.status
    and not (old.status = 'programada' and new.status = 'impartida')
  then
    raise exception 'class_sessions: el profesor solo puede marcar una sesión programada como impartida';
  end if;
  return new;
end;
$$;

drop trigger if exists class_sessions_guard_teacher_update on public.class_sessions;
create trigger class_sessions_guard_teacher_update
  before update on public.class_sessions
  for each row execute function public.class_sessions_guard_teacher_update();

-- ── enrollments · gestión solo admin ─────────────────────────────────────────
-- La matrícula es admin-only en la app (enrollStudent/updateEnrollmentStatus/
-- promoteFromWaitlist exigen isAdmin). La política de 0019 dejaba al profesor
-- insertar matrículas con CUALQUIER student_id en sus cursos, lo que además de
-- saltarse el aforo le daba lectura de fichas de alumnos ajenos (la política
-- de students concede lectura "por matrícula en curso propio"). La lectura del
-- titular/sustituto (0019) se conserva tal cual.
drop policy if exists "enrollments: profesor de su curso gestiona / admin" on public.enrollments;

create policy "enrollments: gestión admin"
  on public.enrollments for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── students · el profesor solo toca notas y cuota ───────────────────────────
-- Las políticas de 0019 (lectura por matrícula, update del profesor, gestión
-- admin) se conservan; el problema era que el update del profesor no acotaba
-- columnas: vía REST podía reescribir teléfono, nombre, partner_id (apuntando
-- a alumnos de terceros), active o is_founding_member. La app solo le ofrece
-- `notes` (NotesForm) y `payment_status` (PaymentToggle): el guard congela el
-- resto para no-admins.
create or replace function public.students_guard_teacher_update()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if new.id is distinct from old.id
    or new.full_name is distinct from old.full_name
    or new.phone is distinct from old.phone
    or new.email is distinct from old.email
    or new.dance_role is distinct from old.dance_role
    or new.nivel_id is distinct from old.nivel_id
    or new.partner_id is distinct from old.partner_id
    or new.is_founding_member is distinct from old.is_founding_member
    or new.active is distinct from old.active
    or new.created_at is distinct from old.created_at
  then
    raise exception 'students: el profesor solo puede modificar notas y estado de cuota';
  end if;
  return new;
end;
$$;

drop trigger if exists students_guard_teacher_update on public.students;
create trigger students_guard_teacher_update
  before update on public.students
  for each row execute function public.students_guard_teacher_update();

-- ── attendance · pasar lista acotado a lo que hace la app ────────────────────
-- El `for all` de 0019 permitía al titular/sustituto: insertar asistencia de
-- alumnos NO matriculados (cualquier UUID), pasar lista en sesiones
-- `cancelada` (la action lo rechaza, REST no) y firmar `recorded_by` como
-- otro perfil. Se separa: gestión total solo admin; el profesor inserta y
-- actualiza con condiciones. La lectura (0019) se conserva tal cual.
drop policy if exists "attendance: profesor de la sesión registra / admin" on public.attendance;

create policy "attendance: gestión admin"
  on public.attendance for all
  using (public.is_admin())
  with check (public.is_admin());

-- Condición común del profesor: (a) es titular del curso de la sesión o
-- sustituto de la sesión, (b) la sesión no está cancelada, (c) el alumno
-- tiene matrícula vigente (≠ baja) en ese curso, (d) firma con su uid.
create policy "attendance: profesor registra en su sesión"
  on public.attendance for insert
  to authenticated
  with check (
    (
      exists (
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
    and exists (
      select 1 from public.class_sessions cs
      where cs.id = attendance.class_session_id and cs.status <> 'cancelada'
    )
    and exists (
      select 1
      from public.enrollments e
      join public.class_sessions cs on cs.course_id = e.course_id
      where cs.id = attendance.class_session_id
        and e.student_id = attendance.student_id
        and e.status <> 'baja'
    )
    and attendance.recorded_by = auth.uid()
  );

create policy "attendance: profesor corrige su sesión"
  on public.attendance for update
  to authenticated
  using (
    exists (
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
    (
      exists (
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
    and exists (
      select 1
      from public.enrollments e
      join public.class_sessions cs on cs.course_id = e.course_id
      where cs.id = attendance.class_session_id
        and e.student_id = attendance.student_id
        and e.status <> 'baja'
    )
    and attendance.recorded_by = auth.uid()
  );
-- Nota: el DELETE del profesor desaparece (la app nunca borra asistencia;
-- corregir una lista es re-upsert). Borrar queda reservado al admin.

-- ── CHECKs defensivos (paridad con 0010_leads_hardening) ─────────────────────
-- Réplica en BD de los límites de Zod para las escrituras que sí permite la
-- RLS (admin/profesor vía REST se saltan la validación de la app). Verificado
-- contra supabase/seed.sql: ningún dato del seed viola estas restricciones.
alter table public.students
  add constraint students_full_name_len
    check (char_length(full_name) between 2 and 120),
  add constraint students_phone_e164
    check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  add constraint students_email_len
    check (email is null or char_length(email) <= 254),
  add constraint students_notes_len
    check (notes is null or char_length(notes) <= 2000);

comment on constraint students_phone_e164 on public.students is
  'Réplica del E164_REGEX de Zod (validation/student.ts): el módulo WhatsApp depende de teléfonos válidos.';

-- teachers.phone: check laxo estilo leads (no E.164 estricto) porque el
-- backfill de 0012 copió profiles.telefono, que era texto libre.
alter table public.teachers
  add constraint teachers_full_name_len
    check (char_length(full_name) between 2 and 120),
  add constraint teachers_phone_chars
    check (
      phone is null
      or (char_length(phone) between 6 and 20 and phone ~ '^[+0-9\s().-]+$')
    );

-- courses: coherencia de fechas del ciclo (Zod ya lo valida; la BD no lo hacía).
alter table public.courses
  add constraint courses_dates_order
    check (start_date is null or end_date is null or end_date >= start_date);

-- whatsapp_events: el contrato con n8n exige payload objeto (nunca array/escala).
alter table public.whatsapp_events
  add constraint whatsapp_events_payload_object
    check (jsonb_typeof(payload) = 'object');

# Auditoría RLS del panel interno — Fase 4

> **Alcance y método.** Pase adversarial **estático**: lectura de las migraciones
> `0001`–`0020` y de todo `src/lib/{actions,queries}` + páginas del dashboard.
> **No** se ejecutó contra un Postgres real (no hay Docker ni supabase CLI en la
> máquina). Todas las conclusiones son razonamiento sobre el SQL y el código, no
> observación de comportamiento. **Pol debe validar** con `supabase start` +
> `pnpm db:reset` (o `supabase db reset`) y, a ser posible, un test de acceso por
> rol contra la API REST antes de dar por cerrado esto.

Modelo de roles: `admin` (todo), `profesor` (con o sin login; sin login solo lo
alcanza el admin), `alumno` (rol reservado, hoy sin vistas de panel pero **con
login posible**: `enable_signup = true` en `config.toml`), `anon` (PostgREST sin
sesión). Helpers `public.current_role()` / `public.is_admin()` son `security
definer` (0002) y leen `profiles` por `auth.uid()`.

El vector central de todos los hallazgos es el mismo que motivó
`0010_leads_hardening.sql`: **un cliente con la anon key pública puede hablar
directamente con la API REST de Supabase, saltándose las Server Actions, su Zod
y sus comprobaciones `isAdmin()`.** La RLS es la única barrera real; las
comprobaciones en JS son defensa en profundidad, no el muro.

---

## 1. Escenarios probados

Veredicto sobre las políticas de **0019 tal cual** (antes de 0020). "REST" = ataque
directo a la API saltándose la Server Action.

| # | Actor | Acción | Esperado | Según 0019 | Veredicto |
|---|-------|--------|----------|------------|-----------|
| 1 | Profesor A | Leer cursos/sesiones/matrículas/asistencia de profe B (titular ajeno) | Denegado | Denegado (las políticas cruzan `teacher_id`/matrícula con `auth.uid()`) | OK |
| 2 | Profesor | Leer sus propios cursos como titular y como sustituto | Permitido | Permitido | OK |
| 3 | **Profesor A** | **INSERT en `class_sessions` de un curso de B poniéndose `substitute_teacher_id = A`** | **Denegado** | **PERMITIDO** (el `with check` del `for all` acepta la rama "soy sustituto de la fila nueva") | **FALLO — H1** |
| 4 | Profesor A (tras H1) | Leer alumnos/matrículas y pasar lista de ese curso ajeno | Denegado | Permitido en cascada (las políticas conceden por "sustituto de una sesión del curso") | FALLO (consecuencia de H1) |
| 5 | **Profesor** | **INSERT en `enrollments` con un `student_id` arbitrario en su curso** | Denegado (matrícula es admin-only en la app) | **PERMITIDO** (`enrollments … gestiona` incluye al profe del curso) | **FALLO — H2** |
| 6 | Profesor (tras H2) | Leer la ficha (teléfono, notas) de un alumno ajeno matriculándolo en su curso | Denegado | Permitido (la lectura de `students` se concede "por matrícula en curso propio") | FALLO (consecuencia de H2) |
| 7 | **Profesor** | **UPDATE `students` de un alumno suyo cambiando `phone`/`full_name`/`active`/`partner_id`** vía REST | Solo notas y cuota | **PERMITIDO** (el `update` del profe no acota columnas) | **FALLO — H3** |
| 8 | Profesor | Reasignar `partner_id` de su alumno para apuntar a un alumno de un tercero | Denegado | Permitido (no hay control de columnas ni de que el partner sea alcanzable) | FALLO (parte de H3) |
| 9 | **Profesor** | **INSERT `attendance` de un alumno NO matriculado / firmando `recorded_by` como otro** | Denegado | **PERMITIDO** (`attendance … registra` solo exige ser profe de la sesión) | **FALLO — H4** |
| 10 | **Profesor** | **Pasar lista en sesión `cancelada` vía REST** | Denegado (la action lo rechaza) | **PERMITIDO** (RLS no mira `status`) | **FALLO — H4** |
| 11 | **Profesor** | **DELETE/UPDATE de un curso propio, o crear cursos** vía REST | Denegado (cursos son admin-only en la app) | **PERMITIDO** (`courses … gestiona los suyos` incluye al profe) | **FALLO — H5** |
| 12 | Profesor | Leer/escribir `whatsapp_events` | Denegado (admin-only) | Denegado (`whatsapp_events: gestión admin`) | OK |
| 13 | **Alumno con login** | **Leer `teachers` (nombres, teléfonos, disponibilidad)** | Denegado | **PERMITIDO** (`teachers: lectura autenticados` = `using(true)`) | **FALLO — H6** |
| 14 | **Alumno con login** | **Leer `courses` (catálogo interno)** | Denegado | **PERMITIDO** (`courses: lectura autenticados` = `using(true)`) | **FALLO — H6** |
| 15 | Alumno con login | Leer `students` (teléfonos de alumnos) | Denegado | Denegado (la lectura exige `is_admin` o profe con matrícula; un alumno no tiene fila en `teachers`) | OK |
| 16 | Alumno con login | Leer `enrollments` / `attendance` / `class_sessions` / `whatsapp_events` | Denegado | Denegado (todas exigen `is_admin` o profe) | OK |
| 17 | **Cualquier usuario / alumno** | **UPDATE de su propia fila `profiles` poniendo `role='admin'`** | Denegado | **PERMITIDO** (`profiles: actualizar propio` no acota columnas → auto-escalada a admin) | **FALLO — H0** |
| 18 | **Anónimo (signup público)** | **Registrarse con `raw_user_meta_data.role = 'admin'`** | Entra como alumno | **PERMITIDO** (el trigger `handle_new_user` de 0002 confía en ese campo) | **FALLO — H0** |
| 19 | Anónimo (anon) | SELECT/INSERT/UPDATE en cualquier tabla nueva (`students`, `teachers`, `courses`, `enrollments`, `class_sessions`, `attendance`, `whatsapp_events`) | Denegado | Denegado (RLS activo, ninguna política concede a `anon`; `current_role()`/`is_admin()` → null/false) | OK |
| 20 | Admin | Todo | Permitido | Permitido | OK |
| 21 | Profesor **sin login** (teachers.profile_id null) | Cualquier acceso a sus filas | Solo admin | Solo admin (comparar `auth.uid()` con null nunca concede) | OK |
| 22 | Profesor | Matricular por encima del aforo vía REST | *La BD no impone aforo* (solo la action) | Permitido | **Riesgo aceptado — R1** (además, tras 0020 la escritura de `enrollments` pasa a admin-only, lo que reduce la superficie a "admin descuidado por REST") |

---

## 2. Hallazgos por severidad

### H0 — CRÍTICO · Escalada de privilegios a admin (`profiles`)
Dos caminos independientes para volverse admin sin serlo:
- **Signup público:** `config.toml` tiene `enable_signup = true` y el trigger
  `handle_new_user` (0002) hace `coalesce((raw_user_meta_data->>'role')::user_role,
  'alumno')`. Ese metadata lo controla el cliente en `signUp`, así que cualquiera
  con la anon key puede registrarse directamente como `admin`.
- **UPDATE de la propia fila:** la política `profiles: actualizar propio o admin`
  (0008) valida `id = auth.uid()` pero **no restringe columnas**, así que el
  usuario puede subirse `role` a `admin` sobre su propia fila.

Como `is_admin()` lee ese `role`, cualquiera de los dos abre **todo** el panel.
Este hallazgo domina a todos los demás.

### H1 — CRÍTICO · Autoasignación como sustituto en `class_sessions`
La política `for all` de 0019 tenía un `with check` que aceptaba la rama
"`substitute_teacher_id` de la fila **nueva** soy yo". Un profesor podía por
tanto **INSERT** (o UPDATE de `course_id`) una sesión en un curso ajeno
nombrándose sustituto. A partir de ahí, las políticas de `students`,
`enrollments` y `attendance` conceden acceso "al sustituto de una sesión del
curso" → lectura de fichas de alumnos ajenos y escritura de asistencia de un
curso que no le corresponde. Es una escalada horizontal profesor→profesor.

### H2 — ALTO · El profesor puede matricular (y así leer fichas ajenas)
`enrollments: … gestiona / admin` incluía al profesor del curso. La matrícula
es **admin-only** en la app (`enrollStudent` et al. exigen `isAdmin`), pero por
REST el profesor podía insertar `enrollments` con **cualquier** `student_id` en
sus cursos. Efecto colateral grave: la lectura de `students` se concede "por
matrícula en curso propio", así que matricular a un alumno ajeno le **abre su
ficha** (teléfono, notas privadas). También permite saltarse el aforo.

### H3 — ALTO · UPDATE de `students` sin acotar columnas
`students: profesor actualiza sus alumnos` no limita qué columnas cambia. La app
solo le ofrece `notes` (NotesForm) y `payment_status` (PaymentToggle), pero por
REST podía reescribir `phone`, `full_name`, `email`, `active`,
`is_founding_member` y **`partner_id`** de sus alumnos — incluyendo apuntar la
pareja hacia un alumno de un tercero (rompe la simetría que mantiene
`syncPartner`). Cambiar `phone` además contamina el módulo WhatsApp.

### H4 — MEDIO/ALTO · Asistencia sin validar matrícula, estado ni firma
`attendance: … registra / admin` solo exigía ser profe de la sesión. Por REST el
profesor podía: (a) insertar asistencia de **alumnos no matriculados** (cualquier
UUID que exista en `students`), (b) pasar lista en sesiones **`cancelada`** (la
Server Action lo rechaza, la RLS no), y (c) firmar `recorded_by` con el UUID de
**otro** perfil. Integridad del histórico y de las horas de profesor en juego.

### H5 — MEDIO · El profesor puede crear/editar/borrar cursos
`courses: profesor gestiona los suyos / admin` daba `for all` al profe sobre sus
cursos. En la app los cursos son admin-only (`saveCourse` exige `isAdmin`). Por
REST un profe podía editar aforos, horarios o **borrar** su curso (cascada a
sesiones y matrículas).

### H6 — MEDIO · `teachers` y `courses` legibles por cualquier autenticado
Ambas con `using(true)` a `authenticated`. Un login con `role='alumno'` (posible:
signup abierto) leía **teléfonos y disponibilidad de los profesores** y el
catálogo interno de cursos. La web pública **no** consulta estas tablas (usa
`modalidades`/`niveles`/`eventos`), así que restringir a admin/profesor no rompe
nada público. `students` ya estaba bien cerrada (no era `using(true)`).

### Correcto (sin acción)
- `whatsapp_events`: admin-only, bien.
- `anon` contra todas las tablas nuevas: denegado, bien.
- Profesor sin login: inalcanzable salvo por admin, bien.
- Lectura de `students`/`enrollments`/`attendance`/`class_sessions` por alumno:
  denegada, bien.
- El cron (`/api/cron/recordatorio-clase`) usa **service role**: no pasa por RLS
  a propósito, protegido por `x-cron-secret`. Correcto.

---

## 3. Qué corrige `0020_rls_hardening.sql`

| Hallazgo | Corrección en 0020 |
|----------|--------------------|
| H0 | `handle_new_user` reescrita para forzar `role='alumno'` en el alta (ignora el metadata). Trigger `profiles_guard_role_change`: un no-admin no puede cambiar su `role` en un UPDATE. Los roles los concede el admin (Studio/service role, que no pasan por el guard). |
| H1 | `class_sessions`: `INSERT`/`DELETE` pasan a **admin-only**; el profe conserva solo `UPDATE`, y un trigger (`class_sessions_guard_teacher_update`) congela todo salvo `status` y solo admite `programada → impartida`. Se cierra la autoasignación como sustituto. |
| H2 | `enrollments`: escritura **admin-only** (`enrollments: gestión admin`). La lectura del titular/sustituto de 0019 se conserva. |
| H3 | Trigger `students_guard_teacher_update`: para no-admins solo pueden cambiar `notes` y `payment_status`; el resto de columnas queda congelado. |
| H4 | `attendance`: gestión total admin-only; el profe recibe políticas `INSERT`/`UPDATE` acotadas que exigen (a) ser titular/sustituto, (b) sesión **no cancelada** (en INSERT), (c) alumno con **matrícula vigente** (≠ baja) en el curso, (d) `recorded_by = auth.uid()`. El `DELETE` del profe desaparece (la app nunca borra: corregir es re-upsert). |
| H5 | `courses`: escritura **admin-only** (`courses: gestión admin`). |
| H6 | `teachers` y `courses`: lectura restringida a `current_role() in ('admin','profesor')`. |
| Defensa en profundidad | CHECKs (paridad con 0010): `students` (nombre 2–120, teléfono E.164, email ≤254, notas ≤2000), `teachers` (nombre 2–120, teléfono laxo estilo leads porque el backfill de 0012 copió `profiles.telefono` en texto libre), `courses` (coherencia `end_date >= start_date`), `whatsapp_events` (`payload` siempre objeto jsonb). **Verificados contra `seed.sql`: ningún dato del seed los viola.** |

Todas las políticas nuevas que sustituyen a las de 0019 llevan `drop policy if
exists` antes de recrearse.

### Nota sobre `attendance` upsert (comportamiento esperado tras 0020)
`submitAttendance` hace `upsert` con `onConflict = class_session_id,student_id`.
En un alta pasa por la policy `INSERT`; en una corrección de una fila existente,
por la `UPDATE`. Ambas exigen matrícula vigente y `recorded_by = auth.uid()`, que
es exactamente lo que la action ya envía (solo alumnos `activa` del curso,
`recorded_by = user.id`). No debería romper el flujo, **pero es justo lo que Pol
debe verificar en local** (ver §5).

---

## 4. Riesgos aceptados / pendientes

- **R1 — Aforo solo en la Server Action (aceptado).** El control de aforo por rol
  (leaders/followers) vive en `enrollStudent`/`promoteFromWaitlist`, no en la BD.
  Un trigger de aforo robusto exige serializar el conteo (bloqueo por curso+rol
  para evitar dos matrículas simultáneas que se cuelen) y compararlo con
  `capacity_*`; es suficientemente delicado como para no meterlo en el MVP sin
  tests. **Mitigación aplicada:** tras 0020 la escritura de `enrollments` es
  admin-only, así que el único que puede saltarse el aforo por REST es un admin
  (ya de confianza). Queda documentado como pendiente si en el futuro se abre la
  matrícula al profesor o al alumno.

- **R2 — `attendance UPDATE` sobre sesión ya cancelada (menor).** El `INSERT`
  bloquea sesiones canceladas, pero el `UPDATE` no revalida `status` (solo
  matrícula y firma). Un profe podría togglear una fila de asistencia
  preexistente si su sesión pasara a `cancelada` después. Ventana estrecha
  (requiere asistencia ya creada y luego cancelación); no se endurece para no
  añadir más lógica. Anotado por transparencia.

- **R3 — Rotación de la anon key / rate-limit del signup (fuera de RLS).** H0 se
  cierra en BD, pero `enable_signup = true` sigue permitiendo altas anónimas
  masivas (como alumno). Si el rol alumno nunca va a autoservirse en el MVP,
  **valorar `enable_signup = false`** y crear los accesos desde el panel admin.
  Decisión de producto para Pol.

---

## 5. Validación pendiente (obligatoria antes de cerrar)

Esto es auditoría estática. Pol debe, en local:

1. `supabase start` y aplicar migraciones + seed (`supabase db reset`).
2. Crear tres usuarios (admin, profesor con `teachers.profile_id` vinculado,
   alumno) y, con la anon key, reproducir los escenarios de la tabla §1 contra la
   API REST (`supabase-js` o `curl` a `/rest/v1`).
3. Confirmar los **flujos legítimos que 0020 toca no se rompen**:
   - profe pasa lista de su sesión (INSERT y luego re-guardado/UPDATE),
   - profe guarda notas y togglea cuota de su alumno,
   - profe marca su sesión `programada → impartida`,
   - admin crea curso, genera sesiones, matricula, asigna sustituto.
4. Verificar que un usuario **no** puede subirse a admin (UPDATE de `profiles` y
   signup con `role` en metadata).

---

## 6. Cambios de app recomendados (NO aplicados en este workstream)

0020 no obliga a cambiar la app para el camino feliz, pero conviene:

- **`supabase/config.toml` → `enable_signup`.** Recomendado ponerlo a `false`
  mientras el rol alumno no tenga autoservicio (refuerza R3; H0 ya está cerrado
  en BD igualmente). Decisión de Pol.
- **`src/lib/actions/courses.ts` (`assignSubstitute`, `updateSessionStatus`,
  `generateSessions`) y `src/lib/actions/enrollments.ts`.** Ya comprueban
  `isAdmin()` en JS, así que siguen funcionando con las nuevas políticas
  admin-only de `courses`/`class_sessions`/`enrollments`. **No requieren cambios**,
  pero conviene un test de regresión que confirme que ninguna vista del profesor
  intenta escribir en esas tablas (hoy no lo hace: el profe solo escribe
  `attendance`, `class_sessions.status` vía `submitAttendance`, y `students.notes/
  payment_status`).
- **Ninguna query de lectura del profesor se rompe con H6.** `getTeacherCourses`,
  `getTeacherAgenda`, `getAttendanceSheet`, etc. leen `courses`/`teachers` con
  sesión de profesor, que sigue teniendo lectura tras 0020. No hay cambios de
  código necesarios; documentado aquí por si un test lo cuestiona.

> Si al validar en local alguna policy de 0020 rompe un flujo legítimo del
> profesor, el ajuste correcto es afinar la policy/trigger en una `0021`, **no**
> relajar la Server Action.

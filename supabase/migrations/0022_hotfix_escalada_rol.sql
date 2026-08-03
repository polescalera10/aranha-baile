-- ════════════════════════════════════════════════════════════════════════════
-- 0022 · HOTFIX de seguridad — escalada de privilegios a `admin`
--
-- Contexto (docs/auditoria-seguridad-2026-08-03.md, hallazgo C1):
-- la base de datos de producción nunca recibió las migraciones 0010–0020, así
-- que el endurecimiento de `0020_rls_hardening.sql` vivía solo en el repo. Con
-- el registro público abierto (`disable_signup: false`) y la clave publicable
-- viajando en el bundle, cualquiera podía volverse admin por dos caminos:
--
--   1. `handle_new_user()` tomaba el rol de `raw_user_meta_data ->> 'role'`,
--      que es el campo `data` del POST /auth/v1/signup: lo escribe el cliente.
--      Registrarse con `data: {"role":"admin"}` creaba un perfil admin.
--   2. La política `profiles: actualizar propio o admin` (0008) no acota
--      columnas: `PATCH /rest/v1/profiles?id=eq.<uid>` con `{"role":"admin"}`
--      se aceptaba, porque el trigger guard de la 0020 no existía aquí.
--
-- Como `is_admin()` lee ese `role`, ambos caminos abrían `leads` entera (datos
-- personales reales) y la gestión de `eventos`/`modalidades`/`clases`.
--
-- Esta migración extrae de la 0020 SOLO el bloque `profiles` — el único que no
-- depende de las tablas del panel (`students`, `courses`, …), que en producción
-- todavía no existen. Es idempotente: aplicar después la 0020 completa la
-- redefine igual y no rompe nada.
--
-- No toca datos, ni tablas, ni políticas: solo dos funciones y un trigger.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. El alta siempre entra como 'alumno' ───────────────────────────────────
-- Los roles `profesor`/`admin` los concede un admin después (Studio o service
-- role, que no pasan por RLS ni por el guard de abajo).
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

-- ── 2. El rol nunca lo cambia el propio usuario ──────────────────────────────
-- Congela `role` para todo el que no sea admin. El service role (auth.uid()
-- null) y los admins no se ven afectados: siguen pudiendo asignar roles.
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

-- ── 3. search_path fijo en set_updated_at (linter 0011) ──────────────────────
-- Única función del esquema a la que le faltaba. Sin `search_path` fijo, una
-- función usada en triggers puede desviarse si alguien crea objetos en un
-- esquema anterior de la ruta de búsqueda.
alter function public.set_updated_at() set search_path = public;

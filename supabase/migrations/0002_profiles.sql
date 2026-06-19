-- ════════════════════════════════════════════════════════════════════════════
-- 0002 · profiles  (extiende auth.users) + roles + trigger de alta
-- ════════════════════════════════════════════════════════════════════════════

-- Roles del área privada.
create type public.user_role as enum ('alumno', 'profesor', 'admin');

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        public.user_role not null default 'alumno',
  nombre      text,
  telefono    text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

comment on table public.profiles is
  'Perfil de usuario, 1:1 con auth.users. role dirige el enrutado del área privada.';

-- ── Trigger: crear profile automáticamente al registrarse un usuario ──────────
-- El rol por defecto es 'alumno'. Se puede pasar 'role' en raw_user_meta_data
-- al invitar/crear usuarios desde el panel admin.
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
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'alumno')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Helper de rol: usado por las policies RLS de todo el esquema ──────────────
create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

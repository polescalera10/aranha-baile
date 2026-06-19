-- ════════════════════════════════════════════════════════════════════════════
-- 0001 · Extensiones base
-- ════════════════════════════════════════════════════════════════════════════
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "citext";     -- emails case-insensitive

-- Helper genérico: actualiza updated_at en cada UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

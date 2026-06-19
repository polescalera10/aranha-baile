-- ════════════════════════════════════════════════════════════════════════════
-- 0008 · Row Level Security
--   Modelo de roles (public.current_role / public.is_admin definidos en 0002):
--     · anon     → solo puede INSERTAR leads y LEER catálogo público.
--     · alumno   → ve y gestiona lo suyo (perfil, inscripciones, asistencia…).
--     · profesor → gestiona las clases que imparte y su contenido.
--     · admin    → acceso total.
-- ════════════════════════════════════════════════════════════════════════════

alter table public.profiles      enable row level security;
alter table public.modalidades   enable row level security;
alter table public.niveles       enable row level security;
alter table public.clases        enable row level security;
alter table public.inscripciones enable row level security;
alter table public.suscripciones enable row level security;
alter table public.asistencia    enable row level security;
alter table public.contenido     enable row level security;
alter table public.eventos       enable row level security;
alter table public.leads         enable row level security;

-- ── profiles ─────────────────────────────────────────────────────────────────
create policy "profiles: leer propio o admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles: actualizar propio o admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "profiles: admin inserta/borra"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── leads ────────────────────────────────────────────────────────────────────
-- Insert público (anon + authenticated). Lectura/gestión solo admin.
create policy "leads: insert público"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "leads: lectura admin"
  on public.leads for select
  using (public.is_admin());

create policy "leads: update admin"
  on public.leads for update
  using (public.is_admin())
  with check (public.is_admin());

-- ── Catálogo público: modalidades / niveles / eventos públicos ───────────────
create policy "modalidades: lectura activas (todos)"
  on public.modalidades for select
  to anon, authenticated
  using (activo or public.is_admin());

create policy "modalidades: gestión admin"
  on public.modalidades for all
  using (public.is_admin()) with check (public.is_admin());

create policy "niveles: lectura (todos)"
  on public.niveles for select
  to anon, authenticated
  using (true);

create policy "niveles: gestión admin"
  on public.niveles for all
  using (public.is_admin()) with check (public.is_admin());

create policy "eventos: lectura públicos (todos)"
  on public.eventos for select
  to anon, authenticated
  using (publico or public.is_admin());

create policy "eventos: gestión admin"
  on public.eventos for all
  using (public.is_admin()) with check (public.is_admin());

-- ── clases ───────────────────────────────────────────────────────────────────
create policy "clases: lectura autenticados"
  on public.clases for select
  to authenticated
  using (true);

create policy "clases: profesor gestiona las suyas"
  on public.clases for all
  using (profesor_id = auth.uid() or public.is_admin())
  with check (profesor_id = auth.uid() or public.is_admin());

-- ── inscripciones ────────────────────────────────────────────────────────────
create policy "inscripciones: alumno ve lo suyo / profesor de su clase / admin"
  on public.inscripciones for select
  using (
    alumno_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.clases c
      where c.id = inscripciones.clase_id and c.profesor_id = auth.uid()
    )
  );

create policy "inscripciones: alumno gestiona la suya"
  on public.inscripciones for all
  using (alumno_id = auth.uid() or public.is_admin())
  with check (alumno_id = auth.uid() or public.is_admin());

-- ── suscripciones ────────────────────────────────────────────────────────────
create policy "suscripciones: alumno ve la suya / admin"
  on public.suscripciones for select
  using (alumno_id = auth.uid() or public.is_admin());

create policy "suscripciones: gestión admin"
  on public.suscripciones for all
  using (public.is_admin()) with check (public.is_admin());

-- ── asistencia ───────────────────────────────────────────────────────────────
create policy "asistencia: alumno ve la suya / profesor de su clase / admin"
  on public.asistencia for select
  using (
    alumno_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.clases c
      where c.id = asistencia.clase_id and c.profesor_id = auth.uid()
    )
  );

create policy "asistencia: profesor de la clase registra / admin"
  on public.asistencia for all
  using (
    public.is_admin()
    or exists (
      select 1 from public.clases c
      where c.id = asistencia.clase_id and c.profesor_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.clases c
      where c.id = asistencia.clase_id and c.profesor_id = auth.uid()
    )
  );

-- ── contenido ────────────────────────────────────────────────────────────────
create policy "contenido: lectura autenticados"
  on public.contenido for select
  to authenticated
  using (true);

create policy "contenido: profesor/admin gestiona"
  on public.contenido for all
  using (public.is_admin() or created_by = auth.uid())
  with check (public.is_admin() or created_by = auth.uid());

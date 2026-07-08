-- ════════════════════════════════════════════════════════════════════════════
-- 0009 · Endurecimiento de `leads` (defensa en profundidad)
--
-- Contexto: la política RLS "leads: insert público" permite INSERT anónimo,
-- necesario para los formularios. La Server Action valida con Zod, pero un
-- cliente que hable directamente con la API REST de Supabase (anon key pública)
-- se salta esa validación. Estas restricciones replican los límites de Zod
-- (src/lib/validation/lead.ts) en la propia base de datos, de modo que ningún
-- camino de entrada pueda insertar datos fuera de rango.
--
-- Pendiente (requiere decisión de Pol, ver MEMORY.md del proyecto):
--   · Rate limiting / captcha para el insert anónimo (Supabase no lo aplica
--     por defecto a la API REST).
-- ════════════════════════════════════════════════════════════════════════════

alter table public.leads
  add constraint leads_nombre_len
    check (char_length(nombre) between 2 and 120),
  add constraint leads_telefono_len
    check (char_length(telefono) between 6 and 20),
  add constraint leads_telefono_chars
    check (telefono ~ '^[+0-9\s().-]+$'),
  add constraint leads_email_len
    check (email is null or char_length(email::text) <= 254),
  add constraint leads_modalidad_len
    check (modalidad_interes is null or char_length(modalidad_interes) <= 80),
  add constraint leads_origen_len
    check (char_length(origen) between 1 and 40),
  add constraint leads_mensaje_len
    check (mensaje is null or char_length(mensaje) <= 1000);

comment on constraint leads_nombre_len on public.leads is
  'Réplica en BD de los límites de Zod: el insert anónimo por API no debe superar la validación de la app.';

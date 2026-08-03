-- ════════════════════════════════════════════════════════════════════════════
-- 0023 · `leads` deja de aceptar INSERT anónimo por REST
--
-- Contexto (docs/auditoria-seguridad-2026-08-03.md, hallazgo A2):
-- la política "leads: insert público" era `WITH CHECK (true)` para `anon`. Como
-- la clave publicable viaja en el bundle JavaScript, cualquiera podía lanzar
-- `POST /rest/v1/leads` en bucle sin pasar por la web: ni honeypot, ni Zod, ni
-- los CHECK de 0010. Spam en el CRM y carga gratis sobre el plan Free.
--
-- Desde el commit 226ffb9 los formularios públicos persisten el lead con el
-- service role desde la Server Action (`leadsWriteClient` en
-- src/lib/actions/leads.ts), que no pasa por RLS. La política ya no hace falta.
--
-- ⚠️ Orden obligatorio: primero desplegar el código, comprobar que un envío
-- real se guarda, y solo entonces aplicar esta migración. Verificado el
-- 2026-08-03 (POST /rest/v1/leads → 201 desde el servidor; el mismo POST con
-- la clave publicable responde ahora 401 / 42501).
-- ════════════════════════════════════════════════════════════════════════════

drop policy if exists "leads: insert público" on public.leads;

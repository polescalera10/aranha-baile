-- ════════════════════════════════════════════════════════════════════════════
-- 0017 · drop suscripciones
--   El MVP no implementa pagos ni planes: el estado de cuota es un campo
--   manual en `students` (payment_status). `suscripciones` (sin uso en la
--   app) contradecía esa regla y se elimina junto a su enum.
-- ════════════════════════════════════════════════════════════════════════════

drop table if exists public.suscripciones cascade;
drop type if exists public.plan_tipo;

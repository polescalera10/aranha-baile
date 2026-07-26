-- ════════════════════════════════════════════════════════════════════════════
-- 0021 · leads.intereses  (tags de interés para marketing segmentado)
--
-- Las landings de INTENSIVOS y CURSO REGULAR capturan, además de los datos de
-- contacto, uno o varios "intereses" (estilos/sesiones marcados en el form).
-- Se guardan como array de slugs para poder segmentar campañas más adelante
-- (p. ej. "escríbeme a todo el que marcó bachata").
--
-- No FK al catálogo de modalidades: son etiquetas libres (incluyen sesiones de
-- intensivo con fecha) y no queremos perder un lead si el catálogo cambia.
-- ════════════════════════════════════════════════════════════════════════════

alter table public.leads
  add column intereses text[];

-- Réplica en BD de los límites de Zod (interestLeadSchema). Los CHECK de
-- Postgres no admiten subconsultas, así que acotamos cardinalidad y longitud
-- total del array (defensa frente a la API REST anónima); la validación por
-- elemento la hace Zod en la Server Action.
alter table public.leads
  add constraint leads_intereses_card
    check (intereses is null or coalesce(array_length(intereses, 1), 0) <= 50),
  add constraint leads_intereses_total_len
    check (intereses is null or char_length(array_to_string(intereses, ',')) <= 4000);

-- Índice GIN para filtrar por interés al segmentar campañas.
create index leads_intereses_idx on public.leads using gin (intereses);

comment on column public.leads.intereses is
  'Etiquetas de interés marcadas en el formulario (estilos/sesiones). Para marketing segmentado.';

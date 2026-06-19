-- ════════════════════════════════════════════════════════════════════════════
-- 0009 · Add slug to eventos
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.eventos ADD COLUMN slug text UNIQUE;

-- Index for searching events by slug
CREATE INDEX IF NOT EXISTS eventos_slug_idx ON public.eventos (slug);

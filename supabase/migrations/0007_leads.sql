-- ════════════════════════════════════════════════════════════════════════════
-- 0007 · leads  (motor de conversión: formularios públicos → CRM)
-- ════════════════════════════════════════════════════════════════════════════

create type public.lead_estado as enum (
  'nuevo',
  'contactado',
  'prueba_agendada',
  'convertido',
  'descartado'
);

create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  nombre           text not null,
  telefono         text not null,
  email            citext,
  modalidad_interes text,            -- slug libre; no FK para no perder leads si cambia el catálogo
  origen           text not null,    -- CTA/bloque de origen (hero, founding, contacto…)
  mensaje          text,
  estado           public.lead_estado not null default 'nuevo',
  created_at       timestamptz not null default now()
);

create index leads_estado_idx on public.leads (estado);
create index leads_created_at_idx on public.leads (created_at desc);

comment on table public.leads is
  'Cada envío de formulario crea un lead y dispara webhook n8n (email + WhatsApp).';

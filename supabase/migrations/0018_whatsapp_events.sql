-- ════════════════════════════════════════════════════════════════════════════
-- 0018 · whatsapp_events
--   Cola/log de mensajes emitidos hacia n8n (la app nunca llama a Meta:
--   escribe aquí y hace POST a N8N_WEBHOOK_URL; n8n renderiza plantillas y
--   envía). `status = enviado` significa "entregado a n8n", no entrega real
--   de WhatsApp. `student_id` nullable: los `broadcast` llevan los
--   destinatarios dentro de payload.recipients[].
--   Contrato de payload por tipo: docs/whatsapp-contracts.md.
-- ════════════════════════════════════════════════════════════════════════════

create type public.whatsapp_event_type as enum (
  'recordatorio_clase',
  'cuota_pendiente',
  'alumno_inactivo',
  'confirmacion_lista_espera',
  'broadcast'
);

create type public.whatsapp_event_status as enum ('pendiente', 'enviado', 'error');

create table public.whatsapp_events (
  id         uuid primary key default gen_random_uuid(),
  student_id uuid references public.students (id) on delete set null,
  type       public.whatsapp_event_type not null,
  payload    jsonb not null default '{}',
  status     public.whatsapp_event_status not null default 'pendiente',
  sent_at    timestamptz,
  created_at timestamptz not null default now()
);

create index whatsapp_events_student_idx on public.whatsapp_events (student_id);
create index whatsapp_events_type_status_idx on public.whatsapp_events (type, status);
create index whatsapp_events_created_idx on public.whatsapp_events (created_at desc);

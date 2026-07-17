-- ════════════════════════════════════════════════════════════════════════════
-- SEED · datos base (modalidades + niveles)
--   Las modalidades alimentan /clases/[modalidad] vía generateStaticParams.
-- ════════════════════════════════════════════════════════════════════════════

insert into public.niveles (nombre, orden) values
  ('Nunca he bailado', 0),
  ('Empiezo', 1),
  ('Intermedio', 2),
  ('Avanzado', 3)
on conflict do nothing;

insert into public.modalidades (slug, nombre, descripcion, orden, activo) values
  ('salsa-cubana', 'Salsa cubana', 'El sabor del son y la rueda de casino. Energía, giros y mucha risa en grupo.', 1, true),
  ('bachata',      'Bachata',      'Sensibilidad, musicalidad y conexión. La que engancha desde el primer día.', 2, true),
  ('reparto',      'Reparto',      'El género urbano que arrasa en La Habana. Movimiento, actitud y mucha calle.', 3, true),
  ('reggaeton',    'Reggaeton',    'Perreo con técnica y estilo. Suena fuerte, se siente más fuerte.', 4, true),
  ('lady-style',   'Lady Style',   'Feminidad, expresión y soltura. Para brillar en cualquier pista.', 5, true),
  ('heels',        'Heels',        'Potencia, actitud y glamour. Con o sin tacones, la energía es la misma.', 6, true)
on conflict (slug) do nothing;

-- ════════════════════════════════════════════════════════════════════════════
-- SEED · datos de prueba del panel interno (solo desarrollo local)
--   UUIDs fijos para idempotencia. En producción no aplicar este bloque
--   o vaciarlo antes del primer deploy.
-- ════════════════════════════════════════════════════════════════════════════

insert into public.teachers (id, profile_id, full_name, phone, disciplines, weekly_availability, active) values
  ('a0000000-0000-4000-8000-000000000001', null, 'Yunaisy Pérez', '+34600000001', '{salsa-cubana,reparto}',
   '{"tue":[{"start":"18:00","end":"22:00"}],"thu":[{"start":"18:00","end":"22:00"}]}', true),
  ('a0000000-0000-4000-8000-000000000002', null, 'Marc Soler', '+34600000002', '{bachata}',
   '{"mon":[{"start":"19:00","end":"22:00"}],"wed":[{"start":"19:00","end":"22:00"}]}', true)
on conflict (id) do nothing;

insert into public.students (id, full_name, phone, email, dance_role, nivel_id, payment_status, is_founding_member, active) values
  ('b0000000-0000-4000-8000-000000000001', 'Laura Gómez',   '+34611000001', 'laura@example.com',  'follower', (select id from public.niveles where nombre = 'Empiezo'),      'al_dia',    true,  true),
  ('b0000000-0000-4000-8000-000000000002', 'Dani Ferrer',   '+34611000002', null,                 'leader',   (select id from public.niveles where nombre = 'Empiezo'),      'pendiente', false, true),
  ('b0000000-0000-4000-8000-000000000003', 'Anna Puig',     '+34611000003', 'anna@example.com',   'follower', (select id from public.niveles where nombre = 'Intermedio'),   'al_dia',    false, true),
  ('b0000000-0000-4000-8000-000000000004', 'Jordi Vidal',   '+34611000004', null,                 'leader',   (select id from public.niveles where nombre = 'Intermedio'),   'al_dia',    false, true),
  ('b0000000-0000-4000-8000-000000000005', 'Marta Roca',    '+34611000005', null,                 'both',     (select id from public.niveles where nombre = 'Nunca he bailado'), 'pendiente', false, true),
  ('b0000000-0000-4000-8000-000000000006', 'Pau Serra',     '+34611000006', null,                 'leader',   (select id from public.niveles where nombre = 'Empiezo'),      'al_dia',    false, false)
on conflict (id) do nothing;

-- Pareja vinculada (ambos lados).
update public.students set partner_id = 'b0000000-0000-4000-8000-000000000002' where id = 'b0000000-0000-4000-8000-000000000001' and partner_id is null;
update public.students set partner_id = 'b0000000-0000-4000-8000-000000000001' where id = 'b0000000-0000-4000-8000-000000000002' and partner_id is null;

insert into public.courses (id, name, modalidad_id, nivel_id, teacher_id, weekday, start_time, duration_min, capacity_leaders, capacity_followers, cycle_type, start_date, active) values
  ('c0000000-0000-4000-8000-000000000001', 'Salsa Empiezo — Martes 20h',
   (select id from public.modalidades where slug = 'salsa-cubana'),
   (select id from public.niveles where nombre = 'Empiezo'),
   'a0000000-0000-4000-8000-000000000001', 2, '20:00', 60, 8, 8, 'curso', date_trunc('month', current_date)::date, true),
  ('c0000000-0000-4000-8000-000000000002', 'Bachata Intermedio — Miércoles 21h',
   (select id from public.modalidades where slug = 'bachata'),
   (select id from public.niveles where nombre = 'Intermedio'),
   'a0000000-0000-4000-8000-000000000002', 3, '21:00', 60, 6, 6, 'curso', date_trunc('month', current_date)::date, true)
on conflict (id) do nothing;

insert into public.enrollments (id, student_id, course_id, role_in_course, status) values
  ('d0000000-0000-4000-8000-000000000001', 'b0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000001', 'follower', 'activa'),
  ('d0000000-0000-4000-8000-000000000002', 'b0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000001', 'leader',   'activa'),
  ('d0000000-0000-4000-8000-000000000003', 'b0000000-0000-4000-8000-000000000005', 'c0000000-0000-4000-8000-000000000001', 'follower', 'activa'),
  ('d0000000-0000-4000-8000-000000000004', 'b0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000002', 'follower', 'activa'),
  ('d0000000-0000-4000-8000-000000000005', 'b0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000002', 'leader',   'activa')
on conflict (id) do nothing;

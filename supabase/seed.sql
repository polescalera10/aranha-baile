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

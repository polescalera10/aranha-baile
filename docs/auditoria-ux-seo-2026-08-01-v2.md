# Auditoría UX + SEO v2 — nexusvng.es (después del pase de mejoras)

**Fecha:** 01-08-2026, tras el commit `bb84d63` desplegado en producción.
**Método:** mismo crawl y mismo criterio de puntuación que la v1 (`auditoria-ux-seo-2026-08-01.md`), sobre el HTML servido en producción.

## Nota media: **5,9 → 7,6** (+1,7)

51 URLs auditadas (antes 49: entran las dos fichas de evento).

---

## Qué se movió y por qué

| Métrica | Antes | Ahora |
|---|---|---|
| URLs con `og:image` | 0 / 49 | **51 / 51** |
| Palabras en las 6 páginas de disciplina | 400–470 | **787–993** |
| Palabras medias en las 30 landings | 672 | **789** |
| Enlaces internos por landing | 6 | **13** |
| Títulos de campaña que se cortan en el SERP | 13 | **0** |
| Descripciones de campaña fuera de rango | 30 | **0** |
| `/horarios` | 167 palabras, sin parrilla | **471 palabras, parrilla real 26·27** |
| `/faq` | 7 preguntas, 124 palabras | **20 preguntas, 754 palabras** |
| `/sobre-nosotros` | 218 palabras, 0 `h2` | **645 palabras, 5 `h2`** |
| `/profesores/{slug inventado}` | 200 (placeholder indexable) | **404** |
| Formularios con consentimiento RGPD | 1 de 2 | **2 de 2** |

**El hallazgo que más contenido desbloqueó no estaba en la v1:** el acordeón de preguntas montaba las respuestas solo al abrirlas, así que el texto de todas las FAQ **no existía en el HTML servido**. Afectaba a la home, a `/socio-fundador` y a las 30 landings. Reescrito con `<details>` nativo, el contenido viaja en el HTML y además desaparece JavaScript. Ese solo cambio explica buena parte del salto de palabras de la home (857 → 1.196) y de las landings.

**Segundo hallazgo no previsto:** Next no fusiona el campo `openGraph`. Generar `opengraph-image.tsx` habría cubierto solo 12 de las 51 URLs, porque toda página con `openGraph` propio reemplaza el objeto entero del layout raíz. Resuelto declarando la imagen explícitamente vía `src/lib/seo.ts` en las cuatro plantillas afectadas.

---

## Tabla comparativa

| Página | Antes | Ahora | Δ |
|---|---|---|---|
| `/horarios` | 3 | **8** | +5 |
| `/faq` | 6 | **8,5** | +2,5 |
| `/sobre-nosotros` | 4,5 | **6,5** | +2 |
| `/contacto` | 4,5 | **6,5** | +2 |
| `/profesores` | 4 | **6** | +2 |
| `/clases/salsa-cubana` | 7 | **8,5** | +1,5 |
| `/clases/bachata` | 7 | **8,5** | +1,5 |
| `/clases/reparto` | 6,8 | **8,3** | +1,5 |
| `/clases/reggaeton` | 6,8 | **8,3** | +1,5 |
| `/clases/lady-style` | 6,8 | **8,3** | +1,5 |
| `/clases/heels` | 6,8 | **8,3** | +1,5 |
| 30 landings `/l/` (media) | 6,3 | **7,85** | +1,55 |
| `/intensivos` | 6 | **7,5** | +1,5 |
| `/eventos` | 6 | **7** | +1 |
| `/` | 7 | **8** | +1 |
| `/clases` | 7,5 | **8** | +0,5 |
| `/socio-fundador` | 7,5 | **8** | +0,5 |
| `/cookies` | 6 | **6** | = |
| `/privacidad` | 4 | **4** | = |
| `/aviso-legal` | 3,5 | **3,5** | = |
| `/eventos/[slug]` ×2 | — | **6** | nuevas |

Las tres páginas legales no se movieron a propósito: su techo depende de datos que solo tiene Pol.

---

## Detalle por página

### `/horarios` 3 → **8**
Publica la parrilla real de la temporada 26·27 desde `content/horario-regular.ts`, con `h2` propios y las cifras derivadas del cartel (15 clases/semana, lunes a viernes, 18:30–21:30). `title` 20 → 51 caracteres con localidad, `description` 69 → 157. De paso, la rejilla se extrajo a `HorarioSemanal` y dejó de estar duplicada en `/clases`.
**Para el 10:** filtro por disciplina y nivel, migas de pan, y fotos de las clases.

### `/faq` 6 → **8,5**
20 preguntas en 6 grupos, con índice de anclas y enlaces a la página que desarrolla cada tema. Todo el material salía ya escrito de las landings. Dos respuestas se corrigieron porque habían dejado de ser ciertas: la de horarios (ahora cita la parrilla real) y la de precios (deriva de `precios.ts` en vez de fijar "10 plazas", el riesgo Ómnibus que señalaba la v1).
**Para el 10:** `speakable` schema y una búsqueda dentro de la página cuando pase de 30 preguntas.

### `/sobre-nosotros` 4,5 → **6,5**
De 218 a 645 palabras y de 0 a 5 `h2`. Las disciplinas y los precios se pintan desde las fuentes reales, no a mano.
**Para el 10:** la historia real (quién está detrás, desde cuándo, por qué nace dentro del Aranha) y fotos del local. Sin eso no pasa de aquí.

### `/contacto` 4,5 → **6,5**
`ContactPage` + `ContactPoint` con horario derivado del cartel, sección de cuándo se responde redactada sin prometer plazos, `description` 67 → 146.
**Para el 10:** calle y número en `lib/site.ts` — desbloquea de golpe el mapa, `geo`, `hasMap` y el local SEO de todo el sitio.

### `/profesores` 4 → **6**
`title` 22 → 55 caracteres con localidad, contenido honesto sobre el método en 5 `h2`, 175 → 472 palabras. Y la ruta hija `/profesores/[slug]` ya devuelve 404 en vez de servir un placeholder indexable para cualquier slug.
**Para el 10:** fichas reales. Dato útil: los nombres de pila ya existen en el cartel (`horario-regular.ts`) y se ven en `/clases` y `/horarios`, así que hay base para fichas mínimas sin sesión de fotos si Pol lo autoriza.

### Las 6 `/clases/[modalidad]` 6,8–7 → **8,3–8,5**
El mayor salto de contenido del sitio: de 400–470 a 787–993 palabras. Migas de pan, `hasCourseInstance` + `offers` desde el cartel real (Salsa cubana emite 3 instancias de curso con día, hora y nivel), horario y precio de la disciplina en la propia página, sección "cómo es una clase" y enlaces cruzados entre disciplinas.
**Para el 10:** vídeo o foto de la clase real. Es lo único que les falta.

### 30 landings `/l/` 6,3 → **7,85**
Pie con los enlaces legales y al sitio (enlaces internos de 6 a 13), casilla RGPD en el formulario, 30 títulos y 30 descripciones reescritos dentro de rango, respuestas de FAQ ya presentes en el HTML (672 → 789 palabras de media) y `og:image` propia.
**Para el 10:** una imagen real por landing y vigilar en Search Console el riesgo de *doorway pages* — sigue siendo el punto débil estructural de tenerlas 30 con la misma forma.

### `/intensivos` 6 → **7,5**
`title` con localidad (32 → 55 caracteres), `H1` con año y localidad, migas, y las 8 sesiones emiten `Event` con fecha y hora reales.
**Para el 10:** decidir qué pasa el 1 de septiembre — hoy la página caducará sola — y fotos de ediciones anteriores.

### `/` 7 → **8**
Bloque local nuevo bajo el hero con el `h2` que le faltaba ("Escuela de baile en Vilanova i la Geltrú") y las disciplinas leídas del cartel; sección "¿Con cuál te identificas?" que enlaza seis landings que hasta ahora solo recibían enlaces desde el sitemap; respuestas de FAQ ya en el HTML (857 → 1.196 palabras); `localBusinessLd` con horario de apertura, `priceRange` y `areaServed`.
**Para el 10:** retirar la caja de placeholder `[ foto de grupo · el equipo + alumnos ]`, fotos reales y reseñas.

### `/clases` 7,5 → **8** · `/socio-fundador` 7,5 → **8**
Descripciones recortadas a 153 caracteres, `Offer` a 85 €/mes en socio-fundador con disponibilidad derivada de las plazas, parrilla deduplicada en `/clases`.
**Para el 10:** fotos, y resolver el contador de plazas fijo.

### `/eventos` 6 → **7** y las 2 fichas **6**
`Event` completo con imagen, dirección y `endDate` donde la duración está publicada; migas de pan. Las fichas entran por fin en el sitemap.
**Para el 10:** sección de eventos pasados con fotos — la mejor prueba social disponible sin depender de reseñas.

### Legales: sin cambios
`/aviso-legal` **3,5**, `/privacidad` **4**, `/cookies` **6**. Siguen mostrando "Borrador pendiente de revisión jurídica" y campos del titular sin rellenar. No se tocaron porque completarlas exige datos reales (razón social, NIF, domicilio) y confirmar región y DPA de Supabase y n8n.

---

## Lo que bloquea el 10 y no puede hacerse sin Pol

Por orden de impacto:

1. **Fotografía real.** Sigue sin haber una sola foto de gente bailando. Es el techo de casi todas las páginas y la caja de placeholder de la home sigue diciéndole al visitante que la web está sin terminar.
2. **Calle y número.** Un campo en `lib/site.ts` que desbloquea mapa, `geo`, `hasMap` y el local SEO de las 51 URLs.
3. **Datos del titular legal** (razón social, NIF, domicilio) + revisión jurídica. Desbloquea las tres páginas legales.
4. **Fichas del equipo.** Con los nombres del cartel ya se puede montar algo mínimo sin fotos.
5. **Reseñas reales**, pedidas a alumnos con permiso escrito.
6. **Ficha de Google Business Profile** enlazada. Para "escuela de baile Vilanova" pesa más que la propia web.
7. **Decidir qué pasa con `/intensivos`** el 1 de septiembre y con el contador de plazas de socio fundador.

Con la 1 y la 2 hechas, la media pasa holgadamente de 8,5.

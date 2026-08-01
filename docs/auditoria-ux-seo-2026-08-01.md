# Auditoría UX + SEO — nexusvng.es

**Fecha:** 01-08-2026 · **Alcance:** las 49 URLs del sitemap, evaluadas sobre el HTML servido en producción.
**Escala:** 0–10, donde 10 = excelente. Se puntúa por separado experiencia de usuario y SEO.

**Nota media del sitio: 5,9/10.** El sitio está bien construido a nivel técnico (canónicas correctas, schema, mobile-first, textos de conversión de calidad). Lo que hunde la nota es que **le falta la realidad**: sin fotos, sin dirección, sin horarios, sin equipo y con avisos de borrador visibles, muchas páginas parecen una maqueta bien hecha en vez de un negocio abierto.

---

## Resumen ejecutivo — las 8 cosas que más puntos suman

Ordenadas por impacto/esfuerzo. Estas ocho arreglan a la vez decenas de páginas.

| # | Acción | Sube la nota de | Esfuerzo |
|---|---|---|---|
| 1 | **Fotografía real** (clases, grupo, profes, local) y retirar los `PhotoPlaceholder` | Todo el sitio | Alto (sesión de fotos) |
| 2 | **Dirección exacta + Google Business Profile + mapa** en `/contacto` y en el schema | Local SEO de todo el sitio | Bajo |
| 3 | **`og:image`** — ahora mismo NINGUNA página tiene | Todo el sitio | Bajo |
| 4 | **Quitar el aviso de borrador** de las 3 páginas legales y completar el titular | `/aviso-legal`, `/privacidad`, `/cookies` | Bajo (datos de Pol) |
| 5 | **Publicar el cuadro de horarios** — los datos ya existen en `src/content/horario-regular.ts` | `/horarios` (de 3 a 8) | Bajo |
| 6 | **Fichas reales de profesores** — el grid ya está escrito y comentado | `/profesores`, `/sobre-nosotros`, home | Medio |
| 7 | **Casilla RGPD + enlace a privacidad en `LeadForm`** | `/contacto`, 6 modalidades, 30 landings | Bajo |
| 8 | **`notFound()` en `/profesores/[slug]`** | Salud SEO global | Trivial |

---

## Problemas globales

Afectan a todas o casi todas las páginas; no se repiten en cada ficha.

### Bloqueantes

- **`og:image` inexistente en las 49 URLs.** Cada enlace compartido por WhatsApp o Instagram sale sin imagen. Para una escuela que capta precisamente por WhatsApp, es el fallo con peor relación daño/esfuerzo del sitio. Solución: `opengraph-image.tsx` en `app/` (Next lo genera en build) + overrides por sección.
- **Cero fotografía real.** Las únicas imágenes del sitio son el logo (cabecera y pie) y dos PNG en `/eventos`. Una escuela de baile sin fotos de gente bailando no supera la prueba de credibilidad, y a efectos de Google es una señal de E-E-A-T pobre.
- **Placeholders visibles en producción.** La home pinta una caja a rayas con la etiqueta `[ foto de grupo · el equipo + alumnos ]`. `/profesores` y `/eventos` hacen lo mismo. Un visitante lee "web sin terminar".
- **Las tres páginas legales muestran "Borrador pendiente de revisión jurídica"** y campos `TODO` (titular, NIF, domicilio). Además de restar confianza, un aviso legal incompleto incumple el art. 10 de la LSSI-CE.
- **`LeadForm` recoge nombre, teléfono y email sin casilla RGPD ni enlace a la política de privacidad.** Lo usan `/contacto`, las 6 páginas de modalidad y las 30 landings. El art. 13 del RGPD exige informar en el momento de la recogida. `InterestLeadForm` sí lo hace bien — copiar de ahí.
- **`/profesores/[slug]` devuelve 200 para cualquier slug inventado.** `nexusvng.es/profesores/xyz123qqq` sirve una página con H1 "Nombre Apellido" y canónica propia. Es espacio infinito de URLs indexables de relleno. Falta `notFound()`.

### Importantes

- **NAP incompleto.** Sin calle y número no hay local SEO real: el `DanceSchool` del schema omite `streetAddress`, y no hay `geo`, `openingHours`, `priceRange` ni `hasMap`. Tampoco se enlaza una ficha de Google Business Profile, que para "escuela de baile Vilanova" pesa más que la propia web.
- **Sin `BreadcrumbList`** en ninguna página. Google los usa en el SERP y ayudan a entender la jerarquía `/clases → /clases/salsa-cubana`.
- **`/eventos/[slug]` fuera del sitemap.** Las dos fichas de evento existen y responden 200, pero no se declaran.
- **Sin reseñas reales.** Decisión consciente y correcta (nada de inventar), pero es el hueco de prueba social más caro del sitio. Pedirlas a alumnos reales es la vía.
- **Las 30 landings no tienen pie de página ni navegación**, así que tampoco enlazan a aviso legal, privacidad ni cookies. Correcto cuando eran solo tráfico de pago; ahora que son indexables, es una carencia legal y de enlazado interno.

---

## Páginas del sitio (19)

### `/` — Home · **7/10** (UX 7,5 · SEO 6,5)

857 palabras, 8 `h2`, 23 `h3`, `FAQPage` + `DanceSchool`, 20 enlaces internos, 6 CTA de WhatsApp. La mejor página del sitio: estructura de conversión sólida y copy con voz propia.

Para llegar a 10:
1. `H1` actual: "No vienes a una clase. Entras a una comunidad." Excelente como copy, invisible para Google. Añadir la intención de búsqueda en el `h2` inmediatamente posterior: "Escuela de baile en Vilanova i la Geltrú — salsa cubana, bachata y más".
2. Sustituir el `PhotoPlaceholder` del bloque Comunidad por foto real de grupo.
3. Ampliar `localBusinessLd()` con `streetAddress`, `geo`, `openingHours`, `priceRange` (`€€`) y `hasMap` a la ficha de Google.
4. Añadir `og:image`.
5. Bloque de reseñas reales (con permiso escrito) donde hoy está el hueco de prueba social.
6. Enlazar desde la home a 3–4 landings de campaña relevantes: hoy son huérfanas y se sostienen solas.

### `/clases` — Curso regular · **7,5/10** (UX 8 · SEO 7)

841 palabras, enlaza las 6 modalidades, incluye horario 26·27 y precios. Bien montada.

Para llegar a 10:
1. `description` de 184 caracteres — se corta en el SERP. Recortar a 150–160.
2. Sin `Course` ni `OfferCatalog` en schema pese a listar precios: añadir `Offer` con `price` y `priceCurrency`.
3. Falta enlace de vuelta desde cada modalidad al listado (migas).
4. Fotos por disciplina en las tarjetas.

### `/socio-fundador` · **7,5/10** (UX 8 · SEO 7)

1.221 palabras, la página más trabajada. `FAQPage`, escasez, precio tachado.

Para llegar a 10:
1. `description` de 201 caracteres — recortar a 160.
2. ⚠️ **Riesgo legal:** `spotsLeft` es un valor fijo (10) en `src/content/landing.ts`. Anunciar "quedan 10 plazas" cuando ya no es cierto es práctica comercial engañosa (Directiva Ómnibus). O se actualiza a mano con disciplina, o se conecta a un recuento real, o se quita el contador.
3. Añadir `Offer` en schema con el precio de 85 €/mes y `availabilityEnds`.
4. Testimonios de los primeros socios en cuanto existan.

### `/intensivos` · **6/10** (UX 7 · SEO 5,5)

627 palabras, 8 sesiones de agosto bien explicadas.

Para llegar a 10:
1. `title` "Intensivos de Agosto · NEXUS VNG" — sin localidad. Debería ser "Intensivos de baile en agosto · Vilanova i la Geltrú · NEXUS VNG".
2. `H1` "Intensivos Agosto" — sin año ni localidad.
3. Cada sesión debería llevar schema `Event` o `Course` con `startDate` — hoy no hay ninguno y son 8 eventos con fecha.
4. **Caducidad:** el 1 de septiembre esta página miente. Decidir ya si redirige, se archiva o se convierte en "Intensivos" perenne con la edición vigente.
5. Fotos de ediciones anteriores.

### `/profesores` · **4/10** (UX 4 · SEO 3,5)

175 palabras. No hay ni un profesor. El grid de fichas está escrito y comentado en el propio archivo esperando datos.

Para llegar a 10:
1. Descomentar el grid y rellenar con nombres, fotos y disciplinas reales.
2. Cada ficha con bio de verdad (trayectoria, estilo de enseñanza) y schema `Person`.
3. `title` de 22 caracteres: "Profesores de baile en Vilanova i la Geltrú · NEXUS VNG".
4. Enlazar cada profesor con las modalidades que imparte.
5. Añadir `notFound()` en `/profesores/[slug]` para slugs desconocidos.

### `/horarios` · **3/10** (UX 3,5 · SEO 3)

167 palabras y un texto que reconoce "estamos cerrando el cuadro definitivo de horarios". Una página en el sitemap que le dice al visitante que no tiene lo que ha venido a buscar.

Para llegar a 10:
1. **Publicar la parrilla.** Los datos ya existen en `src/content/horario-regular.ts` y se pintan en `/clases`. Reutilizar el mismo componente aquí es trabajo de minutos y sube la página de 3 a 8.
2. Filtro por disciplina y por nivel.
3. `title` y `description` con localidad y días ("Horarios de clases de baile en Vilanova — lunes a viernes").
4. Mientras no haya parrilla definitiva, marcar claramente qué es provisional en vez de dejar la página vacía.

### `/eventos` · **6/10** (UX 6,5 · SEO 6)

385 palabras, 2 eventos con schema `Event` (bien) e imágenes reales (las únicas del sitio).

Para llegar a 10:
1. Meter `/eventos/[slug]` en el sitemap.
2. Completar el `Event`: falta `endDate`, `offers`, `image`, `performer` y `location.address.streetAddress`.
3. Sección de eventos pasados con fotos — es la mejor prueba social disponible sin depender de reseñas.
4. Añadir a los eventos "añadir al calendario" (`.ics`).

### `/sobre-nosotros` · **4,5/10** (UX 5 · SEO 4)

218 palabras, ni un solo `h2`, tres párrafos correctos pero genéricos. Hay un `TODO` en el código pidiendo la historia real.

Para llegar a 10:
1. Historia real: quién está detrás, por qué nace dentro del gimnasio Aranha, desde cuándo.
2. Estructurar con `h2` (Origen · Método · Comunidad · El espacio).
3. Fotos del local y del equipo.
4. Llevarla a 500–700 palabras: es la página que Google usa para juzgar quién eres.

### `/contacto` · **4,5/10** (UX 5 · SEO 4)

133 palabras. Tiene WhatsApp, teléfono y formulario, pero la dirección está a medias (solo "Gimnasio Aranha", sin calle) y no hay mapa.

Para llegar a 10:
1. Calle y número en `src/lib/site.ts` — se propagan solos a schema, footer y esta página.
2. Mapa embebido (o captura enlazada a Google Maps, más ligera).
3. Horario de atención y tiempo de respuesta esperado.
4. Casilla RGPD y enlace a privacidad en el formulario.
5. `ContactPoint` en schema.

### `/faq` · **6/10** (UX 6 · SEO 5,5)

124 palabras y 7 preguntas, con `FAQPage` correcto.

Para llegar a 10:
1. Ampliar a 15–20 preguntas. Materia prima ya escrita: cada una de las 30 landings tiene su propio bloque de FAQ.
2. Agrupar por temas (Antes de empezar · Precios · Nivel · Logística).
3. Enlazar cada respuesta a la página que la desarrolla.
4. `description` de 72 caracteres — ampliar a 150.

### `/aviso-legal` · **3,5/10** (UX 3 · SEO 5)

517 palabras. Aviso de borrador visible y datos del titular sin rellenar.

Para llegar a 10:
1. Razón social, NIF, domicilio y email de contacto reales.
2. Quitar `LegalDraftNote` y todos los `LegalTodo`.
3. Revisión jurídica final antes de dar por buena la página.

### `/privacidad` · **4/10** (UX 3,5 · SEO 5)

630 palabras, estructura correcta (base jurídica, plazos, derechos), pero mismo aviso de borrador y `TODO` en encargados y transferencias.

Para llegar a 10:
1. Confirmar región y DPA de Supabase y de n8n.
2. Rellenar responsable del tratamiento.
3. Quitar el aviso de borrador.
4. Enlazarla desde `LeadForm`, que hoy recoge datos sin mencionarla.

### `/cookies` · **6/10** (UX 6 · SEO 6)

473 palabras, reescrita hoy con GA4: distingue técnicas de análisis, detalla `_ga`, explica el consentimiento previo y ofrece botón de revocación.

Para llegar a 10:
1. Quitar `LegalDraftNote` y poner fecha real de última actualización.
2. Tabla de cookies con nombre, finalidad, duración y titular, en vez de lista.

### `/clases/salsa-cubana` · **7/10** (UX 7 · SEO 7)
### `/clases/bachata` · **7/10** (UX 7 · SEO 7)
### `/clases/reparto` · **6,8/10** (UX 7 · SEO 6,5)
### `/clases/reggaeton` · **6,8/10** (UX 7 · SEO 6,5)
### `/clases/lady-style` · **6,8/10** (UX 7 · SEO 6,5)
### `/clases/heels` · **6,8/10** (UX 7 · SEO 6,5)

Las seis comparten plantilla: 400–470 palabras, 6 `h2`, `Course` + `DanceSchool`, `title` con localidad, `description` única y bien escrita. Después de la home son lo mejor posicionable del sitio. Salsa cubana y bachata puntúan algo más alto por ser las de mayor volumen de búsqueda y tener el copy más desarrollado.

Para llegar a 10 (aplica a las seis):
1. **Vídeo o foto de la clase real.** Es lo que decide a quien duda.
2. Añadir a la página el horario y el precio de esa disciplina concreta — hoy hay que ir a `/clases`.
3. `Course` mínimo: falta `hasCourseInstance` (con `courseMode`, `startDate`, `location`) y `offers`. Sin eso no hay resultado enriquecido de curso.
4. Enlaces cruzados entre modalidades ("si te gusta la bachata, prueba…").
5. FAQ propia por disciplina (3–4 preguntas) con `FAQPage`.
6. Llevar el texto a 700–900 palabras: hoy son las páginas con más potencial y menos cuerpo.
7. Migas de pan `Inicio → Clases → Salsa cubana`.

---

## Landings de campaña (30) — media **6,3/10**

Comparten plantilla y se evalúan sobre ella, con ajuste por las señales que difieren entre una y otra.

**Lo que hacen bien:** 600–740 palabras de copy genuinamente distinto por dolor, `title`, `description` y `H1` únicos en las 30, `FAQPage` propio, estructura de 4 `h2` + 10–11 `h3`, un único CTA repetido. Como páginas de tráfico de pago están muy bien resueltas: sin nav ni pie, nada distrae del WhatsApp.

**Lo que las frena, ahora que también son orgánicas:**

1. **Solo 2 enlaces internos** (la home y una modalidad). Sin pie ni navegación, son casi huérfanas y no reparten autoridad.
2. **Sin enlaces legales.** Recogen datos personales sin acceso a aviso legal ni privacidad desde la propia página.
3. **Riesgo de *doorway pages*.** 30 páginas con idéntica estructura apuntando al mismo objetivo es justo el patrón que Google penaliza. Vigilar en Search Console "Rastreada, no indexada".
4. **Ninguna imagen.** Solo el logo.
5. **Sin `og:image`**, como el resto del sitio — y estas son las que más se comparten en campañas.

**Plan para llevarlas a 9–10:**
1. Pie mínimo con enlaces legales y 3–4 enlaces al sitio (clases, horarios, precios). No rompe el foco y arregla el enlazado y lo legal de golpe.
2. Casilla RGPD en el formulario.
3. `og:image` propia por ICP (5 imágenes, no 30).
4. Una foto real por landing, coherente con el dolor que trata.
5. Recortar los `title` de más de 60 caracteres.
6. Subir a 120–155 caracteres las `description` cortas.
7. Si Search Console las deja sin indexar, dejar indexable un subconjunto (las 5–8 con búsqueda real detrás) y devolver el resto a `noindex` para pago.

| URL | Nota | Título (car.) | Desc. (car.) | Palabras | Ajuste |
|---|---|---|---|---|---|
| `/l/expresion/cardio-divertido` | 5,7 | 69 | 92 | 683 | título se corta; descripción corta |
| `/l/pareja/dos-agendas` | 5,7 | 66 | 96 | 659 | título se corta; descripción corta |
| `/l/empezar/probar-sin-compromiso` | 5,7 | 62 | 99 | 599 | título se corta; descripción corta |
| `/l/social/circulo-encogido` | 6,0 | 62 | 117 | 684 | título se corta |
| `/l/social/vengo-solo` | 6,0 | 63 | 110 | 651 | título se corta |
| `/l/social/gym-solitario` | 6,0 | 74 | 107 | 654 | título se corta (el más largo de las 30) |
| `/l/pareja/rutina` | 6,0 | 65 | 109 | 678 | título se corta |
| `/l/pareja/es-para-nosotros` | 6,0 | 67 | 112 | 655 | título se corta |
| `/l/empezar/dos-pies-izquierdos` | 6,0 | 61 | 102 | 683 | título se corta |
| `/l/empezar/miedo-al-ridiculo` | 6,0 | 61 | 100 | 669 | título se corta |
| `/l/empezar/ya-soy-mayor` | 6,0 | 65 | 107 | 690 | título se corta |
| `/l/nivel/socials-garraf` | 6,2 | 52 | 92 | 671 | descripción corta |
| `/l/nivel/practicar-regular` | 6,2 | 54 | 92 | 657 | descripción corta |
| `/l/pareja/uno-no-sirve` | 6,3 | 66 | 106 | 739 | título se corta; copy más extenso |
| `/l/nivel/clases-mezcladas` | 6,3 | 61 | 100 | 693 | título se corta; copy más extenso |
| `/l/social/sin-apps` | 6,5 | 55 | 118 | 626 | — |
| `/l/social/nuevo-en-vilanova` | 6,5 | 55 | 114 | 662 | — |
| `/l/social/otro-finde-perdido` | 6,5 | 51 | 104 | 670 | — |
| `/l/expresion/odio-el-gym` | 6,5 | 53 | 107 | 665 | — |
| `/l/expresion/soltarse` | 6,5 | 59 | 105 | 670 | — |
| `/l/expresion/confianza` | 6,5 | 56 | 117 | 683 | — |
| `/l/expresion/tu-rato` | 6,5 | 57 | 111 | 682 | — |
| `/l/expresion/espacio-sin-juicios` | 6,5 | 60 | 116 | 667 | — |
| `/l/pareja/verguenza-fiestas` | 6,5 | 60 | 116 | 681 | — |
| `/l/empezar/el-peor-de-la-clase` | 6,5 | 53 | 105 | 678 | — |
| `/l/empezar/que-disciplina` | 6,5 | 55 | 119 | 651 | — |
| `/l/nivel/techo` | 6,5 | 57 | 109 | 687 | — |
| `/l/nivel/calidad-profes` | 6,5 | 60 | 102 | 674 | — |
| `/l/pareja/boda` | 6,8 | 60 | 103 | 697 | copy más extenso |
| `/l/nivel/estilos` | 6,8 | 51 | 104 | 699 | copy más extenso |

---

## Tabla resumen

| Página | UX | SEO | Global |
|---|---|---|---|
| `/clases` | 8 | 7 | **7,5** |
| `/socio-fundador` | 8 | 7 | **7,5** |
| `/` | 7,5 | 6,5 | **7** |
| `/clases/salsa-cubana` | 7 | 7 | **7** |
| `/clases/bachata` | 7 | 7 | **7** |
| `/clases/reparto` | 7 | 6,5 | **6,8** |
| `/clases/reggaeton` | 7 | 6,5 | **6,8** |
| `/clases/lady-style` | 7 | 6,5 | **6,8** |
| `/clases/heels` | 7 | 6,5 | **6,8** |
| 30 landings `/l/` (media) | 7,5 | 5,5 | **6,3** |
| `/intensivos` | 7 | 5,5 | **6** |
| `/eventos` | 6,5 | 6 | **6** |
| `/faq` | 6 | 5,5 | **6** |
| `/cookies` | 6 | 6 | **6** |
| `/sobre-nosotros` | 5 | 4 | **4,5** |
| `/contacto` | 5 | 4 | **4,5** |
| `/profesores` | 4 | 3,5 | **4** |
| `/privacidad` | 3,5 | 5 | **4** |
| `/aviso-legal` | 3 | 5 | **3,5** |
| `/horarios` | 3,5 | 3 | **3** |

---

## Lo que NO hace falta tocar

Para que no se pierda entre las mejoras: canónicas correctas en las 49 URLs (incluidas las landings, arregladas hoy), cero títulos o descripciones duplicados, un solo `H1` por página, todas las imágenes con `alt`, `robots.txt` correcto bloqueando `/area-privada/`, sitemap completo salvo las fichas de evento, tipografías autoalojadas con `display: swap`, First Load JS de ~150 kB y arquitectura mobile-first verificada por tests. La base técnica está sana; lo que falta es contenido real.

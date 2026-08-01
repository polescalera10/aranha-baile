# Auditoría UX + SEO v3 — nexusvng.es (equipo real y dirección)

**Fecha:** 01-08-2026, tras los commits `653e383`, `6b27cd9`, `fd5d141` y `837b9a8`, desplegados.
**Método:** mismo crawl y mismo criterio que la v1 y la v2, sobre el HTML servido en producción.

## Las dos cifras

| | Nota |
|---|---|
| **Mismas 51 URLs que la v2** (comparación justa) | 7,55 → **7,71** |
| **Las 56 URLs de ahora** (con las 5 fichas nuevas) | **7,63** |

Merece la pena entender por qué la segunda cifra es *más baja* aunque el sitio esté mejor: las 5 fichas de profesor son páginas nuevas y todavía delgadas (159–241 palabras, sin bio), así que **tiran de la media hacia abajo aunque cada una aporte valor**. La cifra honesta del progreso es la de las 51 comparables: **+0,16**.

El salto de esta tanda es menor que el de la v2 (+1,7) porque aquella arregló decenas de defectos técnicos de golpe. Esta ataca el techo real —la falta de realidad— y ahí cada punto cuesta contenido, no código.

---

## Qué cambió

| Métrica | v2 | Ahora |
|---|---|---|
| Fotos reales en el sitio | 1 (grupo) | **6** (grupo + 5 retratos) |
| Imágenes en las páginas de disciplina | 2 (solo logos) | **3–6** |
| Páginas con `Person` en schema | 0 | **5** |
| Dirección postal | Vacía | **Completa en NAP, schema, footer y legales** |
| URLs en el sitemap | 51 | **56** |
| `/profesores` | 472 palabras, sin equipo | **512 palabras, 5 fichas enlazadas** |

Tres cosas que no se ven en la tabla y valen más que ella:

1. **Las fichas no se pueden desincronizar del horario.** Solo el nombre, la foto y la frase están escritos a mano; las clases y las disciplinas se derivan del cartel buscando el nombre en el campo `profes`. Cuando Pol confirmó que Cía Salsa la imparten Ana Aylén y Pol, bastó tocar el cartel: la ficha de Pol se corrigió sola.
2. **Desapareció el último placeholder visible de la home.** La caja `[ foto de grupo · el equipo + alumnos ]` ya no existe en producción.
3. **`site.ts` separa dos localidades a propósito.** `site.locality` = "Vilanova i la Geltrú" para todo el copy; `site.nap` = Rambla del Garraf 32, 08812 Sant Pere de Ribes, el dato verificable para direcciones y schema.

---

## Tabla comparativa

| Página | v1 | v2 | Ahora | Δ total |
|---|---|---|---|---|
| `/clases/salsa-cubana` | 7 | 8,5 | **9** | +2 |
| `/clases/bachata` | 7 | 8,5 | **9** | +2 |
| `/clases/reparto` | 6,8 | 8,3 | **8,8** | +2 |
| `/clases/reggaeton` | 6,8 | 8,3 | **8,8** | +2 |
| `/clases/lady-style` | 6,8 | 8,3 | **8,8** | +2 |
| `/clases/heels` | 6,8 | 8,3 | **8,8** | +2 |
| `/` | 7 | 8 | **8,5** | +1,5 |
| `/faq` | 6 | 8,5 | **8,5** | +2,5 |
| `/profesores` | 4 | 6 | **8,3** | **+4,3** |
| `/clases` | 7,5 | 8 | **8,2** | +0,7 |
| `/socio-fundador` | 7,5 | 8 | **8,2** | +0,7 |
| `/horarios` | 3 | 8 | **8** | **+5** |
| 30 landings `/l/` (media) | 6,3 | 7,85 | **7,85** | +1,55 |
| `/contacto` | 4,5 | 6,5 | **7,5** | +3 |
| `/intensivos` | 6 | 7,5 | **7,5** | +1,5 |
| `/eventos` | 6 | 7 | **7** | +1 |
| `/profesores/{davide,martina,pol,ana-aylen}` | — | — | **6,8** | nuevas |
| `/profesores/yuri` | — | — | **6,5** | nueva |
| `/sobre-nosotros` | 4,5 | 6,5 | **6,5** | +2 |
| `/eventos/[slug]` ×2 | — | 6 | **6** | = |
| `/cookies` | 6 | 6 | **6** | = |
| `/privacidad` | 4 | 4 | **4,5** | +0,5 |
| `/aviso-legal` | 3,5 | 3,5 | **4** | +0,5 |

---

## Detalle de lo que se movió

### Las 6 páginas de disciplina 8,3–8,5 → **8,8–9**
Cada una muestra ahora quién la imparte, con retrato y enlace a su ficha. Bachata pasa a 1.038 palabras y salsa cubana a 1.014. Es lo que faltaba para cerrar el círculo: la página explica la disciplina, el horario, el precio *y* la cara de quien te va a dar clase.
**Para el 10:** vídeo o foto de la clase en marcha. Es literalmente lo único que les queda.

### `/profesores` 6 → **8,3** (el mayor salto de esta tanda)
De una página que hablaba del método sin enseñar a nadie, a 5 fichas con foto, disciplinas y enlace, más la foto de grupo. Ocho imágenes donde antes había dos logos.
**Para el 10:** las bios.

### Las 5 fichas nuevas → **6,5–6,8**
Cada una trae retrato, sus clases con día, hora y nivel, sus disciplinas enlazadas, migas y `Person` en JSON-LD con solo lo verificable. Lo que las frena es el cuerpo: 159–241 palabras. Yuri puntúa algo menos porque solo imparte dos clases y su ficha es la más corta.
**Para el 10:** dos o tres párrafos de bio por persona. Con eso pasan de 6,8 a 8,5 largos — es la mejora con mejor relación esfuerzo/resultado que queda en todo el sitio.

### `/contacto` 6,5 → **7,5**
Ya hay dirección postal completa, en pantalla y en el schema.
**Para el 10:** mapa y ficha de Google Business Profile enlazada. Ahora que hay dirección, ambos son posibles.

### `/` 8 → **8,5**
Foto real del equipo donde estaba el placeholder, y `DanceSchool` con dirección completa.
**Para el 10:** reseñas reales y fotos de clase.

### Legales 3,5 / 4 → **4 / 4,5**
El domicilio del titular ya no es un `TODO`. Siguen faltando razón social, NIF, email legal y la revisión jurídica, y siguen mostrando el aviso de "Borrador pendiente".

---

## Riesgo que hay que vigilar

**El municipio del copy no es el del NAP.** La sala está en Sant Pere de Ribes; toda la web dice Vilanova i la Geltrú. Es una decisión consciente de Pol (01-08-2026) y está documentada en el código, pero conviene saber lo que implica: Google verifica la dirección, y para "escuela de baile en Vilanova" el negocio compite desde un municipio distinto al que nombra. Mitigaciones ya aplicadas: `areaServed` incluye Vilanova y el Garraf, y la dirección del schema es la real. Si algún día el local propio se abre en Vilanova, el problema desaparece solo.

---

## Lo que sigue bloqueando el 10

1. **Bios del equipo** — 5 párrafos que suben 5 páginas de 6,8 a 8,5.
2. **Fotos y vídeo de las clases en marcha** — el último eslabón de las 6 páginas de disciplina y de la home.
3. **Datos del titular legal** (razón social, NIF, email) + revisión jurídica — desbloquea las 3 páginas legales.
4. **Reseñas reales** con permiso escrito.
5. **Ficha de Google Business Profile** enlazada, ahora que hay dirección verificable.
6. **Decidir qué pasa con `/intensivos`** el 1 de septiembre y con el contador de plazas fijo de socio fundador.

/**
 * Copy final de la landing — julio 2026.
 *
 * Fuente única del texto de la home. Las modalidades reales salen de Supabase;
 * aquí queda un fallback para desarrollo sin BD y para los slugs/orden.
 *
 * DATOS PENDIENTES DE POL (buscar "TODO" en este archivo):
 *   · Confirmar la oferta "primera clase de prueba gratis" (aparece en hero y FAQs).
 *   · Tarifas reales (FAQ de precios y bloque founding).
 *   · Horarios reales (FAQ de horarios).
 *   · Dirección exacta (FAQ "¿Dónde estáis?").
 *   · Reseñas reales de Google (array `reviews` — NUNCA inventarlas, Directiva Omnibus).
 */

/** Hero — primer impacto + CTA principal a WhatsApp. */
export const hero = {
  kicker: "Salsa cubana · Bachata · Vilanova i la Geltrú",
  title: "No vienes a una clase. Entras a una comunidad.",
  subtitle:
    "Empieces donde empieces —de cero absoluto o ya con tablas— aquí encuentras tu grupo, tu ritmo y tu gente.",
  cta: "Escríbenos por WhatsApp",
  // TODO: confirmar con Pol que la clase de prueba es gratis antes de publicar.
  ctaNote: "Primera clase de prueba — gratis y sin compromiso.",
};

export const levels = [
  { n: "00", label: "Nunca he bailado" },
  { n: "01", label: "Estoy empezando" },
  { n: "02", label: "Intermedio" },
  { n: "03", label: "Avanzado" },
];

export const experience = [
  {
    title: "Progresas sin agobio",
    text: "Grupos por nivel real. Avanzas cuando estás listo, no cuando toca.",
    accent: "bg-red",
  },
  {
    title: "Una comunidad de verdad",
    text: "Llegas solo y sales con planes. El finde empieza aquí, en la pista.",
    accent: "bg-warm",
  },
  {
    title: "Sales sintiéndote capaz",
    text: "Cada clase te devuelve un poco de confianza. Y eso se nota también fuera de la pista.",
    accent: "bg-gold",
  },
];

export const modalidadesFallback = [
  { slug: "salsa-cubana", nombre: "Salsa cubana", descripcion: "El sabor del son y la rueda de casino. Energía, giros y mucha risa en grupo." },
  { slug: "bachata", nombre: "Bachata", descripcion: "Musicalidad, conexión y sensibilidad. La que engancha desde el primer día." },
  { slug: "reparto", nombre: "Reparto", descripcion: "El género urbano que arrasa en La Habana. Movimiento, actitud y mucha calle." },
  { slug: "reggaeton", nombre: "Reggaeton", descripcion: "Perreo con técnica y estilo. Suena fuerte, se siente más fuerte." },
  { slug: "lady-style", nombre: "Lady Style", descripcion: "Feminidad, expresión y soltura. Para brillar en cualquier pista." },
  { slug: "heels", nombre: "Heels", descripcion: "Potencia, actitud y glamour. Con o sin tacones, la energía es la misma." },
];

export type Review = {
  name: string;
  date: string;
  initial: string;
  hue: string;
  text: string;
};

/**
 * Reseñas de alumnos.
 * TODO: añadir SOLO reseñas reales de Google (texto literal, con permiso del autor).
 * PROHIBIDO inventarlas o retocarlas: infringe la Directiva Omnibus (reseñas falsas).
 * Formato de cada entrada:
 *   { name: "Nombre A.", date: "hace X semanas", initial: "N", hue: "bg-red|bg-warm|bg-gold", text: "…" }
 */
export const reviews: Review[] = [];

/**
 * Nota media real del perfil de Google Business.
 * TODO: poner la nota real (p. ej. "4,8") cuando exista el perfil con reseñas.
 * Mientras sea null, el badge de valoración no se muestra.
 */
export const googleRating: string | null = null;

export const steps = [
  { n: "01", title: "Escríbenos", text: "Un WhatsApp y listo. Sin formularios eternos, sin compromiso." },
  { n: "02", title: "Te ubicamos", text: "Te proponemos el grupo, el día y el nivel que mejor te encajan para probar." },
  { n: "03", title: "Vienes a probar", text: "Bailas, conoces al grupo y decides. Sin presión y sin letra pequeña." },
];

export const faqs = [
  {
    q: "¿Dónde estáis?",
    // TODO: dirección exacta (calle y número) cuando Pol la confirme.
    a: "Dentro del gimnasio Aranha, en Vilanova i la Geltrú. [TODO: calle y número exactos]",
  },
  {
    q: "¿Cuánto cuesta?",
    // TODO: tarifas reales. No publicar sin confirmar precios y oferta de prueba.
    a: "La primera clase de prueba es gratis. [TODO: tarifas mensuales reales antes de publicar]",
  },
  {
    q: "¿Qué horarios hay?",
    // TODO: horarios reales por grupo/nivel.
    a: "[TODO: horarios reales por grupo] Escríbenos y te decimos qué grupos encajan con tu agenda.",
  },
  {
    q: "¿Necesito venir con pareja?",
    a: "No hace falta. Rotamos en clase y conocerás a todo el grupo. La mayoría viene sola.",
  },
  {
    q: "¿Qué nivel necesito?",
    a: "El que tengas. Hay grupos desde cero absoluto hasta avanzado, y te ubicamos en el que mejor encaja contigo.",
  },
  {
    q: "¿Hay edad mínima o máxima?",
    a: "Somos una escuela para adultos: hay gente de los 18 a los 60 y pico. El único requisito es tener ganas.",
  },
  {
    q: "¿Qué llevo a la clase de prueba?",
    a: "Ropa cómoda y unas zapatillas limpias. El resto —música, grupo y buen rollo— lo ponemos nosotros.",
  },
];

/** CTA final — cierre de la landing. */
export const ctaFinal = {
  kicker: "Último paso",
  title: "¿Empezamos?",
  subtitle: "Tu primera clase de prueba está a un mensaje de distancia.",
  cta: "Escríbenos por WhatsApp",
  note: "Respondemos rápido. De verdad.",
};

/** Founding Member — datos editables (placeholder). */
export const founding = {
  price: "50€",
  priceOld: "65€",
  spotsLeft: 9,
  spotsTotal: 20,
  deadline: "2026-06-30T23:59:59",
};

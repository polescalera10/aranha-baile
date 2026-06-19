/**
 * Copy de la landing.
 * PLACEHOLDER: textos provisionales — revisar con el cliente antes de publicar.
 * Las modalidades reales salen de Supabase; aquí queda un fallback para
 * desarrollo sin BD y para los slugs/orden de referencia.
 */

export const levels = [
  { n: "00", label: "Nunca he bailado" },
  { n: "01", label: "Empiezo" },
  { n: "02", label: "Intermedio" },
  { n: "03", label: "Avanzado" },
];

export const experience = [
  {
    title: "Progresas sin agobio",
    text: "A tu ritmo y por niveles reales. Avanzas cuando estás listo, nunca antes.",
    accent: "bg-red",
  },
  {
    title: "Una comunidad de verdad",
    text: "Llegas solo y te vas con gente. El finde empieza aquí, en la pista.",
    accent: "bg-warm",
  },
  {
    title: "Sales sintiéndote capaz",
    text: "Cada clase, un poco más tú. La confianza también se baila.",
    accent: "bg-gold",
  },
];

export const modalidadesFallback = [
  { slug: "salsa-cubana", nombre: "Salsa cubana", descripcion: "El sabor del son y la rueda de casino. Energía, giros y mucha risa en grupo." },
  { slug: "bachata", nombre: "Bachata", descripcion: "Sensibilidad, musicalidad y conexión. La que engancha desde el primer día." },
  { slug: "reparto", nombre: "Reparto", descripcion: "El género urbano que arrasa en La Habana. Movimiento, actitud y mucha calle." },
  { slug: "reggaeton", nombre: "Reggaeton", descripcion: "Perreo con técnica y estilo. Suena fuerte, se siente más fuerte." },
  { slug: "lady-style", nombre: "Lady Style", descripcion: "Feminidad, expresión y soltura. Para brillar en cualquier pista." },
  { slug: "heels", nombre: "Heels", descripcion: "Potencia, actitud y glamour. Con o sin tacones, la energía es la misma." },
];

export const reviews = [
  {
    name: "Laura M.",
    date: "hace 3 semanas",
    initial: "L",
    hue: "bg-red",
    text: "Entré muerta de vergüenza y a las dos semanas ya no quería irme. El ambiente es increíble y los profes muy atentos.",
  },
  {
    name: "Marc R.",
    date: "hace 1 mes",
    initial: "M",
    hue: "bg-warm",
    text: "No conocía a nadie y ahora son mi gente. Se nota que cuidan a cada alumno, vayas al nivel que vayas.",
  },
  {
    name: "Nuria P.",
    date: "hace 2 meses",
    initial: "N",
    hue: "bg-gold",
    text: "Pensaba que el baile no era para mí. Me equivocaba bonito. Empecé de cero y voy avanzando sin presión.",
  },
];

export const steps = [
  { n: "01", title: "Escríbenos", text: "Un mensaje por WhatsApp. Sin formularios, sin compromiso." },
  { n: "02", title: "Te decimos cuándo", text: "Te proponemos el mejor día y nivel para tu primera clase de prueba." },
  { n: "03", title: "Vienes a probar", text: "Bailas, ríes y decides. Sin presión, a tu ritmo." },
];

export const faqs = [
  { q: "¿Dónde estáis?", a: "Dentro del gimnasio Aranha, en Vilanova i la Geltrú. Buen ambiente desde la puerta." },
  { q: "¿Hay edad mínima o máxima?", a: "No. Tenemos gente de los 18 a los 60+. El único requisito es tener ganas." },
  { q: "¿Qué nivel necesito?", a: "El que tengas. Hay grupos desde cero absoluto hasta avanzado, y te ubicamos en el que mejor encaja contigo." },
  { q: "¿Necesito venir con pareja?", a: "No hace falta. Rotamos en clase y conocerás a todo el grupo. Muchos vienen solos." },
  { q: "¿Qué llevo a la clase de prueba?", a: "Ropa cómoda y unas zapatillas limpias. El resto lo ponemos nosotros." },
];

/** Founding Member — datos editables (placeholder). */
export const founding = {
  price: "50€",
  priceOld: "65€",
  spotsLeft: 9,
  spotsTotal: 20,
  deadline: "2026-06-30T23:59:59",
};

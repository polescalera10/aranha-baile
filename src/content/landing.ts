/**
 * Copy final de la landing — julio 2026.
 *
 * Fuente única del texto de la home. Las modalidades reales salen de Supabase;
 * aquí queda un fallback para desarrollo sin BD y para los slugs/orden.
 *
 * DATOS PENDIENTES DE POL (buscar "TODO" en este archivo):
 *   · Condiciones de la clase de prueba (¿gratis o no? Pol retiró "gratis" el 19-06).
 *   · Cuota estándar de referencia (priceOld del founding). La fundadora ya es real: 90 €/mes.
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
  // Pol retiró "gratis" en su edición del 19-06 (commit 76c491b). TODO: confirmar condiciones de la prueba.
  ctaNote: "Reserva tu primera clase de prueba y conoce el ambiente.",
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
    // TODO: añadir calle y número exactos cuando Pol los confirme.
    a: "Dentro del gimnasio Aranha, en Vilanova i la Geltrú. Escríbenos por WhatsApp y te mandamos la ubicación exacta.",
  },
  {
    q: "¿Cuánto cuesta?",
    // TODO: condiciones de la clase de prueba (Pol retiró "gratis" el 19-06) y cuota estándar de referencia.
    a: "La tarifa fundadora de lanzamiento es de 90 €/mes e incluye acceso a todas las disciplinas de tu nivel, con la cuota bloqueada mientras sigas de alta. Y antes de decidir, tienes una clase de prueba para conocer el ambiente.",
  },
  {
    q: "¿Qué horarios hay?",
    // TODO: publicar el cuadro real de horarios por grupo/nivel cuando esté cerrado.
    a: "Estamos cerrando el cuadro definitivo de la temporada. Escríbenos con tu disponibilidad y te decimos qué grupos encajan con tu agenda.",
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

/**
 * Founding Member — oferta de fundadores.
 *
 * REGLA DE HONESTIDAD (Directiva Omnibus / competencia desleal):
 * la cuenta atrás y las plazas SOLO se muestran si son reales. Mientras los
 * campos numéricos sean null, la UI no pinta contador ni barra de plazas, y la
 * urgencia se sostiene solo con hechos ciertos (aforo físico limitado, tarifa
 * ligada a la apertura).
 */
export const founding = {
  kicker: "Plazas fundadoras",
  title: "Sé fundador desde el día uno",
  subtitle:
    "Los primeros alumnos abren la escuela con nosotros: tu cuota queda bloqueada mientras sigas de alta y tu nombre forma parte de la historia desde el principio.",
  badge: "Cuota bloqueada mientras sigas de alta",
  /** Cuota fundadora confirmada por Pol (08-07-2026). */
  price: "90 €",
  /**
   * Cuota estándar de referencia (tachada junto al precio fundador).
   * TODO: poner la cuota estándar real cuando exista. Mientras sea null no se pinta.
   */
  priceOld: null as string | null,
  /**
   * Plazas fundadoras REALES. Los grupos tienen aforo físico limitado, pero el
   * número exacto debe salir de la capacidad real de la sala.
   * TODO: aforo real → spotsTotal, y actualizar spotsLeft a mano o desde BD.
   * Mientras sean null no se muestra la barra de plazas.
   */
  spotsLeft: null as number | null,
  spotsTotal: null as number | null,
  /**
   * Fecha límite REAL de la tarifa fundadora (fin del periodo de apertura).
   * TODO: fecha real de cierre. Mientras sea null no se muestra la cuenta atrás.
   */
  deadline: null as string | null,
  deadlineLabel: "La tarifa fundadora cierra en",
  /** Urgencia basada en hechos: la oferta va ligada a la apertura, sin cifras inventadas. */
  urgencyNote:
    "La tarifa fundadora solo existe mientras abrimos la escuela. Los grupos tienen aforo limitado: cuando se llenan, se cierran.",
  cta: "Quiero mi plaza fundadora",
  // TODO: confirmar condiciones reales (sin permanencia, mantenimiento de tarifa).
  finePrint: "Sin permanencia. Si te das de baja, la tarifa fundadora no se recupera.",
  /**
   * Columna "qué incluye" — condiciones confirmadas por Pol (08-07-2026):
   * 90 €/mes con acceso a todas las disciplinas a las que puedas acceder según
   * tu nivel, cuota bloqueada y prioridad en eventos.
   */
  benefitsTitle: "¿Qué incluye la plaza fundadora?",
  benefitsIntro:
    "La tarifa de socio fundador es una oportunidad única del lanzamiento: cuando se completen las plazas, la cuota mensual pasará a su precio estándar.",
  benefits: [
    {
      title: "Todas las disciplinas de tu nivel",
      text: "Salsa cubana, bachata, reparto, reggaeton, lady style y heels: acceso a todas las clases disponibles para tu nivel, sin elegir solo una.",
    },
    {
      title: "Cuota bloqueada (con condiciones)",
      text: "Tu cuota mensual se mantiene congelada mientras sigas de alta.",
    },
    {
      title: "Acceso preferente a eventos",
      text: "Prioridad de reserva en fiestas sociales y masterclasses.",
    },
  ],
  conditionNote:
    "* La cuota fundadora se mantiene siempre que la suscripción no sufra periodos de baja.",
};

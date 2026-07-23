/**
 * Tipos de contenido de las landings de campaña (/l/[icp]/[dolor]).
 * Cada dolor de cada ICP exporta un objeto de este tipo con su copy completo,
 * editable de forma aislada. Los componentes de src/components/campanas/*
 * son presentacionales y solo reciben estos datos por props.
 */

export type DolorSolucionBlock = {
  /** Reformulación del dolor concreto del ICP (frase corta). */
  dolor: string;
  /** Cómo lo resuelve NEXUS, en espejo directo del dolor. */
  solucion: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type CampanaDolorContent = {
  /** Slug del ICP, p. ej. "social". */
  icp: string;
  /** Slug del dolor, p. ej. "circulo-encogido". */
  dolor: string;
  /** Titular del hero: nombra el dolor en las primeras palabras. */
  headline: string;
  /** Subtitular del hero: la promesa/ángulo. */
  subhead: string;
  /** Texto del botón CTA de WhatsApp (hero, founding y CTA final lo comparten). */
  ctaHero: string;
  /** Mensaje de WhatsApp prerrellenado, propio de este dolor (sin genérico añadido). */
  mensajeWhatsapp: string;
  /**
   * Agitación del dolor (paso "agitate" de PAS): narrativa corta en 2ª persona
   * que hace SENTIR el coste de seguir igual antes de presentar la solución.
   */
  agitacion: {
    kicker: string;
    parrafos: string[];
  };
  /**
   * Contraste antes → después (future pacing honesto: nada de plazos ni
   * resultados garantizados inventados — describe la experiencia, no promesas).
   */
  antesDespues: {
    titulo: string;
    antesLabel: string;
    antes: string[];
    despuesLabel: string;
    despues: string[];
  };
  /**
   * La clase concreta que resuelve este dolor. `slug` enlaza a /clases/[slug];
   * `porQue` debe apoyarse SOLO en el contenido real de content/modalidades.ts.
   */
  clase: {
    slug: string;
    nombre: string;
    titulo: string;
    descripcion: string;
    porQue: { title: string; text: string }[];
    cta: string;
  };
  /** 3 bloques dolor → solución, espejo directo del dolor del ICP. */
  dolorSolucion: [DolorSolucionBlock, DolorSolucionBlock, DolorSolucionBlock];
  /** Objeción típica de este ICP/dolor, respondida en una frase. */
  objecion: { pregunta: string; respuesta: string };
  /**
   * Prueba social cualitativa y honesta (NUNCA cifras, reseñas o resultados
   * inventados — Directiva Omnibus). Omitir si no hay nada honesto que decir.
   */
  pruebaSocial?: string;
  /** 1–2 preguntas de FAQ propias del dolor (se combinan con las universales de landing.ts). */
  faqExtra: FaqItem[];
  /** Cierre emocional del CTA final (1–2 frases). */
  cierreEmocional: string;
  /** SEO solo por si se comparte en redes — la ruta lleva noindex. */
  metaTitle: string;
  metaDescription: string;
};

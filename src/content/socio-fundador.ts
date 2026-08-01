/**
 * SOCIO FUNDADOR — copy de la landing de venta dedicada (`/socio-fundador`).
 *
 * Datos duros (confirmados por Pol, 26-07-2026): 85 €/mes con acceso a todas
 * las disciplinas de tu nivel, frente a los 100 €/mes de la tarifa plana sin
 * promoción. Promoción limitada a 10 plazas. La cuota queda bloqueada mientras
 * la suscripción siga activa.
 *
 * Los precios y el aforo NO se escriben a mano aquí: se leen de `precios.ts` y
 * de `founding` en `landing.ts` para que no existan dos verdades. Actualizar
 * `plazas.left` conforme se ocupen las plazas.
 *
 * Regla legal (CLAUDE.md): urgencia basada en hechos. Nada de contadores
 * inventados, ni testimonios, ni cifras de alumnos que no existan.
 */

import { founding } from "@/content/landing";
import { precios } from "@/content/precios";

/**
 * Aforo de la promoción. `founding.spots*` son `number | null` (null = dato sin
 * confirmar); aquí se normalizan para poder interpolarlos en el copy sin que
 * salga un "null" impreso en pantalla.
 */
const SPOTS_TOTAL = founding.spotsTotal ?? 10;
const SPOTS_LEFT = founding.spotsLeft ?? SPOTS_TOTAL;
export const plazas = { total: SPOTS_TOTAL, left: SPOTS_LEFT } as const;

/** Ahorro real frente a la tarifa plana estándar. */
const ahorroMes = precios.flat - Number(founding.price.replace(/\D/g, ""));
export const ahorro = {
  mes: ahorroMes,
  anio: ahorroMes * 12,
} as const;

export const socioFundador = {
  hero: {
    kicker: `Solo ${plazas.total} plazas · Vilanova i la Geltrú`,
    title: "Sé socio fundador de NEXUS",
    titleAccent: "y no vuelvas a pagar precio de lista",
    subtitle: `Las ${plazas.total} primeras personas que entren en la escuela se llevan todas las disciplinas de su nivel por ${founding.price}/mes — y esa cuota se queda contigo mientras sigas de alta.`,
    cta: `Quiero una de las ${plazas.total} plazas`,
    ctaNote: "Sin permanencia. Respondemos el mismo día.",
  },

  /** Bloque "qué es esto" — la promesa en una frase, antes de los detalles. */
  promesa: {
    title: "Qué es exactamente la plaza fundadora",
    body: `NEXUS abre ahora. Los primeros ${plazas.total} alumnos son los que hacen que una escuela exista: llenan la sala, traen a sus amigos y crean el ambiente que después atrae a todos los demás. Por eso no queremos que paguéis lo mismo que quien llegue en marzo.`,
    body2: `La plaza fundadora es tarifa plana —todos los estilos a los que puedas acceder según tu nivel— por ${founding.price} al mes en vez de ${precios.flat} €. Y no es un descuento de tres meses: mientras no te des de baja, esa cuota es la tuya.`,
  },

  /** Comparativa honesta fundador vs alta normal. */
  comparativa: {
    title: "Fundador vs. alta normal",
    filas: [
      {
        concepto: "Cuota mensual",
        fundador: `${founding.price}/mes`,
        estandar: `${precios.flat} €/mes`,
      },
      {
        concepto: "Estilos incluidos",
        fundador: "Todos los de tu nivel",
        estandar: "Todos los de tu nivel",
      },
      {
        concepto: "Subidas de precio",
        fundador: "Nunca, mientras sigas de alta",
        estandar: "Las que marque la tarifa vigente",
      },
      {
        concepto: "Reserva en eventos y masterclasses",
        fundador: "Preferente",
        estandar: "Por orden de llegada",
      },
      {
        concepto: "Disponibilidad",
        fundador: `${plazas.total} plazas`,
        estandar: "Abierta todo el año",
      },
    ],
  },

  /** Beneficios ampliados (la landing vende; la home solo resume). */
  beneficios: {
    title: `Lo que se llevan los ${plazas.total} primeros`,
    items: [
      {
        n: "01",
        title: "Todas las disciplinas de tu nivel",
        text: "Salsa cubana, bachata, reggaetón, reparto, lady style, heels y sexy style. No eliges una: puedes venir a todas las clases abiertas a tu nivel, de lunes a viernes.",
        accent: "text-neon",
      },
      {
        n: "02",
        title: "Cuota bloqueada, no descuento temporal",
        text: "La promoción no caduca a los tres meses. Mientras la suscripción siga activa, sigues pagando lo mismo aunque la tarifa general suba.",
        accent: "text-neon-mint",
      },
      {
        n: "03",
        title: `${ahorro.anio} € menos al año`,
        text: `Frente a la tarifa plana estándar de ${precios.flat} €/mes, la plaza fundadora son ${ahorro.mes} € menos cada mes: ${ahorro.anio} € al año que se quedan en tu bolsillo, cada año.`,
        accent: "text-neon-lime",
      },
      {
        n: "04",
        title: "Prioridad en eventos y masterclasses",
        text: "Cuando montamos fiesta social, workshop o masterclass con profesor invitado, los fundadores reservan antes que nadie. Las salas se llenan; tú entras.",
        accent: "text-neon",
      },
      {
        n: "05",
        title: "Grupos pequeños desde el principio",
        text: "Entrar ahora es entrar cuando los grupos aún no están llenos: más espacio, más correcciones del profe y más tiempo de pista para ti.",
        accent: "text-neon-mint",
      },
      {
        n: "06",
        title: "Voz en cómo crece la escuela",
        text: "Horarios, estilos nuevos, tipo de eventos: a los fundadores se os pregunta primero. Construimos NEXUS con la gente que estuvo desde el día uno.",
        accent: "text-neon-lime",
      },
    ],
  },

  /** Cualificación: para quién sí y para quién no. Filtra y a la vez convence. */
  paraQuien: {
    title: "¿Es para ti?",
    si: {
      title: "Sí, si…",
      items: [
        "Nunca has bailado y te da vergüenza empezar: hay grupos desde cero absoluto (Salsa 0, Bachata 0).",
        "Ya bailas y quieres dejar de pagar clase suelta cada vez que te apetece probar otro estilo.",
        "Vienes solo o sola y buscas gente: aquí se viene sin pareja y se cambia de pareja en clase.",
        "Quieres reservarte dos horas a la semana para ti y que te dejen de dar igual los propósitos de enero.",
      ],
    },
    no: {
      title: "No, si…",
      items: [
        "Buscas una clase suelta puntual: para eso están los estilos sueltos desde 35 €/mes o los intensivos.",
        "No puedes venir de forma regular entre semana de 18:30 a 21:30.",
        "Quieres clases particulares uno a uno: eso es otra fórmula, escríbenos y lo hablamos.",
      ],
    },
  },

  /** Cómo funciona: elimina fricción antes del formulario. */
  pasos: {
    title: "Cómo se coge la plaza",
    items: [
      {
        n: "1",
        title: "Rellenas el formulario",
        text: "Dos minutos: tus datos y las clases a las que quieres venir.",
      },
      {
        n: "2",
        title: "Te escribimos por WhatsApp",
        text: "Confirmamos que queda plaza, resolvemos dudas y ubicamos tu nivel. Sin compromiso.",
      },
      {
        n: "3",
        title: "Vienes a tu primera clase",
        text: "Ropa cómoda y ganas. La cuota fundadora queda fijada a tu nombre desde el alta.",
      },
    ],
  },

  faqs: [
    {
      q: `¿Qué pasa cuando se agoten las ${plazas.total} plazas?`,
      a: `La tarifa fundadora desaparece y el alta pasa a la tarifa vigente: ${precios.base} €/mes por un estilo, +${precios.estiloExtra} €/mes por cada estilo extra, o ${precios.flat} €/mes de tarifa plana. Quien ya sea fundador mantiene sus ${founding.price}.`,
    },
    {
      q: "¿Hay permanencia?",
      a: "No. Puedes darte de baja cuando quieras, sin penalización. Lo único es que la tarifa fundadora va ligada a que la suscripción no se interrumpa: si te das de baja y vuelves más adelante, entras con la tarifa vigente en ese momento.",
    },
    {
      q: "¿De verdad puedo ir a todas las clases?",
      a: "A todas las que correspondan a tu nivel. Si estás en Salsa 0 no tiene sentido meterte en Cía Salsa, pero sí puedes combinar, por ejemplo, Salsa 0, Bachata 0, Reggaetón y Heels en la misma semana con la misma cuota.",
    },
    {
      q: "Nunca he bailado. ¿Voy a hacer el ridículo?",
      a: "Los grupos 0 son literalmente para gente que no ha bailado nunca. Se empieza por el paso básico y por cómo escuchar la música. La mitad de la clase está igual que tú y a nadie le importa equivocarse.",
    },
    {
      q: "¿Necesito pareja?",
      a: "No. En clase se rota de pareja, así que se viene solo o acompañado indistintamente. Es, de hecho, la forma más rápida de conocer a todo el grupo.",
    },
    {
      q: "¿Puedo cambiar de estilo a mitad de temporada?",
      a: "Sí. Con la plaza fundadora no estás atado a un estilo concreto: si te engancha la bachata más que la salsa, te pasas y ya está. Solo avísanos para que el profe te espere.",
    },
    {
      q: "¿Cómo se paga?",
      a: "Cuota mensual. Te explicamos la forma de pago por WhatsApp cuando confirmemos tu plaza — sin matrículas ocultas ni cuota de inscripción.",
    },
  ],

  /** Bloque final de conversión. */
  form: {
    kicker: `Quedan ${plazas.left} de ${plazas.total} plazas`,
    title: "Reserva tu plaza fundadora",
    subtitle:
      "Déjanos tus datos y marca las clases a las que quieres venir. Te escribimos por WhatsApp el mismo día para confirmar tu plaza y ubicarte en el grupo de tu nivel.",
    submitLabel: "Quiero mi plaza fundadora",
    interesesLabel: "¿A qué clases quieres venir?",
    interesesHelp:
      "Marca todas las que quieras — con la plaza fundadora entran todas las de tu nivel. Los números son el nivel: 0 = desde cero, 1 = iniciación, 2 = intermedio. ¿No lo tienes claro? Marca «Aún no sé mi nivel».",
    fallback: "¿Prefieres preguntar antes de dejar tus datos?",
  },
} as const;

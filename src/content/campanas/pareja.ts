import type { CampanaDolorContent } from "./types";

/**
 * ICP 3 — La pareja (hacer algo juntos).
 * Fuente: analisis-icp-pain-points.md § ICP 3. Ángulo estacional (bodas, verano).
 */
export const pareja: Record<string, CampanaDolorContent> = {
  "rutina": {
    icp: "pareja",
    dolor: "rutina",
    headline: "Otra cena, otra serie... otra vez no.",
    subhead:
      "Un plan semanal que es solo vuestro: os movéis, aprendéis algo nuevo juntos y salís de la rutina sin depender de nadie más.",
    ctaHero: "Queremos probar juntos",
    mensajeWhatsapp:
      "¡Hola! Buscamos un plan nuevo en pareja, algo que no sea cena y sofá, ¿nos contáis cómo son las clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Vuestros planes de pareja se han reducido a cenar fuera o poner una serie.",
        solucion: "Tenéis una cita semanal distinta: os movéis, os reís y salís con algo nuevo que contar.",
      },
      {
        dolor: "La relación funciona en piloto automático, sin nada nuevo que compartir.",
        solucion: "Aprender juntos algo desde cero os da un reto y un rato de la semana que es solo vuestro.",
      },
      {
        dolor: "Cuesta encontrar un plan que no sea otra vez lo mismo de siempre.",
        solucion: "Bailar cambia cada semana —pasos, música, avances— aunque la pareja sea siempre la misma.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si acabamos discutiendo en vez de disfrutando?\"",
      respuesta:
        "Es de lo más normal las primeras clases; en la mayoría de parejas acaba siendo la parte que más se disfruta.",
    },
    pruebaSocial: "Muchas parejas llegan buscando exactamente esto: un plan fijo que sea solo suyo.",
    faqExtra: [
      {
        q: "¿Hace falta experiencia previa bailando en pareja?",
        a: "No, la mayoría de parejas empieza sin haber bailado nunca juntas.",
      },
    ],
    cierreEmocional: "Dentro de un año seréis la pareja que baila o la que sigue en el sofá. Se decide con un mensaje.",
    metaTitle: "Un plan de pareja distinto a cenar y serie",
    metaDescription: "Cambiad la rutina de pareja por un plan semanal juntos: bailar. Clase de prueba en Vilanova i la Geltrú.",
  },

  "boda": {
    icp: "pareja",
    dolor: "boda",
    headline: "Os casáis. Que el primer baile esté a la altura.",
    subhead:
      "Desde cero absoluto y a vuestro ritmo: llegáis al gran día sabiendo qué hacer cuando empiece a sonar vuestra canción.",
    ctaHero: "Queremos aprender para la boda",
    mensajeWhatsapp: "¡Hola! Nos casamos y queremos aprender a bailar para la boda 💃",
    dolorSolucion: [
      {
        dolor: "Queréis un primer baile que no sea balancearse en el sitio sin saber qué hacer.",
        // TODO: confirmar con Pol si se ofrece coreografía personalizada para bodas (no prometerlo hasta entonces).
        solucion: "Aprendéis una base sencilla y resultona con la que moveros con seguridad delante de todos.",
      },
      {
        dolor: "No tenéis ni idea de por dónde empezar a prepararlo.",
        solucion: "Empezáis desde cero, con guía clara y margen para practicar antes de la fecha.",
      },
      {
        dolor: "Os da corte bailar delante de los invitados sin haberlo trabajado antes.",
        solucion: "Lo repetís en clase las veces que haga falta, hasta que salga con naturalidad.",
      },
    ],
    objecion: {
      pregunta: "\"No sabemos ni los pasos más básicos, ¿no es tarde para empezar?\"",
      respuesta:
        "Cuanto antes empecéis, con más margen llegáis; muchas parejas arrancan exactamente así, de cero.",
    },
    pruebaSocial: "Preparar el baile de la boda es uno de los motivos por los que más parejas nos escriben.",
    faqExtra: [
      {
        q: "¿Cuánto tiempo hace falta para preparar el baile de la boda?",
        a: "Depende de vuestra fecha y de vuestro nivel de partida; cuanto antes empecéis, con más calma lo preparáis.",
      },
      {
        q: "¿Necesitamos experiencia previa para apuntarnos?",
        a: "No. Empezamos desde cero y adaptamos los pasos a vuestro nivel real.",
      },
    ],
    cierreEmocional: "Vuestro baile de boda empieza a prepararse hoy. El primer paso es un mensaje.",
    metaTitle: "Baile para bodas en pareja — Clases en Vilanova",
    metaDescription: "Aprended a bailar para vuestra boda desde cero, a vuestro ritmo. Clase de prueba en Vilanova i la Geltrú.",
  },

  "uno-no-sirve": {
    icp: "pareja",
    dolor: "uno-no-sirve",
    headline: "\"No sirvo para bailar\". Os llevamos a la vez.",
    subhead: "No hace falta que los dos partáis del mismo nivel: os guiamos juntos, sin que nadie se quede atrás.",
    ctaHero: "Queremos probar los dos",
    mensajeWhatsapp:
      "¡Hola! Uno/a de los dos cree que no sirve para bailar, ¿podemos probar una clase igualmente? 🙂",
    dolorSolucion: [
      {
        dolor: "Uno de los dos está convencido de que \"no sirve para bailar\" y eso frena al otro.",
        solucion: "En clase se trabaja por nivel real: no hace falta que los dos empecéis igual de sueltos.",
      },
      {
        dolor: "Os preocupa que la diferencia de nivel acabe generando tensión entre vosotros.",
        solucion: "El profe reparte la atención entre los dos; no depende de que uno \"tire\" del otro.",
      },
      {
        dolor: "Miedo a que las clases se conviertan en motivo de frustración en pareja.",
        solucion: "Se avanza paso a paso y a la vez: lo normal es que los dos mejoréis juntos, no que uno se quede atrás.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si mi pareja se frustra y lo deja a la primera clase?\"",
      respuesta:
        "Es una de las dudas más habituales; en la práctica, ver que se avanza juntos suele ser lo que engancha, no lo que frustra.",
    },
    pruebaSocial: "Es muy habitual empezar con niveles distintos dentro de la misma pareja.",
    faqExtra: [
      {
        q: "¿Y si uno de los dos tiene mucho peor ritmo que el otro?",
        a: "No pasa nada: se trabaja a nivel de pareja, sin comparar a uno con el otro.",
      },
    ],
    cierreEmocional: "Nadie \"no sirve\" para esto. Escribid y lo comprobáis juntos.",
    metaTitle: "\"No sirvo para bailar\" — Aprended juntos en Vilanova",
    metaDescription: "Aunque uno de los dos crea que no tiene ritmo, avanzáis juntos a la vez. Clase de prueba en pareja en Vilanova.",
  },

  "verguenza-fiestas": {
    icp: "pareja",
    dolor: "verguenza-fiestas",
    headline: "Dejad de quedaros sentados en bodas y fiestas.",
    subhead: "Cuando empiece la música, esta vez no miraréis desde la mesa.",
    ctaHero: "Queremos salir a la pista",
    mensajeWhatsapp:
      "¡Hola! Nos da vergüenza bailar en bodas y fiestas y siempre nos quedamos sentados, ¿nos ayudáis a cambiarlo? 🙂",
    dolorSolucion: [
      {
        dolor: "En cada boda o fiesta os quedáis sentados mientras el resto sale a la pista.",
        solucion: "Con unas bases claras, salir a bailar deja de ser un mal trago y pasa a ser parte del plan.",
      },
      {
        dolor: "Os da vergüenza moveros juntos delante de la familia o los amigos.",
        solucion: "Practicáis antes, en un grupo donde todo el mundo está en lo mismo, y llegáis con soltura al evento.",
      },
      {
        dolor: "En los viajes veis a otras parejas bailar y vosotros os quedáis mirando.",
        solucion: "Con la base aprendida, os animáis a salir en vez de observar desde la mesa.",
      },
    ],
    objecion: {
      pregunta: "\"Solo queremos lo básico para no hacer el ridículo, no ser expertos\"",
      respuesta:
        "Perfecto, es justo lo que se trabaja en los primeros niveles: lo suficiente para salir con soltura, sin necesidad de más.",
    },
    pruebaSocial: "Muchas parejas llegan justo antes de una boda o un viaje, buscando soltarse a tiempo.",
    faqExtra: [
      {
        q: "¿Cuánto se tarda en \"defenderse\" en una fiesta?",
        a: "Con constancia, en pocas semanas ya tenéis base suficiente para salir a la pista con soltura.",
      },
    ],
    cierreEmocional: "En la próxima boda, cuando suene la primera canción, ya sabréis qué hacer. Empezad hoy.",
    metaTitle: "Dejad de quedaros sentados en bodas y fiestas",
    metaDescription: "Aprended lo básico en pareja para soltaros en bodas, fiestas y vacaciones. Clase de prueba en Vilanova i la Geltrú.",
  },

  "es-para-nosotros": {
    icp: "pareja",
    dolor: "es-para-nosotros",
    headline: "¿Es esto para nosotros? Sí, y nada técnico.",
    subhead: "No hace falta ser una pareja \"de baile\" ni tomároslo en serio: es un rato juntos, con nivel para empezar de cero.",
    ctaHero: "Queremos ver si es lo nuestro",
    mensajeWhatsapp: "¡Hola! No sabemos si esto es para nosotros, ¿nos contáis cómo son las clases en pareja? 🙂",
    dolorSolucion: [
      {
        dolor: "No sabéis si esto es \"para vosotros\" o es cosa de parejas que ya bailan.",
        solucion: "La mayoría de parejas que se apuntan empiezan igual: sin haber bailado nunca juntas.",
      },
      {
        dolor: "Os suena a algo técnico, serio o exigente, y solo buscáis pasarlo bien.",
        solucion: "En los grupos de nivel inicial el objetivo es disfrutar y soltarse, no la perfección técnica.",
      },
      {
        dolor: "Os da miedo apuntaros y que se convierta en \"una obligación\" más.",
        solucion: "Tenéis una clase de prueba, sin compromiso: la probáis y decidís después si os encaja.",
      },
    ],
    objecion: {
      pregunta: "\"No somos una pareja muy de bailar, ¿encajamos igual?\"",
      respuesta: "Sí: la mayoría de parejas que vienen no han bailado nunca juntas antes, es el perfil más común.",
    },
    faqExtra: [
      {
        q: "¿Hace falta tomárselo en serio o es solo para pasarlo bien?",
        a: "Cada pareja lo vive a su manera: hay quien busca soltarse sin más y quien quiere seguir subiendo de nivel.",
      },
    ],
    cierreEmocional: "Si dudáis si es para vosotros, la forma de saberlo es probar. Escribidnos.",
    metaTitle: "¿Bailar en pareja es para nosotros?",
    metaDescription: "Nada técnico ni intimidante: empezad juntos desde cero. Clase de prueba en pareja en Vilanova i la Geltrú.",
  },

  "dos-agendas": {
    icp: "pareja",
    dolor: "dos-agendas",
    headline: "Dos agendas distintas, un plan que sí encaja.",
    subhead: "Una cita semanal fija que solo tenéis que cuadrar una vez: el resto lo organizamos nosotros.",
    ctaHero: "Queremos encontrar el hueco",
    mensajeWhatsapp: "¡Hola! Nos cuesta encajar planes por las agendas, ¿nos contáis qué horarios tenéis disponibles? 🙂",
    dolorSolucion: [
      {
        dolor: "Vuestras agendas casi nunca coinciden y un plan fijo parece imposible.",
        solucion: "Nos contáis vuestra disponibilidad y os proponemos el grupo y horario que mejor encaja con los dos.",
      },
      {
        dolor: "Cuadrar una actividad semanal se convierte en otro problema logístico más.",
        solucion: "Es una única cita fija en el calendario: no hay que reorganizarla cada semana.",
      },
      {
        dolor: "Teméis apuntaros y que al final uno de los dos falle por trabajo o imprevistos.",
        solucion: "Escribidnos con vuestra disponibilidad real; buscamos el horario que mejor se sostiene para los dos.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si al final no coincide con el horario de ninguno de los dos?\"",
      respuesta: "Contadnos vuestra disponibilidad antes de apuntaros y os decimos qué grupos encajan de verdad.",
    },
    faqExtra: [
      {
        q: "¿Qué pasa si uno de los dos no puede venir algún día?",
        a: "No pasa nada: la clase sigue para el otro, y hablamos con vosotros para ver cómo encajarlo esa semana.",
      },
    ],
    cierreEmocional: "Encontrar el hueco es más fácil de lo que parece. Contadnos vuestras agendas y lo cuadramos.",
    metaTitle: "Un plan de pareja que encaja en dos agendas",
    metaDescription: "Cuadramos horario y nivel a vuestra disponibilidad real. Clase de prueba en pareja en Vilanova i la Geltrú.",
  },
};

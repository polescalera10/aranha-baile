import type { CampanaDolorContent } from "./types";

/**
 * ICP 1 — El Social (conocer gente y llenar el finde).
 * Fuente: analisis-icp-pain-points.md § ICP 1. Motor de conversión nº1 junto a "empezar".
 */
export const social: Record<string, CampanaDolorContent> = {
  "circulo-encogido": {
    icp: "social",
    dolor: "circulo-encogido",
    headline: "Tus amigos ya no salen. Nosotros sí.",
    subhead:
      "Cuando el grupo se llena de parejas e hijos, el plan desaparece. Aquí lo recuperas: gente con ganas de quedar cada semana, sin depender de nadie más.",
    ctaHero: "Quiero recuperar mi plan",
    mensajeWhatsapp:
      "¡Hola! Mi grupo de amigos ya casi no sale y busco un plan nuevo, ¿me contáis cómo son las clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Tus amigos de siempre tienen pareja, hijos o simplemente ya no salen.",
        solucion:
          "En clase te unes a un grupo que sí queda cada semana, sin depender de la agenda de nadie más.",
      },
      {
        dolor: "El plan de los findes se ha ido reduciendo a cero.",
        solucion: "Tienes una cita fija en tu semana, con gente que también la está buscando.",
      },
      {
        dolor: "Sientes que tienes que reconstruir tu vida social casi de cero.",
        solucion:
          "No hace falta reconstruirla solo/a: entras a un grupo ya formado que te acoge desde la primera clase.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si no encajo con el grupo?\"",
      respuesta: "La mayoría de gente llega igual que tú: sin conocer a nadie. En dos clases ya tienes con quién hablar.",
    },
    pruebaSocial: "La mayoría de quienes se apuntan llegan sin conocer a nadie del grupo.",
    faqExtra: [
      {
        q: "¿Hay ambiente de verdad o es solo la clase?",
        a: "Se queda gente charlando al acabar y hay salidas informales fuera de horario — no es solo entrar, bailar y salir.",
      },
    ],
    cierreEmocional: "Tu próximo plan de los jueves puede empezar aquí. El primer paso es solo escribir.",
    metaTitle: "Recupera tu plan social — Clases de baile en Vilanova",
    metaDescription:
      "¿Tu grupo de amigos ya no sale? Únete a una comunidad que sí queda cada semana. Clase de prueba en Vilanova i la Geltrú.",
  },

  "sin-apps": {
    icp: "social",
    dolor: "sin-apps",
    headline: "Conocer gente sin apps ni ruido de bar.",
    subhead:
      "Aquí no hay swipes ni gritar por encima de la música. Hay una actividad en común, conversación real y gente que vuelve semana tras semana.",
    ctaHero: "Quiero conocer gente de verdad",
    mensajeWhatsapp: "¡Hola! Estoy cansado/a de apps y bares para conocer gente, ¿cómo funcionan vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Las apps de citas se han quedado en conversaciones que no llevan a ningún sitio.",
        solucion: "En clase conoces gente haciendo algo real juntos, no hablando a través de una pantalla.",
      },
      {
        dolor: "Las quedadas de bar acaban siendo siempre la misma superficialidad.",
        solucion: "Bailar te obliga a interactuar de verdad: te ríes, fallas y aprendes con la misma gente cada semana.",
      },
      {
        dolor: "Cuesta encontrar sitios para socializar que no giren en torno a beber.",
        solucion: "El plan aquí es moverse, no beber. La conexión sale sola.",
      },
    ],
    objecion: {
      pregunta: "\"Yo no vengo a ligar, solo quiero gente nueva\"",
      respuesta: "Perfecto, la mayoría viene por eso: hacer amigos y tener plan, no otra cosa.",
    },
    faqExtra: [
      {
        q: "¿Es un ambiente ligón o es normal?",
        a: "Es un grupo normal centrado en bailar y pasarlo bien; nadie te va a incomodar.",
      },
    ],
    cierreEmocional: "Gente real, plan real, cada semana. Solo tienes que escribir.",
    metaTitle: "Conoce gente sin apps — Clases de baile en Vilanova",
    metaDescription:
      "Cambia las apps y los bares por un plan semanal donde conocer gente de verdad. Clase de prueba en Vilanova i la Geltrú.",
  },

  "vengo-solo": {
    icp: "social",
    dolor: "vengo-solo",
    headline: "Apúntate solo/a. Aquí es lo normal.",
    subhead:
      "No hace falta traer pareja ni cuadrilla. Rotas por el grupo desde el primer día y sales conociendo a todo el mundo.",
    ctaHero: "Quiero venir aunque sea solo/a",
    mensajeWhatsapp: "¡Hola! Quiero apuntarme pero voy solo/a, ¿es raro o es lo normal en vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Te da corte apuntarte solo/a a algo nuevo.",
        solucion: "La mayoría de la gente llega igual: sin pareja de baile ni conocidos en el grupo.",
      },
      {
        dolor: "Piensas que vas a ser la única persona que no conoce a nadie.",
        solucion: "En clase se rota constantemente, así que en la primera hora ya has bailado con medio grupo.",
      },
      {
        dolor: "Te preocupa quedarte sin pareja de baile toda la clase.",
        solucion: "No necesitas traer una: los ejercicios están pensados para que nadie se quede parado.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si todos van en pareja menos yo?\"",
      respuesta: "No es así: la mayoría llega sola y se rota todo el rato, nadie se queda fijo con nadie.",
    },
    pruebaSocial: "La mayoría de las personas que se apuntan llegan sin conocer a nadie del grupo.",
    faqExtra: [
      {
        q: "¿Necesito venir acompañado/a?",
        a: "No. Es de las dudas más comunes y la respuesta es siempre la misma: no hace falta, la mayoría viene sola.",
      },
    ],
    cierreEmocional: "Venir solo/a no es un problema aquí, es lo habitual. Escríbenos y pruébalo.",
    metaTitle: "Apúntate solo/a a bailar — Clases en Vilanova",
    metaDescription:
      "No necesitas pareja ni conocidos: la mayoría viene sola y rota en clase. Prueba una clase en Vilanova i la Geltrú.",
  },

  "nuevo-en-vilanova": {
    icp: "social",
    dolor: "nuevo-en-vilanova",
    headline: "¿Nuevo/a en Vilanova? Empieza por aquí.",
    subhead:
      "Hacer vida local cuando acabas de llegar es lento. Una clase semanal te da calendario, cara conocida y un sitio al que volver.",
    ctaHero: "Quiero hacer vida aquí",
    mensajeWhatsapp: "¡Hola! Acabo de llegar a Vilanova y busco cómo conocer gente y hacer vida local, ¿me contáis? 🙂",
    dolorSolucion: [
      {
        dolor: "Llevas poco en Vilanova y no sabes por dónde empezar a hacer vida local.",
        solucion: "Una clase fija a la semana te da un punto de referencia y caras conocidas desde el primer mes.",
      },
      {
        dolor: "Todo tu círculo sigue estando en otra ciudad.",
        solucion: "Aquí empiezas a construir uno nuevo, con gente del pueblo y de alrededor.",
      },
      {
        dolor: "No conoces sitios ni planes más allá de trabajo y casa.",
        solucion: "Tienes un plan fijo semanal, sin tener que organizarlo tú ni depender de nadie.",
      },
    ],
    objecion: {
      pregunta: "\"No conozco a nadie aquí, ¿no será raro llegar solo/a?\"",
      respuesta: "Es de lo más habitual: mucha gente que se apunta acaba de llegar al pueblo.",
    },
    faqExtra: [
      {
        q: "¿Hay gente que también sea nueva en Vilanova?",
        a: "Sí, es un perfil muy habitual en el grupo — no serás la única persona nueva.",
      },
    ],
    cierreEmocional: "Hacer vida en un sitio nuevo empieza por un primer plan. Que sea este.",
    metaTitle: "Nuevo en Vilanova — Haz vida local bailando",
    metaDescription: "¿Acabas de llegar a Vilanova i la Geltrú? Empieza a hacer vida local con una clase de prueba de baile.",
  },

  "otro-finde-perdido": {
    icp: "social",
    dolor: "otro-finde-perdido",
    headline: "Que el finde no sea otro trabajo–casa–móvil.",
    subhead: "El plan empieza en la pista, no en el sofá. Una cita semanal que te saca de casa y te devuelve el finde.",
    ctaHero: "Quiero recuperar el finde",
    mensajeWhatsapp: "¡Hola! Vi lo del finde y quiero venir a probar una clase 🙂",
    dolorSolucion: [
      {
        dolor: "Llega el viernes y no tienes plan más allá del sofá y el móvil.",
        solucion: "Tienes una cita fija cada semana que ya está en el calendario, sin tener que organizar nada.",
      },
      {
        dolor: "Sientes que los findes se repiten siempre igual.",
        solucion: "Una clase rompe la rutina y encima te deja con energía, no reventado/a.",
      },
      {
        dolor: "Acabas la semana sin ganas de organizar nada con nadie.",
        solucion: "Aquí no organizas tú: te presentas y el plan ya está montado.",
      },
    ],
    objecion: {
      pregunta: "\"Estoy reventado/a entre semana, no me quedan ganas\"",
      respuesta: "Una hora de baile activa más de lo que cansa; sales con más energía de la que entras.",
    },
    pruebaSocial: "La mayoría llega buscando justo esto: un plan fijo para dejar de perder el finde.",
    faqExtra: [
      {
        q: "¿Hay clases el finde o entre semana?",
        a: "Escríbenos con tu disponibilidad y te decimos qué grupos encajan mejor con tu semana.",
      },
    ],
    cierreEmocional: "Un finde distinto empieza con un mensaje. El resto lo ponemos nosotros.",
    metaTitle: "Recupera tu finde — Clases de baile en Vilanova",
    metaDescription: "Cambia trabajo–casa–móvil por un plan fijo semanal. Clase de prueba de baile en Vilanova i la Geltrú.",
  },

  "gym-solitario": {
    icp: "social",
    dolor: "gym-solitario",
    headline: "Del gimnasio en silencio a un grupo que te espera.",
    subhead: "Entrar, sudar y salir sin hablar con nadie tiene fecha de caducidad. Aquí el movimiento viene con gente.",
    ctaHero: "Quiero algo más que el gimnasio",
    mensajeWhatsapp: "¡Hola! Voy al gimnasio pero es muy solitario, ¿cómo es el ambiente en vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "En el gimnasio entrenas rodeado/a de gente pero solo/a.",
        solucion: "Aquí el movimiento se hace en grupo, con interacción real desde el primer ejercicio.",
      },
      {
        dolor: "Vas, sudas y te vas sin cruzar palabra con nadie.",
        solucion: "En clase se habla, se ríe y se aprende junto a las mismas caras cada semana.",
      },
      {
        dolor: "El gimnasio te mantiene en forma pero no te da comunidad.",
        solucion: "Aquí entrenas cuerpo y vida social a la vez, sin tener que elegir entre las dos cosas.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si no tengo condición física de gimnasio?\"",
      respuesta: "No hace falta: se entra por nivel y el cuerpo se pone a tono clase a clase, no al revés.",
    },
    faqExtra: [
      {
        q: "¿Esto sustituye al gimnasio o lo complementa?",
        a: "Lo que quieras: hay quien lo usa como cardio principal y quien lo combina con su rutina de siempre.",
      },
    ],
    cierreEmocional: "Cambia el silencio del gimnasio por un grupo que se alegra de verte. Empieza con un WhatsApp.",
    metaTitle: "Del gimnasio solitario a una comunidad — Baile en Vilanova",
    metaDescription: "Si el gimnasio se te queda vacío de gente, prueba una clase de baile en grupo en Vilanova i la Geltrú.",
  },
};

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
      "Parejas, hijos, sofá: el grupo de siempre se va apagando y nadie lo dice en voz alta. Aquí recuperas lo que echas de menos — gente con ganas de quedar cada semana.",
    ctaHero: "Quiero recuperar mi plan",
    mensajeWhatsapp:
      "¡Hola! Mi grupo de amigos ya casi no sale y busco un plan nuevo, ¿me contáis cómo son las clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Tus amigos de siempre tienen pareja, hijos o simplemente ya no salen.",
        solucion:
          "Aquí te espera un grupo que sí queda cada semana, sin depender de la agenda de nadie.",
      },
      {
        dolor: "De salir cada finde habéis pasado a veros un par de veces al año.",
        solucion: "Recuperas una cita fija en tu semana, con gente que la busca tanto como tú.",
      },
      {
        dolor: "Reconstruir la vida social de adulto parece una montaña.",
        solucion:
          "No la reconstruyes solo/a: entras en un grupo ya formado que te acoge desde la primera clase.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si no encajo con el grupo?\"",
      respuesta: "La mayoría llega igual que tú: sin conocer a nadie. En dos clases ya tienes con quién hablar.",
    },
    pruebaSocial: "La mayoría de quienes se apuntan llegan sin conocer a nadie del grupo.",
    faqExtra: [
      {
        q: "¿Hay ambiente de verdad o es solo la clase?",
        a: "Se queda gente charlando al acabar y hay salidas informales fuera de horario — no es solo entrar, bailar y salir.",
      },
    ],
    cierreEmocional: "El grupo de siempre no va a volver solo. El nuevo te está esperando en la pista.",
    metaTitle: "Recupera tu plan social — Clases de baile en Vilanova",
    metaDescription:
      "¿Tu grupo de amigos ya no sale? Únete a una comunidad que sí queda cada semana. Clase de prueba en Vilanova i la Geltrú.",
  },

  "sin-apps": {
    icp: "social",
    dolor: "sin-apps",
    headline: "Conocer gente de verdad. Sin apps, sin bar.",
    subhead:
      "Nada de swipes ni conversaciones que mueren en el móvil. Una actividad en común, risas de verdad y las mismas caras cada semana.",
    ctaHero: "Quiero conocer gente de verdad",
    mensajeWhatsapp: "¡Hola! Estoy cansado/a de apps y bares para conocer gente, ¿cómo funcionan vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Las apps se quedan en chats que nunca llegan a nada.",
        solucion: "Aquí conoces gente haciendo algo juntos, no hablando a través de una pantalla.",
      },
      {
        dolor: "Los planes de bar acaban siempre en la misma conversación superficial.",
        solucion: "Bailar rompe el hielo por ti: te ríes, fallas y aprendes con la misma gente cada semana.",
      },
      {
        dolor: "Cuesta encontrar planes para socializar que no giren en torno a beber.",
        solucion: "El plan aquí es moverse. La conexión sale sola.",
      },
    ],
    objecion: {
      pregunta: "\"Yo no vengo a ligar, solo quiero gente nueva\"",
      respuesta: "Perfecto, la mayoría viene a eso: hacer amigos y tener plan, no otra cosa.",
    },
    faqExtra: [
      {
        q: "¿Es un ambiente ligón o es normal?",
        a: "Es un grupo normal centrado en bailar y pasarlo bien; nadie te va a incomodar.",
      },
    ],
    cierreEmocional: "Deja el móvil. La gente de verdad está en la pista.",
    metaTitle: "Conoce gente sin apps — Clases de baile en Vilanova",
    metaDescription:
      "Cambia las apps y los bares por un plan semanal donde conocer gente de verdad. Clase de prueba en Vilanova i la Geltrú.",
  },

  "vengo-solo": {
    icp: "social",
    dolor: "vengo-solo",
    headline: "Apúntate solo/a. Aquí es lo normal.",
    subhead:
      "Sin pareja, sin cuadrilla, sin conocer a nadie. Rotas por el grupo desde el primer día y sales con nombres nuevos en el móvil.",
    ctaHero: "Quiero venir aunque sea solo/a",
    mensajeWhatsapp: "¡Hola! Quiero apuntarme pero voy solo/a, ¿es raro o es lo normal en vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "Te da corte apuntarte solo/a a algo nuevo.",
        solucion: "La mayoría llega exactamente igual: sin pareja de baile ni conocidos en el grupo.",
      },
      {
        dolor: "Piensas que serás la única persona que no conoce a nadie.",
        solucion: "En clase se rota constantemente: en la primera hora ya has bailado con medio grupo.",
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
    cierreEmocional: "Venir solo/a es como empieza casi todo el mundo aquí. Escríbenos y compruébalo.",
    metaTitle: "Apúntate solo/a a bailar — Clases en Vilanova",
    metaDescription:
      "No necesitas pareja ni conocidos: la mayoría viene sola y rota en clase. Prueba una clase en Vilanova i la Geltrú.",
  },

  "nuevo-en-vilanova": {
    icp: "social",
    dolor: "nuevo-en-vilanova",
    headline: "¿Nuevo/a en Vilanova? Empieza por aquí.",
    subhead: "Hacer amigos en una ciudad nueva puede llevar años. O una clase a la semana.",
    ctaHero: "Quiero hacer vida aquí",
    mensajeWhatsapp: "¡Hola! Acabo de llegar a Vilanova y busco cómo conocer gente y hacer vida local, ¿me contáis? 🙂",
    dolorSolucion: [
      {
        dolor: "Llevas poco en Vilanova y no sabes por dónde empezar a hacer vida local.",
        solucion: "Una clase fija a la semana te da un sitio al que volver y caras conocidas desde el primer mes.",
      },
      {
        dolor: "Tu gente sigue estando en otra ciudad.",
        solucion: "Aquí empiezas a construir tu círculo de aquí, con gente de Vilanova y de alrededor.",
      },
      {
        dolor: "Tu mapa de la ciudad se reduce a trabajo y casa.",
        solucion: "Tienes un plan fijo semanal sin tener que organizarlo tú ni depender de nadie.",
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
    cierreEmocional: "La vida en Vilanova empieza cuando tienes con quién vivirla. Empieza por aquí.",
    metaTitle: "Nuevo en Vilanova — Haz vida local bailando",
    metaDescription: "¿Acabas de llegar a Vilanova i la Geltrú? Empieza a hacer vida local con una clase de prueba de baile.",
  },

  "otro-finde-perdido": {
    icp: "social",
    dolor: "otro-finde-perdido",
    headline: "Viernes por la tarde. ¿Otra vez sofá y móvil?",
    subhead:
      "El plan no va a llamar a tu puerta. Pero puede estar ya en tu calendario: una cita semanal que te saca de casa y te devuelve el finde.",
    ctaHero: "Quiero recuperar el finde",
    mensajeWhatsapp: "¡Hola! Vi lo del finde y quiero venir a probar una clase 🙂",
    dolorSolucion: [
      {
        dolor: "Llega el viernes y el plan más emocionante es la cena y una serie.",
        solucion: "Tienes una cita fija que ya está en el calendario antes de que llegue la pereza.",
      },
      {
        dolor: "Los findes se repiten: mismos sitios, misma gente, mismo guion.",
        solucion: "Cada clase trae música nueva, pasos nuevos y gente nueva con quien bailarlos.",
      },
      {
        dolor: "Acabas la semana sin energía para organizar nada con nadie.",
        solucion: "Aquí no organizas nada: te presentas y el plan ya está montado.",
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
    subhead: "Entrar con los auriculares puestos, sudar y salir sin hablar con nadie. Esto es exactamente lo contrario.",
    ctaHero: "Quiero algo más que el gimnasio",
    mensajeWhatsapp: "¡Hola! Voy al gimnasio pero es muy solitario, ¿cómo es el ambiente en vuestras clases? 🙂",
    dolorSolucion: [
      {
        dolor: "En el gimnasio entrenas rodeado/a de gente, pero solo/a.",
        solucion: "Aquí el ejercicio es en grupo de verdad: hablas, te ríes y aprendes con las mismas caras cada semana.",
      },
      {
        dolor: "Vas, sudas y te vas sin cruzar palabra con nadie.",
        solucion: "En clase es imposible no cruzarla: los ejercicios te ponen delante de todo el grupo.",
      },
      {
        dolor: "El gimnasio pone el cuerpo a tono, pero deja la agenda social igual de vacía.",
        solucion: "Aquí entrenas cuerpo y vida social a la vez, sin tener que elegir.",
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
    cierreEmocional: "Cambia el silencio entre máquinas por un grupo que se alegra de verte llegar.",
    metaTitle: "Del gimnasio solitario a una comunidad — Baile en Vilanova",
    metaDescription: "Si el gimnasio se te queda vacío de gente, prueba una clase de baile en grupo en Vilanova i la Geltrú.",
  },
};

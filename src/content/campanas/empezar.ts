import type { CampanaDolorContent } from "./types";

/**
 * ICP 4 — El principiante bloqueado ("yo no sé bailar").
 * Fuente: analisis-icp-pain-points.md § ICP 4. Barrera de entrada nº1: motor de
 * conversión nº1 junto a "social".
 */
export const empezar: Record<string, CampanaDolorContent> = {
  "dos-pies-izquierdos": {
    icp: "empezar",
    dolor: "dos-pies-izquierdos",
    headline: "\"No tengo ritmo\". El ritmo se entrena.",
    subhead:
      "Nadie nace sabiendo llevar el compás. Se entrena con repetición y una buena guía, como cualquier otra habilidad.",
    ctaHero: "Quiero probarlo aunque no tenga ritmo",
    mensajeWhatsapp: "¡Hola! Creo que tengo dos pies izquierdos pero me gustaría probar una clase 🙂",
    dolorSolucion: [
      {
        dolor: "Crees que \"tienes dos pies izquierdos\" y que eso no se puede cambiar.",
        solucion: "El ritmo es una técnica, no un don: se entrena paso a paso como cualquier otra cosa.",
      },
      {
        dolor: "Te comparas con quien ya baila bien y das por hecho que tú no puedes.",
        solucion: "Esa persona también empezó sin saber. Los grupos están pensados para partir de cero real.",
      },
      {
        dolor: "Piensas que sin oído musical no hay nada que hacer.",
        solucion: "El oído se afina con la práctica: en pocas clases empiezas a sentir el compás sin pensarlo.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si de verdad no tengo ritmo, ni entrenándolo?\"",
      respuesta: "Nadie se queda sin aprender por eso: es cuestión de repetición, no de talento.",
    },
    pruebaSocial: "La inmensa mayoría de quienes empiezan aquí lo hacen sin haber bailado nunca.",
    faqExtra: [
      {
        q: "¿De verdad se puede aprender sin tener ritmo natural?",
        a: "Sí. El ritmo se trabaja con ejercicios concretos, igual que cualquier técnica; no es un rasgo con el que se nace o no.",
      },
    ],
    cierreEmocional: "El único ritmo que necesitas ahora mismo es el de escribirnos.",
    metaTitle: "\"No tengo ritmo\" — Empieza a bailar en Vilanova",
    metaDescription: "El ritmo se entrena, no es un don. Clase de prueba para empezar desde cero en Vilanova i la Geltrú.",
  },

  "miedo-al-ridiculo": {
    icp: "empezar",
    dolor: "miedo-al-ridiculo",
    headline: "Sin miedo al ridículo. Nadie te mira.",
    subhead: "Todo el grupo empezó exactamente donde estás tú ahora. Aquí se viene a aprender, no a juzgar.",
    ctaHero: "Quiero probar sin pasar vergüenza",
    mensajeWhatsapp: "¡Hola! Nunca he bailado y me da corte, pero me gustaría probar 🙂",
    dolorSolucion: [
      {
        dolor: "Te da pánico hacer el ridículo delante de gente que ya sabe bailar.",
        solucion: "En tu grupo de nivel nadie sabe más que tú: todos están aprendiendo lo mismo, a la vez.",
      },
      {
        dolor: "Imaginas que todas las miradas están puestas en ti.",
        solucion: "Cada persona está concentrada en sus propios pasos, no en los tuyos: es lo normal en cualquier clase que empieza.",
      },
      {
        dolor: "El miedo al ridículo te ha frenado de apuntarte antes.",
        solucion: "Ese miedo desaparece a los diez minutos de la primera clase, cuando ves que todo el mundo está igual.",
      },
    ],
    objecion: {
      pregunta: "\"Me da mucha vergüenza moverme delante de gente\"",
      respuesta: "Es la reacción más habitual en la primera clase, y en la mayoría se pasa en cuanto empieza la música.",
    },
    faqExtra: [
      {
        q: "¿Se ríe la gente si te equivocas?",
        a: "No. Equivocarse es parte de aprender y le pasa a todo el mundo, cada clase.",
      },
    ],
    cierreEmocional: "El corte se pasa en la primera clase. El mensaje es el paso más difícil, y ya casi lo has dado.",
    metaTitle: "Sin miedo al ridículo — Clases de baile para empezar",
    metaDescription: "Todo el grupo empezó donde estás tú. Pierde la vergüenza en tu primera clase de prueba en Vilanova.",
  },

  "ya-soy-mayor": {
    icp: "empezar",
    dolor: "ya-soy-mayor",
    headline: "Nunca es tarde para empezar.",
    subhead: "En los grupos hay gente de 18 a 60 y pico años dando sus primeros pasos. La edad no es el problema que crees.",
    ctaHero: "Quiero empezar aunque sea \"tarde\"",
    mensajeWhatsapp: "¡Hola! Creo que ya soy mayor para empezar a bailar, ¿es buena idea probar igualmente? 🙂",
    dolorSolucion: [
      {
        dolor: "Piensas que ya eres \"mayor\" para empezar algo nuevo como esto.",
        solucion: "Los grupos reúnen edades muy distintas; empezar de adulto/a es lo más habitual, no la excepción.",
      },
      {
        dolor: "Te da miedo que tu cuerpo ya no responda como antes.",
        solucion: "Los grupos de nivel inicial van al ritmo de quien empieza, no al de quien lleva años entrenando.",
      },
      {
        dolor: "Crees que has \"perdido el tren\" de aprender a bailar.",
        solucion: "No hay tren que perder: cada grupo nuevo que abre empieza otra vez desde cero.",
      },
    ],
    objecion: {
      pregunta: "\"¿No seré la persona más mayor de la clase?\"",
      respuesta: "El rango de edad real va de los 18 a los 60 y pico; siempre hay compañía en tu franja.",
    },
    faqExtra: [
      {
        q: "¿Hay edad mínima o máxima?",
        a: "Somos una escuela para adultos: hay gente de los 18 a los 60 y pico. El único requisito es tener ganas.",
      },
    ],
    cierreEmocional: "El único momento tarde para empezar es el que nunca llega. Empieza hoy.",
    metaTitle: "Nunca es tarde para bailar — Clases en Vilanova",
    metaDescription: "Empezar de adulto/a es lo más habitual del grupo, no la excepción. Prueba tu primera clase en Vilanova.",
  },

  "el-peor-de-la-clase": {
    icp: "empezar",
    dolor: "el-peor-de-la-clase",
    headline: "No vas a frenar a nadie.",
    subhead: "Empiezas con gente que está exactamente en tu mismo punto. Nadie espera que ya sepas.",
    ctaHero: "Quiero probar sin miedo a frenar al grupo",
    mensajeWhatsapp: "¡Hola! Me da miedo ser el/la que menos sabe y frenar a los demás, ¿cómo funcionan los grupos? 🙂",
    dolorSolucion: [
      {
        dolor: "Te preocupa ser el/la peor de la clase y ralentizar al resto.",
        solucion: "Los grupos se forman por nivel real: si empiezas de cero, todo tu grupo empieza de cero contigo.",
      },
      {
        dolor: "Sientes que vas a hacer esperar a los demás mientras entiendes el paso.",
        solucion: "El ritmo de la clase lo marca el grupo, no una sola persona; todos repiten los mismos pasos las veces que hace falta.",
      },
      {
        dolor: "Te da vergüenza preguntar de nuevo algo que \"todos ya saben\".",
        solucion: "En un grupo de nivel inicial, nadie sabe más: preguntar es lo normal, no la excepción.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si me cuesta más que a los demás?\"",
      respuesta: "Cada persona avanza a su ritmo dentro del grupo; nadie se queda atrás por tardar un poco más.",
    },
    pruebaSocial: "Cada grupo nuevo que abre está formado, en su mayoría, por gente que empieza de cero a la vez.",
    faqExtra: [
      {
        q: "¿Qué nivel necesito para empezar?",
        a: "El que tengas. Hay grupos desde cero absoluto hasta avanzado, y te ubicamos en el que mejor encaja contigo.",
      },
    ],
    cierreEmocional: "Nadie va a frenar a nadie: todo el grupo empieza igual. Escríbenos y lo compruebas tú mismo/a.",
    metaTitle: "No frenarás a nadie — Empieza a bailar en tu nivel",
    metaDescription: "Grupos por nivel real, desde cero absoluto. Nadie espera que ya sepas bailar. Clase de prueba en Vilanova.",
  },

  "que-disciplina": {
    icp: "empezar",
    dolor: "que-disciplina",
    headline: "¿Por dónde empiezo? Te lo decimos nosotros.",
    subhead: "No hace falta que sepas si quieres salsa, bachata o heels antes de escribir. Te ubicamos según lo que buscas.",
    ctaHero: "Quiero que me digáis por dónde empezar",
    mensajeWhatsapp: "¡Hola! No sé qué disciplina elegir para empezar, ¿me ayudáis a decidir? 🙂",
    dolorSolucion: [
      {
        dolor: "No sabes si te pega más la salsa, la bachata, el reggaeton o los heels.",
        solucion: "Nos cuentas qué buscas —ritmo, estilo, energía— y te proponemos por dónde empezar.",
      },
      {
        dolor: "La duda de \"qué elegir\" te está frenando de apuntarte a nada.",
        solucion:
          "No necesitas decidirlo solo/a: la tarifa fundadora da acceso a todas las disciplinas de tu nivel, así que puedes probar más de una.",
      },
      {
        dolor: "Te preocupa elegir mal y arrepentirte después.",
        solucion: "Nada es definitivo: puedes cambiar de disciplina dentro de tu nivel cuando quieras.",
      },
    ],
    objecion: {
      pregunta: "\"No tengo ni idea de estilos de baile\"",
      respuesta: "No hace falta saberlo: cuéntanos qué te llama la atención y te orientamos nosotros.",
    },
    faqExtra: [
      {
        q: "¿Puedo probar varias disciplinas antes de decidirme?",
        a: "Sí: la tarifa fundadora incluye acceso a todas las disciplinas de tu nivel, así que puedes ir probando.",
      },
    ],
    cierreEmocional: "No necesitas tener claro el estilo. Solo necesitas escribirnos y contarnos qué buscas.",
    metaTitle: "¿Qué disciplina elijo? Te ubicamos nosotros",
    metaDescription: "¿No sabes por dónde empezar a bailar? Cuéntanos qué buscas y te orientamos. Clase de prueba en Vilanova.",
  },

  "probar-sin-compromiso": {
    icp: "empezar",
    dolor: "probar-sin-compromiso",
    headline: "Prueba antes de decidir. Sin letra pequeña.",
    subhead: "Una clase de prueba para conocer el ambiente antes de comprometerte a nada. Sin presión y sin sorpresas.",
    ctaHero: "Quiero mi clase de prueba",
    mensajeWhatsapp: "¡Hola! Me gustaría probar una clase antes de decidirme, ¿cómo funciona? 🙂",
    dolorSolucion: [
      {
        dolor: "Quieres probar antes de comprometerte a una cuota mensual.",
        solucion: "Tienes una clase de prueba pensada exactamente para eso: conocer el ambiente antes de decidir.",
      },
      {
        dolor: "Te da corte incluso preguntar el precio o escribir por primera vez.",
        solucion: "Un WhatsApp basta. Sin formularios eternos ni compromiso por preguntar.",
      },
      {
        dolor: "Temes que \"probar\" en realidad implique letra pequeña o permanencia.",
        solucion: "No hay permanencia: decides después de probar, sin condiciones ocultas.",
      },
    ],
    objecion: {
      pregunta: "\"¿Probar significa que ya estoy apuntado/a?\"",
      respuesta: "No. Pruebas, ves si te encaja, y decides después. Sin compromiso ninguno.",
    },
    faqExtra: [
      {
        q: "¿Qué llevo a la clase de prueba?",
        a: "Ropa cómoda y unas zapatillas limpias. El resto —música, grupo y buen rollo— lo ponemos nosotros.",
      },
    ],
    cierreEmocional: "Todo empieza por probar. Decide después, con calma.",
    metaTitle: "Clase de prueba sin compromiso — Baile en Vilanova",
    metaDescription: "Prueba una clase de baile antes de decidir, sin permanencia ni letra pequeña. Vilanova i la Geltrú.",
  },
};

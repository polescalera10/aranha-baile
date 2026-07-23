import type { CampanaDolorContent } from "./types";

/**
 * ICP 5 — El bailarín con recorrido (subir de nivel). Secundario.
 * Fuente: analisis-icp-pain-points.md § ICP 5. Se trabaja más por comunidad/socials que por landing.
 */
export const nivel: Record<string, CampanaDolorContent> = {
  "clases-mezcladas": {
    icp: "nivel",
    dolor: "clases-mezcladas",
    headline: "Se acabaron las clases donde el ritmo lo marca el principiante.",
    subhead:
      "Grupos organizados por nivel real, para que avances al ritmo que te corresponde y no al de quien acaba de empezar.",
    ctaHero: "Quiero mi nivel real",
    mensajeWhatsapp:
      "¡Hola! Ya tengo bastante recorrido bailando y busco un grupo de nivel intermedio-avanzado, ¿tenéis algo así? 💃",
    dolorSolucion: [
      {
        dolor: "Te apuntas a una clase y el ritmo lo acaba marcando quien va más flojo.",
        solucion: "Los grupos están organizados por nivel real, no por franja horaria, así avanzas al ritmo que te toca.",
      },
      {
        dolor: "Repites las mismas bases básicas clase tras clase porque hay que esperar al resto.",
        solucion: "En tu grupo de nivel se avanza en contenido nuevo cada semana, sin frenar por quien repasa lo básico.",
      },
      {
        dolor: "Te desmotiva ir a clase y sentir que no aprendes nada que no supieras ya.",
        solucion: "Los grupos avanzados suman contenido con regularidad, para que siempre haya algo que te rete de verdad.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si el grupo de nivel resulta ser intermedio flojo, otra vez?\"",
      respuesta: "Hablamos contigo antes de ubicarte, para que el grupo encaje con lo que ya bailas y no al revés.",
    },
    faqExtra: [
      {
        q: "¿Cómo sabéis en qué grupo encajo?",
        a: "Nos cuentas qué llevas bailado y qué quieres trabajar, y te ubicamos en el grupo que mejor encaja. Si hace falta, se ajusta sobre la marcha.",
      },
      {
        q: "¿Los grupos de nivel avanzan rápido o se estancan?",
        a: "Van sumando contenido nuevo con regularidad; no se quedan repitiendo siempre lo mismo.",
      },
    ],
    cierreEmocional: "Tu nivel merece un grupo a su altura. Cuéntanos qué llevas bailado y te ubicamos.",
    metaTitle: "Clases de nivel real, sin ir mezcladas",
    metaDescription: "Deja las clases donde el ritmo lo marca el principiante. Grupos por nivel real en Vilanova i la Geltrú.",
  },

  techo: {
    icp: "nivel",
    dolor: "techo",
    headline: "Tocaste techo en tu escuela anterior. Aquí se sigue subiendo.",
    subhead:
      "Progresión pensada para quien ya lleva tiempo bailando, no para quedarse aparcado en el mismo nivel curso tras curso.",
    ctaHero: "Quiero seguir progresando",
    mensajeWhatsapp:
      "¡Hola! Vengo de otra escuela y siento que llevo tiempo sin progresar, ¿tenéis grupos de nivel más avanzado? 🕺",
    dolorSolucion: [
      {
        dolor: "Llevas meses o años en la misma escuela y notas que ya no avanzas.",
        solucion: "Los grupos de nivel avanzado están pensados para seguir sumando técnica y repertorio, no para repetir curso.",
      },
      {
        dolor: "Sientes que tu antigua escuela te tiene aparcado siempre en el mismo nivel.",
        solucion: "Aquí valoramos tu nivel real desde el primer contacto y te ubicamos según lo que sabes, no según la antigüedad.",
      },
      {
        dolor: "Te preocupa cambiar de escuela y acabar volviendo a empezar de cero sin querer.",
        solucion: "Cambiar de escuela no significa bajar de nivel: te incorporas al grupo que corresponde a lo que ya bailas.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si al cambiar de escuela me hacen empezar de cero otra vez?\"",
      respuesta: "No es así: valoramos tu nivel real y te ubicamos en el grupo que le corresponde, no en el inicial por defecto.",
    },
    faqExtra: [
      {
        q: "Vengo de otra escuela, ¿cómo sabéis mi nivel?",
        a: "Nos cuentas qué llevas bailado y, si hace falta, se valora en la propia clase de prueba. No partes de cero por venir de fuera.",
      },
      {
        q: "¿Puedo cambiarme a mitad de temporada?",
        a: "Escríbenos y vemos qué grupo tiene hueco y encaja con tu nivel en ese momento.",
      },
    ],
    cierreEmocional: "Seguir progresando no debería ser la excepción. Cuéntanos de dónde vienes y seguimos desde ahí.",
    metaTitle: "Rompe tu techo de nivel — Clases avanzadas en Vilanova",
    metaDescription: "¿Llevas tiempo sin progresar en tu escuela? Sigue subiendo de nivel en NEXUS VNG, Vilanova i la Geltrú.",
  },

  "socials-garraf": {
    icp: "nivel",
    dolor: "socials-garraf",
    headline: "Cuesta encontrar nivel para socials por el Garraf. Aquí lo tienes.",
    subhead:
      "Un grupo con recorrido real, cerca de casa, sin tener que mirar siempre hacia Barcelona para bailar en condiciones.",
    ctaHero: "Quiero mi comunidad de nivel",
    mensajeWhatsapp:
      "¡Hola! Me cuesta encontrar gente de nivel para bailar y hacer socials por la zona del Garraf, ¿cómo es vuestro grupo? 💃",
    dolorSolucion: [
      {
        dolor: "Para encontrar gente de tu nivel acabas mirando siempre hacia Barcelona.",
        solucion: "En Vilanova tienes un grupo de nivel con el que entrenar y compartir socials sin moverte tan lejos.",
      },
      {
        dolor: "Te cuesta mantener el contacto con gente que baila en serio cerca de casa.",
        solucion: "Al venir cada semana al mismo grupo, construyes relación real con gente que también quiere seguir subiendo.",
      },
      {
        dolor: "Sientes que en el Garraf hay poca oferta pensada para quien ya no es principiante.",
        solucion: "Aquí hay grupos pensados específicamente para nivel intermedio y avanzado, no solo para quien empieza.",
      },
    ],
    objecion: {
      pregunta: "\"¿De verdad hay nivel suficiente en Vilanova o tendré que seguir yendo a Barcelona?\"",
      respuesta: "Los grupos avanzados están pensados justo para eso: tener dónde entrenar en serio sin salir del Garraf.",
    },
    faqExtra: [
      {
        q: "¿Organizáis socials o eventos fuera de clase?",
        a: "Escríbenos y te contamos qué hay planeado; la idea es que el grupo se vea también fuera del horario de clase.",
      },
      {
        q: "¿Hay gente que venga de otras escuelas de la zona?",
        a: "Sí, es habitual: bastante gente con recorrido busca precisamente esto al llegar a Vilanova.",
      },
    ],
    cierreEmocional: "Tu comunidad de nivel no tiene por qué estar a una hora de coche. Escríbenos y la construimos aquí.",
    metaTitle: "Comunidad de baile de nivel en el Garraf",
    metaDescription: "Socials y grupo de nivel cerca de casa, sin irte a Barcelona. Clases avanzadas en Vilanova i la Geltrú.",
  },

  "calidad-profes": {
    icp: "nivel",
    dolor: "calidad-profes",
    headline: "¿Estarán los profes a tu altura? Es la pregunta correcta.",
    subhead:
      "Formación técnica real, no solo coreografía bonita, para que notes la diferencia en tu cuerpo y no solo en un vídeo.",
    ctaHero: "Quiero ver el nivel de las clases",
    mensajeWhatsapp:
      "¡Hola! Ya tengo recorrido bailando y antes de apuntarme quiero saber cómo trabajáis la técnica en clase, ¿me contáis? 🕺",
    dolorSolucion: [
      {
        dolor: "Te da respeto apuntarte a una escuela nueva sin saber si los profes están a tu nivel.",
        solucion: "Pregunta directamente por la formación y el recorrido de quien va a dar tu clase, antes de decidir nada.",
      },
      {
        dolor: "Has vivido clases centradas solo en coreografía bonita, sin corrección técnica real.",
        solucion: "En los grupos de nivel se trabaja base técnica —musicalidad, control, ejecución—, no solo pasos para vídeo.",
      },
      {
        dolor: "Temes pagar una cuota y no notar mejora real en tu baile.",
        solucion: "La clase de prueba existe precisamente para que valores el nivel de enseñanza antes de comprometerte.",
      },
    ],
    objecion: {
      pregunta: "\"¿Cómo sé que los profes están a la altura antes de apuntarme?\"",
      respuesta: "Pregúntanos directamente por su formación y ven a la clase de prueba para valorarlo tú mismo/a.",
    },
    faqExtra: [
      {
        q: "¿Qué formación tienen los profesores?",
        a: "Escríbenos y te contamos el recorrido de quien imparte tu grupo antes de que te apuntes.",
      },
      {
        q: "¿En clase se trabaja técnica o solo coreografía?",
        a: "En los grupos de nivel se dedica tiempo a la base técnica, no solo a montar una coreografía.",
      },
    ],
    cierreEmocional: "No tienes por qué fiarte a ciegas. Ven, prueba y júzgalo con tu propio cuerpo.",
    metaTitle: "Profes a tu altura, técnica de verdad",
    metaDescription: "¿Dudas de la calidad técnica de una escuela nueva? Pregunta por la formación de los profes y pruébalo tú mismo/a.",
  },

  estilos: {
    icp: "nivel",
    dolor: "estilos",
    headline: "Pocas escuelas dan bien el reparto y el estilo cubano real. Aquí sí.",
    subhead: "Disciplinas trabajadas con su técnica y su música propias, para quien ya sabe distinguir la diferencia.",
    ctaHero: "Quiero ver la oferta de estilos",
    mensajeWhatsapp: "¡Hola! Busco clases de reparto y salsa cubana con nivel de verdad, ¿qué disciplinas tenéis y en qué grupos? 🔥",
    dolorSolucion: [
      {
        dolor: "Te cuesta encontrar escuelas que ofrezcan reparto o estilo cubano más allá de lo básico.",
        solucion: "Tenemos estas disciplinas dentro de la oferta regular, no solo como clase suelta ocasional.",
      },
      {
        dolor: "Has probado versiones \"light\" de estos estilos, adaptadas para quien no tiene ni idea.",
        solucion: "En los grupos de nivel se trabaja el estilo con su técnica y su música real, no una versión simplificada.",
      },
      {
        dolor: "Quieres variar de disciplina sin cambiar de escuela ni de grupo de gente.",
        solucion: "La tarifa fundadora da acceso a todas las disciplinas de tu nivel, así que puedes moverte entre estilos sin salir de aquí.",
      },
    ],
    objecion: {
      pregunta: "\"¿El reparto y el cubano son de verdad o una versión adaptada?\"",
      respuesta: "Se trabajan con su técnica y su música propias, dentro del grupo de nivel que corresponda.",
    },
    faqExtra: [
      {
        q: "¿Puedo combinar varias disciplinas si ya tengo nivel?",
        a: "Sí, la tarifa fundadora incluye acceso a todas las disciplinas de tu nivel, así que puedes moverte entre ellas.",
      },
      {
        q: "¿El reparto se da como clase suelta o de forma regular?",
        a: "Forma parte de la oferta regular, no es una clase puntual aislada.",
      },
    ],
    cierreEmocional: "Si ya sabes distinguir un reparto bien dado, ven a comprobarlo. Escríbenos y te contamos los horarios.",
    metaTitle: "Reparto y salsa cubana real en Vilanova",
    metaDescription: "Disciplinas trabajadas con técnica real, no la versión light. Reparto, salsa cubana y más en Vilanova i la Geltrú.",
  },

  "practicar-regular": {
    icp: "nivel",
    dolor: "practicar-regular",
    headline: "Practicar de forma regular, no solo clases sueltas.",
    subhead:
      "Una cita semanal fija con tu grupo de nivel, para que el progreso no dependa de cuándo te acuerdas de apuntarte a algo suelto.",
    ctaHero: "Quiero mi cita semanal fija",
    mensajeWhatsapp: "¡Hola! Ya bailo pero solo voy a clases sueltas de vez en cuando, busco algo más regular, ¿cómo funcionan vuestros grupos? 🗓️",
    dolorSolucion: [
      {
        dolor: "Solo consigues practicar cuando encuentras una clase suelta o un workshop puntual.",
        solucion: "Aquí te incorporas a un grupo fijo con clase semanal, así el progreso no depende de la casualidad.",
      },
      {
        dolor: "Entre clase suelta y clase suelta se te olvida buena parte de lo aprendido.",
        solucion: "La continuidad semanal con el mismo grupo y la misma progresión hace que lo trabajado se quede.",
      },
      {
        dolor: "Te cuesta comprometerte con algo regular por miedo a que no encaje con tu nivel.",
        solucion: "Te ubicamos en el grupo de nivel que corresponde a lo que ya bailas, para que la regularidad tenga sentido desde la primera semana.",
      },
    ],
    objecion: {
      pregunta: "\"¿Y si me apunto y el grupo va a otro ritmo que el mío?\"",
      respuesta: "Te ubicamos según tu nivel real antes de empezar, y si hace falta se ajusta sobre la marcha.",
    },
    faqExtra: [
      {
        q: "¿Las clases son semanales o esporádicas?",
        a: "Los grupos tienen clase fija cada semana, no son sesiones sueltas.",
      },
      {
        q: "¿Puedo asistir aunque no pueda venir todas las semanas?",
        a: "Lo ideal es la regularidad para que el grupo avance junto, pero escríbenos tu disponibilidad y lo hablamos.",
      },
    ],
    cierreEmocional: "El progreso real viene de la regularidad, no de la clase suelta ocasional. Empieza tu cita semanal aquí.",
    metaTitle: "Practica baile de forma regular, no clases sueltas",
    metaDescription: "Cita semanal fija con tu grupo de nivel. Deja las clases sueltas y practica en serio en Vilanova i la Geltrú.",
  },
};

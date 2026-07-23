import type { CampanaDolorContent } from "./types";

/**
 * ICP 5 — El bailarín con recorrido (subir de nivel). Secundario.
 * Fuente: analisis-icp-pain-points.md § ICP 5. Se trabaja más por comunidad/socials que por landing.
 * Psicología: identidad de bailarín + coste de oportunidad del estancamiento + autoridad técnica.
 * Los argumentos de clase salen del contenido real de content/modalidades.ts.
 */
export const nivel: Record<string, CampanaDolorContent> = {
  "clases-mezcladas": {
    icp: "nivel",
    dolor: "clases-mezcladas",
    headline: "Deja las clases donde el ritmo lo marca el que menos sabe.",
    subhead:
      "Grupos organizados por nivel real, para que avances al ritmo que te corresponde y no al de quien acaba de empezar.",
    ctaHero: "Quiero mi nivel real",
    mensajeWhatsapp:
      "¡Hola! Ya tengo bastante recorrido bailando y busco un grupo de nivel intermedio-avanzado, ¿tenéis algo así? 💃",
    agitacion: {
      kicker: "Lo conoces de sobra",
      parrafos: [
        "Pagas una clase de \"intermedio\" y a la tercera semana el profesor vuelve a explicar el básico porque han entrado cuatro nuevos. Tú, educadamente, repites por enésima vez lo que dominas desde hace dos años.",
        "El problema no es la paciencia — es el coste. Cada mes en una clase que no te reta es un mes de progreso perdido. El nivel no se mantiene solo: sin reto, se oxida. Y mientras, la técnica que podrías estar puliendo se queda en la lista de pendientes.",
        "Un grupo de tu nivel cambia la ecuación entera: contenido nuevo cada semana, compañeros que te exigen sin saberlo, y esa sensación olvidada de salir de clase con algo que no sabías al entrar.",
      ],
    },
    antesDespues: {
      titulo: "Clase mezclada vs. grupo de tu nivel",
      antesLabel: "Donde estás ahora",
      antes: [
        "Repites básicos que dominas para no dejar atrás a los nuevos.",
        "El contenido nuevo llega con cuentagotas — si llega.",
        "Sales de clase igual que entraste: sin reto no hay progreso.",
        "Tu nivel se estanca mientras pagas por \"mantenerlo\".",
      ],
      despuesLabel: "En tu grupo real",
      despues: [
        "Contenido que no dominas: por fin algo que llevarte a casa.",
        "Compañeros de tu nivel que te empujan sin darse cuenta.",
        "Musicalidad de verdad: clave, son y timba — no solo pasos.",
        "Sales de clase con deberes. Como debe ser.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana de nivel: timba, musicalidad y rueda con exigencia",
      descripcion:
        "En los grupos de nivel, la salsa cubana es otra cosa: musicalidad de clave, son y timba para bailar con la música y no encima de ella, figuras con matices, y ruedas de casino donde el cantante marca rápido y hay que estar. El punto donde el casino deja de ser básico y empieza a ser un idioma.",
      porQue: [
        {
          title: "Musicalidad en serio",
          text: "Clave, son y timba: entender la música para interpretarla — el salto que separa niveles de verdad.",
        },
        {
          title: "Rueda con nivel",
          text: "Una rueda rápida con gente que responde es otro deporte: exigencia real y disfrute real.",
        },
        {
          title: "Recursos de improvisación",
          text: "Se entrena lo que usas en los socials: improvisar con cualquier pareja y cualquier tema.",
        },
      ],
      cta: "Probar el grupo de nivel",
    },
    dolorSolucion: [
      {
        dolor: "Te apuntas a una clase y el ritmo lo acaba marcando quien va más flojo.",
        solucion: "Los grupos están organizados por nivel real, no por franja horaria, así avanzas al ritmo que te toca.",
      },
      {
        dolor: "Repites las mismas bases clase tras clase porque hay que esperar al resto.",
        solucion: "En tu grupo de nivel se avanza en contenido nuevo cada semana, sin frenar por quien repasa lo básico.",
      },
      {
        dolor: "Te desmotiva ir a clase y no aprender nada que no supieras ya.",
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
    metaTitle: "Clases de nivel real, sin ir mezcladas — Vilanova",
    metaDescription: "Grupos por nivel real: timba, musicalidad y contenido nuevo cada semana. Salsa de nivel en Vilanova.",
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
    agitacion: {
      kicker: "La señal que ya notaste",
      parrafos: [
        "Hace meses que las clases no te sorprenden. Las figuras nuevas son variaciones de lo mismo, el nivel del grupo no sube, y la sensación de progreso — esa que te enganchó al baile — desapareció sin que te dieras cuenta de cuándo.",
        "No es culpa de tu escuela: muchas enseñan muy bien hasta cierto punto, y ahí se acaba el mapa. El problema es quedarse por lealtad o por costumbre cuando el mapa ya se acabó. El estancamiento cómodo sigue siendo estancamiento.",
        "Romper el techo casi siempre exige lo mismo: contenido que tu escuela no tiene. Estilos nuevos, otra forma de trabajar la música, retos que aún no controlas. Eso no se consigue repitiendo curso — se consigue cambiando de sala.",
      ],
    },
    antesDespues: {
      titulo: "Repetir curso vs. volver a progresar",
      antesLabel: "En el techo",
      antes: [
        "Las clases se sienten como repaso — hace meses que nada te sorprende.",
        "El nivel del grupo marca tu tope, y el grupo no sube.",
        "Sigues por costumbre, no por progreso.",
        "La chispa del principio — aprender — se apagó.",
      ],
      despuesLabel: "Rompiendo el techo",
      despues: [
        "Contenido que no controlas: reparto, disociación, otro lenguaje corporal.",
        "La incomodidad buena de volver a ser aprendiz en algo.",
        "Tu baile de siempre mejora al absorber un estilo nuevo.",
        "La chispa vuelve: sales de clase con la cabeza llena.",
      ],
    },
    clase: {
      slug: "reparto",
      nombre: "Reparto",
      titulo: "Reparto: el contenido que tu escuela anterior no tenía",
      descripcion:
        "Si tocaste techo, el reparto es la escalera: el género urbano que domina Cuba hoy, con un lenguaje corporal propio — disociación, pasos marcados, actitud e improvisación — que fuera de Cuba casi nadie enseña bien. Un territorio nuevo entero para un bailarín que ya se sabe el mapa viejo.",
      porQue: [
        {
          title: "Territorio sin explorar",
          text: "Disociación, códigos y flow propios: contenido genuinamente nuevo, no otra variación de lo que ya sabes.",
        },
        {
          title: "Un sello que pocos tienen",
          text: "Fuera de Cuba casi nadie lo enseña bien: dominar reparto te da un sello propio en cualquier pista.",
        },
        {
          title: "Mejora todo lo demás",
          text: "La disociación y la improvisación del reparto se notan después en cualquier otro estilo que bailes.",
        },
      ],
      cta: "Probar reparto",
    },
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
    metaTitle: "Rompe tu techo de nivel — Reparto en Vilanova",
    metaDescription: "¿Estancado en tu escuela? El reparto es territorio nuevo entero: disociación, flow e improvisación. Vilanova.",
  },

  "socials-garraf": {
    icp: "nivel",
    dolor: "socials-garraf",
    headline: "Nivel en el Garraf, sin peregrinar a Barcelona.",
    subhead:
      "Un grupo con recorrido real, cerca de casa, para entrenar y compartir socials sin mirar siempre hacia la capital.",
    ctaHero: "Quiero mi comunidad de nivel",
    mensajeWhatsapp:
      "¡Hola! Me cuesta encontrar gente de nivel para bailar y hacer socials por la zona del Garraf, ¿cómo es vuestro grupo? 💃",
    agitacion: {
      kicker: "La cuenta del peregrinaje",
      parrafos: [
        "Cada social decente te cuesta lo mismo: una hora de ida, otra de vuelta, y la vuelta de madrugada con el trabajo esperando al día siguiente. Bailar bien, viviendo en el Garraf, se paga en kilómetros.",
        "Así que raciones: vas una vez al mes, quizá dos. Y entre social y social, tu baile hiberna — porque cerca de casa no hay con quién mantenerlo vivo.",
        "La pieza que falta no es otra escuela más: es una comunidad de nivel a distancia de \"me acerco un rato\". Gente que baila en serio, cada semana, sin que el plan dependa de la agenda de la capital.",
      ],
    },
    antesDespues: {
      titulo: "Bailar lejos vs. bailar cerca",
      antesLabel: "Dependiendo de Barcelona",
      antes: [
        "Cada social decente cuesta dos horas de coche y una madrugada.",
        "Racionas el baile: una o dos veces al mes, con suerte.",
        "Entre social y social, tu nivel hiberna.",
        "Tu comunidad de baile vive a 50 kilómetros de tu casa.",
      ],
      despuesLabel: "Con base en Vilanova",
      despues: [
        "Entrenas cada semana a un paseo de casa.",
        "Las mismas caras de nivel, semana tras semana: comunidad real.",
        "Los socials y fiestas de la escuela te pillan al lado.",
        "Barcelona pasa de necesidad a opción para ocasiones.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: el corazón de la comunidad",
      descripcion:
        "La rueda de casino es, por definición, comunidad: parejas en círculo, cambio constante, energía colectiva. En los grupos de nivel se entrena con exigencia — musicalidad, figuras, improvisación — y las fiestas y sociales de la escuela le dan a ese grupo vida más allá de la clase. Tu base de operaciones en el Garraf.",
      porQue: [
        {
          title: "Comunidad integrada",
          text: "La rueda te conecta con todo el grupo de nivel cada semana: la comunidad viene con la clase.",
        },
        {
          title: "Recursos para socials",
          text: "Improvisación y adaptación a cualquier pareja: justo lo que usas en los socials, entrenado en serio.",
        },
        {
          title: "Vida más allá de la clase",
          text: "Fiestas sociales y eventos de la escuela: el grupo se ve también fuera del horario — y cerca de casa.",
        },
      ],
      cta: "Conocer el grupo de nivel",
    },
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
        dolor: "Sientes que en el Garraf hay poca oferta para quien ya no es principiante.",
        solucion: "Aquí hay grupos pensados específicamente para nivel intermedio y avanzado, no solo para quien empieza.",
      },
    ],
    objecion: {
      pregunta: "\"¿De verdad hay nivel en Vilanova o tendré que seguir yendo a Barcelona?\"",
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
    metaDescription: "Deja de peregrinar a Barcelona: grupo de nivel, socials y comunidad en Vilanova i la Geltrú.",
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
    agitacion: {
      kicker: "Ya te ha pasado antes",
      parrafos: [
        "Escuela nueva, promesas grandes, y a la tercera clase lo ves: el profesor enseña coreografías bonitas pero no sabe explicarte por qué un movimiento funciona. Pasos sí, técnica no. Y tú ya estás en el punto en que sin técnica no hay progreso.",
        "Con recorrido, el coste de equivocarse de escuela no es solo la cuota: son meses de vicios nuevos que luego cuesta desaprender. Por eso dudar de una escuela nueva no es desconfianza — es criterio.",
        "La respuesta seria a esa duda no es \"confía en nosotros\": es ponértelo fácil para comprobarlo. Pregunta lo que quieras sobre la formación de quien imparte tu grupo, ven a una clase de prueba, y trae tu ojo crítico — precisamente porque sabes mirar, sabrás lo que ves.",
      ],
    },
    antesDespues: {
      titulo: "Clases de pasos vs. clases de técnica",
      antesLabel: "Lo que ya has sufrido",
      antes: [
        "Coreografías vistosas sin explicación de la mecánica.",
        "Profesores que bailan bien pero no saben enseñar.",
        "\"Corrección\" que es repetir más veces, no entender mejor.",
        "Meses pagados para acumular vicios en vez de base.",
      ],
      despuesLabel: "Lo que buscas",
      despues: [
        "Base técnica trabajada: musicalidad, control, ejecución.",
        "Correcciones concretas que notas en el cuerpo, no en el vídeo.",
        "Respuestas al \"por qué\" de cada movimiento.",
        "Una clase de prueba donde juzgar con tus propios criterios.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata con técnica: de la base dominicana al estilo moderno",
      descripcion:
        "Si quieres medir la seriedad técnica de una escuela, la bachata es buen termómetro: aquí se trabaja desde la base dominicana hasta los recursos de la moderna y sensual — conexión, interpretación musical, ondas y aislamientos. Un recorrido técnico completo, no cuatro figuras vistosas para grabar un reel.",
      porQue: [
        {
          title: "Recorrido técnico completo",
          text: "De la base dominicana a la moderna: interpretación de guitarra, bongó y pausas — técnica con fundamento.",
        },
        {
          title: "Detalle que marca niveles",
          text: "Ondas, aislamientos y estilo propio: el trabajo fino que separa bailar de moverse.",
        },
        {
          title: "Compruébalo tú",
          text: "Pregunta por la formación de quien imparte tu grupo y júzgalo en la clase de prueba, con tu criterio.",
        },
      ],
      cta: "Probar y juzgar por mí mismo/a",
    },
    dolorSolucion: [
      {
        dolor: "Te da respeto apuntarte a una escuela nueva sin saber si los profes están a tu nivel.",
        solucion: "Te contamos el recorrido de quien imparte tu grupo antes de que tomes ninguna decisión.",
      },
      {
        dolor: "Has vivido clases centradas solo en coreografía bonita, sin corrección técnica real.",
        solucion: "En los grupos de nivel se trabaja base técnica —musicalidad, control, ejecución—, no solo pasos para vídeo.",
      },
      {
        dolor: "Temes pagar una cuota y no notar mejora real en tu baile.",
        solucion: "La clase de prueba existe precisamente para eso: valoras el nivel de enseñanza antes de comprometerte.",
      },
    ],
    objecion: {
      pregunta: "\"¿Cómo sé que los profes están a la altura antes de apuntarme?\"",
      respuesta: "Pregúntanos por su formación y ven a la clase de prueba a valorarlo tú mismo/a.",
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
    metaTitle: "Profes a tu altura, técnica de verdad — Vilanova",
    metaDescription: "Técnica con fundamento, no coreografía para reels. Ven a la clase de prueba y júzgalo con tu criterio.",
  },

  estilos: {
    icp: "nivel",
    dolor: "estilos",
    headline: "Reparto y estilo cubano de verdad. No la versión light.",
    subhead: "Disciplinas trabajadas con su técnica y su música propias, para quien ya sabe distinguir la diferencia.",
    ctaHero: "Quiero ver la oferta de estilos",
    mensajeWhatsapp: "¡Hola! Busco clases de reparto y salsa cubana con nivel de verdad, ¿qué disciplinas tenéis y en qué grupos? 🔥",
    agitacion: {
      kicker: "Sabes distinguirlo",
      parrafos: [
        "Has visto \"reparto\" que era reggaetón comercial con otro nombre. \"Estilo cubano\" que era salsa de academia con camisa de flores. Cuando llevas años bailando, la versión descafeinada se detecta en los primeros ocho tiempos.",
        "El problema es que fuera de Cuba casi nadie enseña estos estilos con su código real: la disociación del reparto, sus pasos y su actitud; el casino con su clave, su son y su calle. Lo auténtico es minoritario, y lo minoritario no suele llegar a las escuelas de tu zona.",
        "Cuando llega, la diferencia se nota rápido: el estilo deja de ser un disfraz que te pones y pasa a ser un idioma que hablas. Eso es lo que hay aquí — y a un paseo de tu casa, no en un workshop anual.",
      ],
    },
    antesDespues: {
      titulo: "La versión light vs. el estilo real",
      antesLabel: "Lo que has encontrado hasta ahora",
      antes: [
        "\"Reparto\" que es reggaetón comercial disfrazado.",
        "Estilos cubanos sin su música, su código ni su calle.",
        "Workshops sueltos una vez al año como única opción seria.",
        "La sensación de imitar un estilo en vez de hablarlo.",
      ],
      despuesLabel: "Lo que hay aquí",
      despues: [
        "Reparto con su lenguaje real: disociación, códigos, improvisación.",
        "Casino con clave, son y timba — no salsa genérica con etiqueta.",
        "Oferta regular, cada semana: el estilo se entrena, no se visita.",
        "Un sello propio que casi nadie más tiene en la pista.",
      ],
    },
    clase: {
      slug: "reparto",
      nombre: "Reparto",
      titulo: "Reparto: el género que domina Cuba, enseñado con su código",
      descripcion:
        "El reparto de verdad: el género urbano nacido en los barrios de La Habana, con su lenguaje corporal propio — pasos marcados, disociación, actitud e improvisación. En clase se desmonta ese código paso a paso, con su música y su cultura, no una adaptación comercial. Y de forma regular, no como evento anual.",
      porQue: [
        {
          title: "El código auténtico",
          text: "Pasos, gestos y musicalidad del reparto actual — el que suena en La Habana, no su versión de academia.",
        },
        {
          title: "Regular, no anecdótico",
          text: "Forma parte de la oferta semanal: un estilo se domina entrenándolo, no visitándolo en workshops.",
        },
        {
          title: "Todas las disciplinas, una cuota",
          text: "La tarifa fundadora cubre todas las disciplinas de tu nivel: reparto, casino y lo que quieras combinar.",
        },
      ],
      cta: "Probar reparto",
    },
    dolorSolucion: [
      {
        dolor: "Te cuesta encontrar escuelas que ofrezcan reparto o estilo cubano más allá de lo básico.",
        solucion: "Aquí estas disciplinas están dentro de la oferta regular, no como clase suelta ocasional.",
      },
      {
        dolor: "Has probado versiones \"light\" de estos estilos, adaptadas para quien no tiene ni idea.",
        solucion: "En los grupos de nivel se trabaja el estilo con su técnica y su música real, no una versión simplificada.",
      },
      {
        dolor: "Quieres variar de disciplina sin cambiar de escuela ni de grupo de gente.",
        solucion: "La tarifa fundadora da acceso a todas las disciplinas de tu nivel: te mueves entre estilos sin salir de aquí.",
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
    cierreEmocional: "Si sabes distinguir un reparto bien dado, ven a comprobarlo. Escríbenos y te contamos los horarios.",
    metaTitle: "Reparto y salsa cubana real en Vilanova",
    metaDescription: "El código auténtico del reparto y el casino, cada semana y cerca de casa. No la versión light. Vilanova.",
  },

  "practicar-regular": {
    icp: "nivel",
    dolor: "practicar-regular",
    headline: "Practicar de forma regular, no solo clases sueltas.",
    subhead:
      "Una cita semanal fija con tu grupo de nivel, para que el progreso no dependa de cuándo te acuerdas de apuntarte a algo suelto.",
    ctaHero: "Quiero mi cita semanal fija",
    mensajeWhatsapp: "¡Hola! Ya bailo pero solo voy a clases sueltas de vez en cuando, busco algo más regular, ¿cómo funcionan vuestros grupos? 🗓️",
    agitacion: {
      kicker: "El patrón del practicante suelto",
      parrafos: [
        "Un workshop en marzo, un social en mayo, una clase suelta cuando coincide. Entre medias, semanas sin bailar — y cada vez que vuelves, la primera media hora se va en recuperar lo oxidado.",
        "Así el nivel no sube: rebota. Avanzas en el workshop, retrocedes en el parón, y vuelta a empezar. Es la cinta de correr del bailarín intermitente — mucho movimiento, cero desplazamiento.",
        "Lo que convierte recorrido en progreso es la continuidad: mismo grupo, misma semana, progresión que se acumula. La clase suelta es un chute; la regularidad es el entrenamiento.",
      ],
    },
    antesDespues: {
      titulo: "Bailar a rachas vs. entrenar en serio",
      antesLabel: "El patrón actual",
      antes: [
        "Workshops y clases sueltas cuando surge — sin continuidad.",
        "Cada vuelta empieza recuperando lo oxidado del parón.",
        "El nivel rebota: sube en la racha, baja en el hueco.",
        "Sin grupo estable, bailar depende de que \"surja algo\".",
      ],
      despuesLabel: "Con cita fija",
      despues: [
        "Clase semanal con tu grupo de nivel: la progresión se acumula.",
        "Lo trabajado una semana se construye encima a la siguiente.",
        "Un grupo estable que te conoce y te exige.",
        "Bailar deja de depender del azar: tiene día y hora.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: entrenamiento semanal con tu grupo",
      descripcion:
        "Para practicar en serio necesitas un grupo fijo — y la rueda de casino es el mejor formato de entrenamiento continuo que existe: cada semana, con tu grupo de nivel, trabajando musicalidad, figuras e improvisación sobre lo construido la semana anterior. Progresión real, no chutes sueltos.",
      porQue: [
        {
          title: "Progresión acumulativa",
          text: "Cada clase construye sobre la anterior: figuras, musicalidad y recursos que se asientan de verdad.",
        },
        {
          title: "Grupo estable de nivel",
          text: "Las mismas caras cada semana: un grupo que conoce tu baile y te empuja a más.",
        },
        {
          title: "Práctica social incluida",
          text: "La rueda es práctica de improvisación cada semana — y los sociales de la escuela, tu campo de juego.",
        },
      ],
      cta: "Empezar mi rutina semanal",
    },
    dolorSolucion: [
      {
        dolor: "Solo practicas cuando encuentras una clase suelta o un workshop puntual.",
        solucion: "Aquí te incorporas a un grupo fijo con clase semanal, así el progreso no depende de la casualidad.",
      },
      {
        dolor: "Entre clase suelta y clase suelta se te olvida buena parte de lo aprendido.",
        solucion: "La continuidad semanal con el mismo grupo y la misma progresión hace que lo trabajado se quede.",
      },
      {
        dolor: "Te cuesta comprometerte con algo regular por miedo a que no encaje con tu nivel.",
        solucion: "Te ubicamos en el grupo que corresponde a lo que ya bailas, para que la regularidad tenga sentido desde la primera semana.",
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
    metaTitle: "Practica baile de forma regular — Vilanova",
    metaDescription: "Deja el patrón de workshops sueltos: grupo fijo semanal de tu nivel en Vilanova i la Geltrú.",
  },
};

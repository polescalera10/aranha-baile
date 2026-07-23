import type { CampanaDolorContent } from "./types";

/**
 * ICP 1 — El Social (conocer gente y llenar el finde).
 * Fuente: analisis-icp-pain-points.md § ICP 1. Motor de conversión nº1 junto a "empezar".
 * Psicología: PAS + contraste antes/después + identidad ("gente con plan").
 * Los argumentos de clase salen del contenido real de content/modalidades.ts.
 */
export const social: Record<string, CampanaDolorContent> = {
  "circulo-encogido": {
    icp: "social",
    dolor: "circulo-encogido",
    headline: "Tus amigos ya no salen. Nosotros sí.",
    subhead:
      "Parejas, hijos, sofá: el grupo de siempre se apaga y nadie lo dice en voz alta. Aquí recuperas lo que echas de menos — gente con ganas de quedar cada semana.",
    ctaHero: "Quiero recuperar mi plan",
    mensajeWhatsapp:
      "¡Hola! Mi grupo de amigos ya casi no sale y busco un plan nuevo, ¿me contáis cómo son las clases? 🙂",
    agitacion: {
      kicker: "¿Te suena?",
      parrafos: [
        "Propones un plan en el grupo de WhatsApp. Uno no puede, otro \"lo mira\", el tercero contesta con un audio el domingo. Al final no sale nada, otra vez.",
        "No es culpa de nadie. La vida cambia: parejas, hijos, trabajos. Pero mientras tanto tu agenda social se ha ido vaciando sin que nadie firmara nada.",
        "Y el problema de esperar a que el grupo de siempre reviva es que puedes esperar años. La alternativa es más simple: un sitio donde el plan ya existe, cada semana, sin depender de que nadie conteste.",
      ],
    },
    antesDespues: {
      titulo: "La diferencia entre esperar el plan y tenerlo",
      antesLabel: "Tu semana ahora",
      antes: [
        "Propones planes que se desinflan en el grupo de WhatsApp.",
        "El finde depende de si a alguien más le viene bien.",
        "Cada vez ves menos gente nueva: siempre los mismos, cada vez menos.",
        "La vida social es algo que te pasa (o no), no algo que eliges.",
      ],
      despuesLabel: "Tu semana con NEXUS",
      despues: [
        "Una cita fija que no hay que organizar: llegas y el plan ya está montado.",
        "Un grupo entero de gente nueva que ves cada semana, sí o sí.",
        "La rueda de casino te hace bailar con todo el grupo — imposible quedarte descolgado.",
        "Las fiestas y socials de la escuela empiezan a llenarte el calendario.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: el baile que viene con grupo incluido",
      descripcion:
        "No es casualidad que te recomendemos esta: la salsa cubana es el baile social por excelencia. Su formato estrella, la rueda de casino, es literalmente un grupo de gente bailando en círculo y cambiando de pareja al ritmo de la música. El plan y la gente vienen de serie.",
      porQue: [
        {
          title: "Rotas con todo el grupo",
          text: "En la rueda de casino cambias de pareja constantemente: en una clase has bailado —y hablado— con todo el mundo.",
        },
        {
          title: "Energía colectiva",
          text: "Es imposible salir de una rueda sin sonreír. La risa compartida acelera lo que en un bar tarda meses.",
        },
        {
          title: "Tu plan de finde, resuelto",
          text: "La salsa se baila en fiestas y sociales: lo que aprendes el martes lo vives el sábado.",
        },
      ],
      cta: "Probar salsa cubana",
    },
    dolorSolucion: [
      {
        dolor: "Tus amigos de siempre tienen pareja, hijos o simplemente ya no salen.",
        solucion: "Aquí te espera un grupo que sí queda cada semana, sin depender de la agenda de nadie.",
      },
      {
        dolor: "De salir cada finde habéis pasado a veros un par de veces al año.",
        solucion: "Recuperas una cita fija en tu semana, con gente que la busca tanto como tú.",
      },
      {
        dolor: "Reconstruir la vida social de adulto parece una montaña.",
        solucion: "No la reconstruyes solo/a: entras en un grupo ya formado que te acoge desde la primera clase.",
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
    metaTitle: "Recupera tu plan social — Salsa cubana en Vilanova",
    metaDescription:
      "¿Tu grupo de amigos ya no sale? La rueda de casino viene con grupo incluido. Clase de prueba en Vilanova i la Geltrú.",
  },

  "sin-apps": {
    icp: "social",
    dolor: "sin-apps",
    headline: "Conocer gente de verdad. Sin apps, sin bar.",
    subhead:
      "Nada de swipes ni conversaciones que mueren en el móvil. Una actividad en común, risas de verdad y las mismas caras cada semana.",
    ctaHero: "Quiero conocer gente de verdad",
    mensajeWhatsapp: "¡Hola! Estoy cansado/a de apps y bares para conocer gente, ¿cómo funcionan vuestras clases? 🙂",
    agitacion: {
      kicker: "Sé honesto/a",
      parrafos: [
        "¿Cuántas conversaciones de app has tenido este año que llegaran a algo? ¿Y cuántas horas has echado deslizando el pulgar para eso?",
        "Las apps convierten conocer gente en un catálogo. Los bares, en gritar por encima de la música con desconocidos que no volverás a ver. Ninguno de los dos se parece a cómo se hacían tus mejores amistades: haciendo algo juntos, repetidamente, sin presión.",
        "Eso exacto es una clase de baile. Un motivo real para verse, algo de qué hablar sin forzarlo, y las mismas caras la semana que viene. Así es como la gente se conoce de verdad desde siempre.",
      ],
    },
    antesDespues: {
      titulo: "De coleccionar chats a tener con quién quedar",
      antesLabel: "Conocer gente hasta hoy",
      antes: [
        "Chats que se enfrían a los tres días y vuelta a empezar.",
        "Encuentros con presión: los dos evaluando si \"encaja\".",
        "Bares donde apenas se puede hablar y nadie repite.",
        "Cada intento social empieza de cero, sin continuidad.",
      ],
      despuesLabel: "Conocer gente bailando",
      despues: [
        "Un motivo real para verse cada semana, sin tener que inventar excusas.",
        "Cero presión: estáis ahí para aprender, la conversación sale sola.",
        "Conexión física real — la bachata es literalmente aprender a escuchar al otro sin hablar.",
        "Continuidad: las mismas personas, semana tras semana. Así se construye confianza.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: conexión de verdad, sin pantallas",
      descripcion:
        "Si lo que te sobra son conversaciones vacías, la bachata es el antídoto: un baile de pareja que enseña a conectar sin hablar — guía, respuesta y confianza. Y como es el baile más bailado de España, lo que aprendes aquí te abre cualquier pista y cualquier social.",
      porQue: [
        {
          title: "Conexión sin palabras",
          text: "La bachata enseña a escuchar al otro con el cuerpo: guía, respuesta, confianza. Lo contrario de un chat.",
        },
        {
          title: "Rotas en cada clase",
          text: "No necesitas venir con nadie: se rota de pareja y en pocas clases conoces a todo el grupo.",
        },
        {
          title: "El baile más demandado",
          text: "Suena en todas las fiestas y sociales: saber bachata es la llave que abre cualquier pista.",
        },
      ],
      cta: "Probar bachata",
    },
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
    metaTitle: "Conoce gente sin apps — Bachata en Vilanova",
    metaDescription:
      "Cambia las apps y los bares por un plan semanal donde conocer gente de verdad. Clase de prueba de bachata en Vilanova.",
  },

  "vengo-solo": {
    icp: "social",
    dolor: "vengo-solo",
    headline: "Apúntate solo/a. Aquí es lo normal.",
    subhead:
      "Sin pareja, sin cuadrilla, sin conocer a nadie. Rotas por el grupo desde el primer día y sales con nombres nuevos en el móvil.",
    ctaHero: "Quiero venir aunque sea solo/a",
    mensajeWhatsapp: "¡Hola! Quiero apuntarme pero voy solo/a, ¿es raro o es lo normal en vuestras clases? 🙂",
    agitacion: {
      kicker: "La escena que te frena",
      parrafos: [
        "Te lo imaginas así: llegas, todo el mundo se conoce, se saludan con confianza, y tú en la puerta sin saber dónde ponerte. Esa imagen mental es la que lleva meses ganándote el pulso.",
        "Ahora la realidad: en una escuela que acaba de abrir, nadie tiene grupo de antes. La persona que llega a tu lado está haciendo el mismo cálculo que tú. Y la rueda de casino no deja que nadie se quede en la esquina: la clase misma te presenta a todo el mundo.",
        "El único momento incómodo real es este de ahora — decidir si escribes o no. Dentro, el problema desaparece por diseño.",
      ],
    },
    antesDespues: {
      titulo: "Lo que te imaginas vs. lo que pasa",
      antesLabel: "Lo que te imaginas",
      antes: [
        "Llegar y no conocer a nadie mientras el resto ya tiene grupo.",
        "Quedarte sin pareja de baile, mirando desde el borde.",
        "Sentirte el/la \"nuevo/a\" durante semanas.",
        "Tener que ser extrovertido/a para integrarte.",
      ],
      despuesLabel: "Lo que pasa de verdad",
      despues: [
        "La rotación te empareja con todo el grupo desde el minuto uno.",
        "Nadie se queda sin bailar: los ejercicios están diseñados para eso.",
        "A la segunda clase ya te saludan por tu nombre.",
        "No hace falta ser sociable: el formato hace el trabajo por ti.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: el baile donde nadie viene acompañado",
      descripcion:
        "La rueda de casino se baila en círculo y con cambio constante de pareja: venir solo/a no es un inconveniente, es el formato. Un cantante marca las figuras, todos cambian a la vez, y a los diez minutos has bailado con media clase sin haber tenido que presentarte a nadie.",
      porQue: [
        {
          title: "El formato te integra",
          text: "En la rueda cambias de pareja al ritmo de la música: la clase te presenta al grupo sin que tú hagas nada.",
        },
        {
          title: "Sin pareja, sin problema",
          text: "El casino se aprende rotando desde cero. Venir acompañado no da ninguna ventaja.",
        },
        {
          title: "Energía que engancha",
          text: "Es pura energía colectiva: imposible salir de una rueda sin sonreír — ni sin haber hablado con nadie.",
        },
      ],
      cta: "Probar salsa cubana",
    },
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
    metaTitle: "Apúntate solo/a a bailar — Salsa cubana en Vilanova",
    metaDescription:
      "No necesitas pareja ni conocidos: en la rueda de casino rotas con todo el grupo. Prueba una clase en Vilanova.",
  },

  "nuevo-en-vilanova": {
    icp: "social",
    dolor: "nuevo-en-vilanova",
    headline: "¿Nuevo/a en Vilanova? Empieza por aquí.",
    subhead: "Hacer amigos en una ciudad nueva puede llevar años. O una clase a la semana.",
    ctaHero: "Quiero hacer vida aquí",
    mensajeWhatsapp: "¡Hola! Acabo de llegar a Vilanova y busco cómo conocer gente y hacer vida local, ¿me contáis? 🙂",
    agitacion: {
      kicker: "Los primeros meses en una ciudad nueva",
      parrafos: [
        "Ya conoces el supermercado, la farmacia y el camino al trabajo. Lo que no tienes es a quién llamar un sábado. Y eso no se soluciona paseando más.",
        "El truco que nadie te cuenta: la vida local no se hace en las calles, se hace en los sitios donde la gente repite. Un bar no te da eso — cada día hay gente distinta. Una clase semanal sí: mismas caras, misma hora, cada semana, hasta que un día sin darte cuenta ya eres \"de aquí\".",
        "Cuanto antes empieces, antes deja Vilanova de ser el sitio donde vives para ser tu sitio.",
      ],
    },
    antesDespues: {
      titulo: "De vivir en Vilanova a ser de Vilanova",
      antesLabel: "Tus primeros meses ahora",
      antes: [
        "Conoces las calles, pero no a las personas.",
        "Tu vida social sigue en tu ciudad anterior, a base de videollamadas.",
        "Los findes se van en visitas a casa o en no hacer nada.",
        "\"Ya conoceré gente\" — pero pasan los meses y no aparece cómo.",
      ],
      despuesLabel: "Con una clase semanal",
      despues: [
        "Un sitio fijo donde te esperan cada semana, desde la primera.",
        "Caras conocidas del pueblo con las que cruzarte por la calle y pararte a hablar.",
        "Fiestas y sociales de la escuela: agenda local propia, no prestada.",
        "Un grupo del que formas parte — no gente que vas conociendo de una en una.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: tu atajo a la vida local",
      descripcion:
        "Para hacer vida en un sitio nuevo necesitas un grupo, no contactos sueltos. La salsa cubana se baila en rueda: un formato que te mete en el grupo entero desde la primera clase, cambiando de pareja al ritmo del cantante. La forma más rápida de pasar de \"recién llegado\" a \"uno más\".",
      porQue: [
        {
          title: "Un grupo entero de golpe",
          text: "La rueda de casino te hace bailar con todos: en una clase conoces a más gente del pueblo que en meses de rutina.",
        },
        {
          title: "Repetición que crea vínculo",
          text: "Mismas caras cada semana: así se pasa de conocidos a amigos, en cualquier ciudad del mundo.",
        },
        {
          title: "Vida social exportable",
          text: "La salsa se baila en cualquier pista: lo que aprendes aquí te sirve en las fiestas de Vilanova y donde vayas.",
        },
      ],
      cta: "Probar salsa cubana",
    },
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
    metaDescription: "¿Acabas de llegar a Vilanova i la Geltrú? La forma más rápida de hacer vida local: una clase de salsa a la semana.",
  },

  "otro-finde-perdido": {
    icp: "social",
    dolor: "otro-finde-perdido",
    headline: "Viernes por la tarde. ¿Otra vez sofá y móvil?",
    subhead:
      "El plan no va a llamar a tu puerta. Pero puede estar ya en tu calendario: una cita semanal que te saca de casa y te devuelve el finde.",
    ctaHero: "Quiero recuperar el finde",
    mensajeWhatsapp: "¡Hola! Vi lo del finde y quiero venir a probar una clase 🙂",
    agitacion: {
      kicker: "Haz la cuenta",
      parrafos: [
        "Un año tiene 52 findes. Piensa en los últimos diez: ¿cuántos recuerdas de verdad? ¿Cuántos se fueron entre el sofá, el scroll y \"mañana hago algo\"?",
        "No es pereza. Es que organizar un plan desde cero cada semana — decidir qué, convencer a quién, reservar dónde — cuesta más energía de la que te queda un viernes. Así que gana el sofá, otra vez.",
        "La solución no es más fuerza de voluntad: es quitarle al plan todo el trabajo. Una cita que ya existe, con gente que ya está allí, donde lo único que tienes que hacer es presentarte.",
      ],
    },
    antesDespues: {
      titulo: "El mismo finde, dos versiones",
      antesLabel: "El finde de ahora",
      antes: [
        "Viernes: demasiado cansado/a para organizar nada.",
        "Sábado: scroll, recados, \"ya si eso la semana que viene\".",
        "Domingo por la tarde: la sensación de que se te ha escapado otro.",
        "Lunes: contar los días para otro finde exactamente igual.",
      ],
      despuesLabel: "El finde con plan",
      despues: [
        "Tu clase ya está en el calendario: no hay nada que decidir ni organizar.",
        "Sales de casa, suena la música y el reset es inmediato.",
        "Los sociales y fiestas de la escuela te llenan el calendario de planes reales.",
        "El domingo por la noche tienes algo que contar — y algo que esperar.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: el plan que se convierte en tu finde",
      descripcion:
        "La bachata es el baile que suena en todas las fiestas y sociales — el más bailado de España. Empezar aquí tiene truco: el básico se aprende en pocas clases, así que en poco tiempo el plan ya no es solo la clase, sino todo lo que se abre después: sociales, fiestas, pistas llenas.",
      porQue: [
        {
          title: "Recompensa rápida",
          text: "El básico de bachata se aprende en pocas clases: en poco tiempo ya puedes salir a bailar de verdad.",
        },
        {
          title: "El finde se multiplica",
          text: "Lo que aprendes entre semana se vive el sábado: la bachata suena en todas las fiestas y sociales.",
        },
        {
          title: "Plan con gente incluida",
          text: "Rotas de pareja en clase y conoces al grupo: el plan del finde viene con compañía de serie.",
        },
      ],
      cta: "Probar bachata",
    },
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
    cierreEmocional: "De los próximos 52 findes, tú decides cuántos se parecen al de esta semana. Empieza por un mensaje.",
    metaTitle: "Recupera tu finde — Bachata en Vilanova",
    metaDescription: "Cambia sofá y móvil por el baile que suena en todas las fiestas. Clase de prueba de bachata en Vilanova.",
  },

  "gym-solitario": {
    icp: "social",
    dolor: "gym-solitario",
    headline: "Del gimnasio en silencio a un grupo que te espera.",
    subhead: "Entrar con los auriculares puestos, sudar y salir sin hablar con nadie. Esto es exactamente lo contrario.",
    ctaHero: "Quiero algo más que el gimnasio",
    mensajeWhatsapp: "¡Hola! Voy al gimnasio pero es muy solitario, ¿cómo es el ambiente en vuestras clases? 🙂",
    agitacion: {
      kicker: "La paradoja del gimnasio",
      parrafos: [
        "Vas a un sitio lleno de gente y no hablas con nadie. Auriculares puestos, mirada al frente, cada uno en su serie. Es el único sitio del mundo donde estar rodeado de personas te deja exactamente igual de solo/a que antes de entrar.",
        "Y lo aceptas porque \"a entrenar se va a entrenar\". Pero el cuerpo no es lo único que necesita ejercicio: la vida social también se atrofia si no se usa.",
        "Existe una manera de entrenar donde hablar con la gente no es una distracción, sino parte del ejercicio. Donde sudas igual — pero sales con el grupo, no con los auriculares.",
      ],
    },
    antesDespues: {
      titulo: "Mismo sudor, distinta vida",
      antesLabel: "Tu entrenamiento ahora",
      antes: [
        "Auriculares, máquinas y cero conversación.",
        "La motivación depende solo de ti — y algunos días no aparece.",
        "Nadie nota si faltas: la máquina no pregunta por ti.",
        "Sales cansado/a, pero igual de solo/a que entraste.",
      ],
      despuesLabel: "Entrenando en la pista",
      despues: [
        "Una hora de cardio real — con música alta y el grupo alrededor.",
        "La clase tira de ti los días que tú no tiras: el grupo engancha.",
        "Si faltas, se nota — y te lo dicen. Eso también es motivación.",
        "Sales sudado/a y con conversación: cuerpo y vida social en la misma hora.",
      ],
    },
    clase: {
      slug: "reggaeton",
      nombre: "Reggaeton",
      titulo: "Reggaeton: el mejor cardio de la semana, en grupo",
      descripcion:
        "Si vienes del gimnasio, esta es tu puerta de entrada natural: una clase entera de reggaeton es un entrenamiento completo — piernas, core y resistencia — con la mejor banda sonora posible. Sin pareja, sin experiencia previa, y con un grupo alrededor que convierte el cardio en fiesta.",
      porQue: [
        {
          title: "Entrenamiento completo",
          text: "Piernas, core y resistencia en una hora que pasa volando. Sudas igual que en el gimnasio — sin mirar el reloj.",
        },
        {
          title: "Cero requisitos",
          text: "Sin pareja, sin experiencia, sin nivel mínimo. Ropa cómoda y ganas: el resto se entrena.",
        },
        {
          title: "La clase donde más se ríe",
          text: "Es la clase con más risas de la escuela: la energía del grupo hace el trabajo que la fuerza de voluntad no puede.",
        },
      ],
      cta: "Probar reggaeton",
    },
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
    metaTitle: "Del gimnasio solitario a una comunidad — Reggaeton en Vilanova",
    metaDescription: "El mejor cardio de la semana, en grupo y con música. Prueba una clase de reggaeton en Vilanova i la Geltrú.",
  },
};

import type { CampanaDolorContent } from "./types";

/**
 * ICP 3 — La pareja (hacer algo juntos).
 * Fuente: analisis-icp-pain-points.md § ICP 3. Ángulo estacional (bodas, verano).
 * Psicología: identidad de pareja ("la pareja que baila") + future pacing + contraste.
 * Los argumentos de clase salen del contenido real de content/modalidades.ts.
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
    agitacion: {
      kicker: "El piloto automático",
      parrafos: [
        "\"¿Qué hacemos este finde?\" — \"No sé, ¿cena?\". La conversación se repite tanto que ya ni os dais cuenta. No es que estéis mal: es que lleváis años sin hacer nada juntos por primera vez.",
        "Y eso importa más de lo que parece. Las parejas no se desgastan por las crisis — se desgastan por la repetición. Cuando todo lo que hacéis juntos ya lo habéis hecho mil veces, no queda nada nuevo que contaros.",
        "Aprender algo desde cero, los dos a la vez, cambia la química: volvéis a veros torpes, a reíros, a celebrar avances. Es lo más parecido a la etapa en que todo era nuevo — con la ventaja de que ahora ya os conocéis.",
      ],
    },
    antesDespues: {
      titulo: "El mismo finde, otra pareja",
      antesLabel: "Vuestros planes ahora",
      antes: [
        "Cena, serie, sofá — el guion se repite cada semana.",
        "Los planes nuevos siempre se posponen \"para cuando se pueda\".",
        "Habláis de logística: casa, trabajo, familia. Poco más.",
        "Sois un buen equipo — pero hace tiempo que no sois cómplices.",
      ],
      despuesLabel: "Con vuestra clase semanal",
      despues: [
        "Una cita fija que no es cena: os movéis, aprendéis, os reís.",
        "Cada semana un paso nuevo — algo que contar que no es del trabajo.",
        "Torpeza compartida al principio, avances celebrados juntos después.",
        "Un proyecto de dos: el primer \"nuevo\" en mucho tiempo.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: el plan que os saca del guion",
      descripcion:
        "Para romper el piloto automático necesitáis algo juguetón, no solemne — y la salsa cubana es exactamente eso: un baile circular, alegre y muy musical donde todo fluye alrededor de tu pareja. Giros, cambios de dirección y mucha conversación entre los dos cuerpos. Imposible bailarla con cara de aburrimiento.",
      porQue: [
        {
          title: "Juguetona por diseño",
          text: "Estilo circular, giros y sorpresa constante: la salsa cubana es conversación entre dos cuerpos, no coreografía seria.",
        },
        {
          title: "Nuevo cada semana",
          text: "Figuras nuevas, música nueva, reto nuevo: el antídoto exacto contra la repetición.",
        },
        {
          title: "Risa garantizada",
          text: "De la torpeza inicial a la primera figura que os sale: pocas cosas unen tanto como reírse aprendiendo.",
        },
      ],
      cta: "Probar salsa en pareja",
    },
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
    metaTitle: "Un plan de pareja distinto — Salsa cubana en Vilanova",
    metaDescription: "Cambiad cena y serie por un plan que os saque del piloto automático. Salsa en pareja en Vilanova i la Geltrú.",
  },

  "boda": {
    icp: "pareja",
    dolor: "boda",
    headline: "Os casáis. Que el primer baile esté a la altura.",
    subhead:
      "Desde cero absoluto y a vuestro ritmo: llegáis al gran día sabiendo qué hacer cuando empiece a sonar vuestra canción.",
    ctaHero: "Queremos aprender para la boda",
    mensajeWhatsapp: "¡Hola! Nos casamos y queremos aprender a bailar para la boda 💃",
    agitacion: {
      kicker: "Visualizad la escena",
      parrafos: [
        "El banquete acaba, las luces bajan, suena vuestra canción y todos os miran. Ahora mismo, esa escena os da más nervios que ilusión — porque el plan actual es \"ya improvisaremos algo\".",
        "Habéis dedicado meses al menú, las flores y la lista de invitados. Y el momento que todo el mundo va a grabar con el móvil — el primer baile — es el único sin preparar.",
        "No hace falta un espectáculo. Hace falta saber qué hacer: una base con la que moveros seguros, mirar el uno al otro en vez de contaros los pies, y disfrutar el momento en vez de sobrevivirlo. Eso se entrena, y cuanto antes empecéis, con más calma llega.",
      ],
    },
    antesDespues: {
      titulo: "El primer baile, con y sin preparación",
      antesLabel: "Si lo dejáis a la improvisación",
      antes: [
        "Nervios crecientes a medida que se acerca la fecha.",
        "Balanceo incómodo contando los segundos para que acabe la canción.",
        "La mirada puesta en los pies — y en la de los invitados.",
        "Un vídeo que preferiréis no volver a ver.",
      ],
      despuesLabel: "Si lo preparáis con tiempo",
      despues: [
        "Una base clara y ensayada: sabéis qué hacer en cada parte de la canción.",
        "Os miráis el uno al otro — los pies ya van solos.",
        "El momento se disfruta: es vuestro, no un trámite.",
        "Y de regalo: sabéis bailar para todas las bodas que vengan después.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: la base perfecta para vuestro primer baile",
      descripcion:
        "Para un primer baile, la bachata es la elección inteligente: básico sencillo de aprender, ritmo pausado, elegancia natural — ese punto en el que dos personas parecen una sola sobre la pista. Y es el baile que más suena en todas las bodas: lo que preparéis para el gran día os servirá el resto de la noche.",
      porQue: [
        {
          title: "Resultados a tiempo",
          text: "El básico se aprende en pocas clases: con margen hasta la fecha, llegáis sobrados al gran día.",
        },
        {
          title: "Elegante sin ser difícil",
          text: "Conexión, pausas y musicalidad: la bachata se ve bonita mucho antes de ser técnicamente compleja.",
        },
        {
          title: "Útil toda la noche",
          text: "Es el baile más demandado en fiestas y bodas: tras el primer baile, seguiréis bailando toda la celebración.",
        },
      ],
      cta: "Empezar a preparar el baile",
    },
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
    metaTitle: "Baile para bodas en pareja — Bachata en Vilanova",
    metaDescription: "Preparad vuestro primer baile desde cero y a vuestro ritmo. Bachata para bodas en Vilanova i la Geltrú.",
  },

  "uno-no-sirve": {
    icp: "pareja",
    dolor: "uno-no-sirve",
    headline: "\"No sirvo para bailar\". Os llevamos a la vez.",
    subhead: "No hace falta que los dos partáis del mismo nivel: os guiamos juntos, sin que nadie se quede atrás.",
    ctaHero: "Queremos probar los dos",
    mensajeWhatsapp:
      "¡Hola! Uno/a de los dos cree que no sirve para bailar, ¿podemos probar una clase igualmente? 🙂",
    agitacion: {
      kicker: "La conversación que ya habéis tenido",
      parrafos: [
        "Uno de los dos quiere. El otro dice \"yo es que no valgo para eso, ve tú\". Y como es un plan de dos, no va ninguno. El plan muere por una creencia que nadie ha comprobado nunca.",
        "Porque eso de \"no servir para bailar\" nunca se ha puesto a prueba de verdad: se decidió en alguna fiesta hace años y desde entonces funciona como veto. Ni clases, ni método, ni una oportunidad real — solo la etiqueta.",
        "El dato que os falta: los profesores llevan toda la vida enseñando precisamente a gente que \"no sirve\". Es su trabajo. El básico está diseñado para el que llega con dos pies izquierdos — el otro, el que ya se defiende, no necesitaba clases para empezar.",
      ],
    },
    antesDespues: {
      titulo: "El veto vs. la prueba",
      antesLabel: "Mientras dure el veto",
      antes: [
        "El plan de bailar juntos lleva años aparcado por la etiqueta de uno.",
        "En las fiestas, uno mira la pista con ganas y el otro con alivio.",
        "\"No sirvo\" se repite tanto que ya parece un hecho médico.",
        "Perdéis un plan de pareja por algo que nunca se ha comprobado.",
      ],
      despuesLabel: "Después de una clase",
      despues: [
        "El básico sale — torpe al principio, como le sale a todo el mundo.",
        "El \"negado\" descubre que era cuestión de método, no de genética.",
        "Avanzáis a la vez: la guía se enseña para los dos lados de la pareja.",
        "El veto se convierte en anécdota que contaréis bailando.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: la favorita de los que dicen \"yo no sé bailar\"",
      descripcion:
        "No es una frase de marketing — es literalmente así: la bachata viene siendo la favorita de quienes llegan convencidos de que no saben bailar. Básico sencillo, ritmo claro y pausado, y guía cómoda para los dos. Si uno de los dos se cree negado, este es el terreno donde antes va a descubrir que no lo es.",
      porQue: [
        {
          title: "Diseñada para el que duda",
          text: "El básico de bachata es de los más accesibles del baile social: la vía rápida para desmontar el \"no sirvo\".",
        },
        {
          title: "Guía para los dos",
          text: "Se enseña a guiar y a seguir con claridad: ninguno depende de que el otro \"tire\" de la pareja.",
        },
        {
          title: "Progreso visible juntos",
          text: "Los avances se notan en pocas clases — y celebrarlos juntos es la mitad de la gracia.",
        },
      ],
      cta: "Probar bachata en pareja",
    },
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
    metaTitle: "\"No sirvo para bailar\" — Bachata en pareja en Vilanova",
    metaDescription: "La bachata es la favorita de los que se creen negados. Probad juntos, desde cero, en Vilanova i la Geltrú.",
  },

  "verguenza-fiestas": {
    icp: "pareja",
    dolor: "verguenza-fiestas",
    headline: "Dejad de quedaros sentados en bodas y fiestas.",
    subhead: "Cuando empiece la música, esta vez no miraréis desde la mesa.",
    ctaHero: "Queremos salir a la pista",
    mensajeWhatsapp:
      "¡Hola! Nos da vergüenza bailar en bodas y fiestas y siempre nos quedamos sentados, ¿nos ayudáis a cambiarlo? 🙂",
    agitacion: {
      kicker: "La escena que se repite",
      parrafos: [
        "Boda de un amigo. Empieza la música, la pista se llena, y vosotros hacéis lo de siempre: \"¿salimos?\" — \"mejor luego\" — y ese luego no llega nunca. Otra fiesta entera de espectadores.",
        "Lo curioso es que ganas no faltan. Lo que falta es una base: dos o tres recursos con los que salir sin sentir que todo el mundo nota que no sabéis. Sin eso, la mesa siempre gana.",
        "La cuenta es simple: bodas, veranos, fiestas mayores, cenas con baile — os quedan decenas de pistas por delante. Podéis mirarlas todas desde la silla, o dedicar unas semanas a aprender lo justo para no volver a sentaros.",
      ],
    },
    antesDespues: {
      titulo: "Las próximas fiestas, desde la mesa o desde la pista",
      antesLabel: "Desde la mesa",
      antes: [
        "\"¿Salimos?\" — \"mejor luego\" — y el luego nunca llega.",
        "Veis bailar a los demás con una mezcla de envidia y alivio.",
        "La vergüenza decide por vosotros en cada celebración.",
        "Sois \"los que no bailan\" — y ya os han dejado de sacar.",
      ],
      despuesLabel: "Desde la pista",
      despues: [
        "Suena bachata y salís sin negociarlo: tenéis base y os sale sola.",
        "Un par de figuras resultonas bastan para defenderse con soltura.",
        "Las fiestas se disfrutan enteras — la mejor parte incluida.",
        "Sois la pareja que se anima: la etiqueta cambia de bando.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: la llave que abre cualquier pista",
      descripcion:
        "Si el objetivo es no volver a quedaros sentados, la elección es fácil: la bachata es el baile que más suena en fiestas, bodas y verbenas — el más bailado de España. Su básico se aprende en pocas clases, y con él ya podéis salir a cualquier pista. Es, literalmente, la llave que las abre todas.",
      porQue: [
        {
          title: "Suena en todas partes",
          text: "Bodas, fiestas, chiringuitos: la bachata es omnipresente. Lo que aprendéis sirve en cada celebración.",
        },
        {
          title: "Base rápida y resultona",
          text: "El básico se aprende en pocas clases, y adaptaros a cualquier pista es parte del entrenamiento.",
        },
        {
          title: "Recursos sociales reales",
          text: "En clase se entrena justo eso: defenderse con cualquier canción y cualquier pareja, sin coreografías rígidas.",
        },
      ],
      cta: "Probar bachata en pareja",
    },
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
    metaTitle: "Dejad de quedaros sentados — Bachata en Vilanova",
    metaDescription: "La bachata suena en todas las fiestas: aprended lo justo para no volver a mirar desde la mesa. Vilanova i la Geltrú.",
  },

  "es-para-nosotros": {
    icp: "pareja",
    dolor: "es-para-nosotros",
    headline: "¿Es esto para nosotros? Sí, y nada técnico.",
    subhead: "No hace falta ser una pareja \"de baile\" ni tomároslo en serio: es un rato juntos, con nivel para empezar de cero.",
    ctaHero: "Queremos ver si es lo nuestro",
    mensajeWhatsapp: "¡Hola! No sabemos si esto es para nosotros, ¿nos contáis cómo son las clases en pareja? 🙂",
    agitacion: {
      kicker: "La imagen que os frena",
      parrafos: [
        "Cuando pensáis en \"clases de baile\" os imagináis academias solemnes, parejas con años de técnica y un profesor corrigiendo posturas con cara seria. Con esa imagen, normal que dudéis: no os veis ahí.",
        "Buena noticia: esa academia no es esta. Aquí la salsa cubana no se estudia — se vive en grupo. Los grupos de cero absoluto están llenos de parejas normales: gente que trabaja, que no ha bailado en su vida y que viene a pasar un buen rato, no a sacarse un título.",
        "La pregunta real no es si esto es para vosotros. Es si os apetece un rato semanal de música y risas juntos. Si la respuesta es sí, ya sois el perfil.",
      ],
    },
    antesDespues: {
      titulo: "La academia que imagináis vs. la escuela que somos",
      antesLabel: "Lo que os imagináis",
      antes: [
        "Ambiente serio, técnico, de examen.",
        "Parejas avanzadas mirando por encima del hombro.",
        "Profesores estrictos corrigiendo cada milímetro.",
        "Un mundo con códigos que no conocéis.",
      ],
      despuesLabel: "Lo que os encontráis",
      despues: [
        "Grupos de cero absoluto donde nadie sabe más que vosotros.",
        "Risas desde el primer básico mal dado — es parte del método.",
        "Profes que celebran avances en vez de cazar errores.",
        "Parejas normales, como vosotros, buscando exactamente lo mismo.",
      ],
    },
    clase: {
      slug: "salsa-cubana",
      nombre: "Salsa cubana",
      titulo: "Salsa cubana: se vive, no se estudia",
      descripcion:
        "Si vuestra duda es que esto sea demasiado serio, la salsa cubana es la respuesta: un baile alegre, juguetón y de grupo que no se estudia — se vive. Energía, giros y mucha risa: la clase entera está diseñada para pasarlo bien desde el primer día, no para formar bailarines de competición.",
      porQue: [
        {
          title: "Cero solemnidad",
          text: "Alegre y juguetona por naturaleza: la salsa cubana es fiesta con estructura, no examen con música.",
        },
        {
          title: "Desde cero real",
          text: "El paso básico y la guía se aprenden sin experiencia previa: los grupos de inicio empiezan de verdad desde cero.",
        },
        {
          title: "Ambiente de grupo",
          text: "La rueda de casino mezcla a todo el grupo: risas colectivas y cero sensación de estar siendo evaluados.",
        },
      ],
      cta: "Probar una clase juntos",
    },
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
    metaTitle: "¿Bailar en pareja es para nosotros? — Salsa en Vilanova",
    metaDescription: "Nada técnico ni solemne: salsa cubana desde cero para parejas normales. Clase de prueba en Vilanova i la Geltrú.",
  },

  "dos-agendas": {
    icp: "pareja",
    dolor: "dos-agendas",
    headline: "Dos agendas distintas, un plan que sí encaja.",
    subhead: "Una cita semanal fija que solo tenéis que cuadrar una vez: el resto lo organizamos nosotros.",
    ctaHero: "Queremos encontrar el hueco",
    mensajeWhatsapp: "¡Hola! Nos cuesta encajar planes por las agendas, ¿nos contáis qué horarios tenéis disponibles? 🙂",
    agitacion: {
      kicker: "La logística os está ganando",
      parrafos: [
        "Turnos, reuniones que se alargan, semanas que no se parecen entre sí. Cada plan juntos requiere una negociación de calendarios que agota antes de empezar — así que muchos planes ni se intentan.",
        "Pero fijaos en un detalle: lo que sí se sostiene en vuestra vida son las citas fijas. El gimnasio que va uno, la cena mensual con amigos, la visita a la familia. Lo recurrente sobrevive; lo improvisado muere en el chat.",
        "La solución no es tener más tiempo — es convertir el plan de pareja en cita fija. Una hora, un día, cuadrada una sola vez con vuestras dos agendas delante. A partir de ahí, ya no se negocia: se va.",
      ],
    },
    antesDespues: {
      titulo: "El plan improvisado vs. la cita fija",
      antesLabel: "Improvisando cada semana",
      antes: [
        "Cada plan exige negociar calendarios desde cero.",
        "\"¿Cuándo te va bien?\" — y la conversación muere ahí.",
        "Los planes de pareja pierden siempre contra las obligaciones.",
        "Acabáis el mes sin un solo rato juntos de calidad.",
      ],
      despuesLabel: "Con la cita fija",
      despues: [
        "Se cuadra una vez — con vuestra disponibilidad real — y queda fija.",
        "El hueco ya existe: no hay nada que negociar cada semana.",
        "Una hora protegida que las obligaciones no pueden invadir.",
        "El plan de pareja deja de competir: ya tiene su sitio.",
      ],
    },
    clase: {
      slug: "bachata",
      nombre: "Bachata",
      titulo: "Bachata: máximo avance por hora invertida",
      descripcion:
        "Con agendas apretadas, cada hora cuenta — y la bachata es el baile que más rinde por clase: su básico se aprende rápido y el progreso se nota en pocas semanas. Una sola cita semanal, cuadrada a vuestra disponibilidad real, y en poco tiempo estáis bailando de verdad. Eficiencia hasta en esto.",
      porQue: [
        {
          title: "Progreso por hora imbatible",
          text: "El básico se aprende en pocas clases: ideal cuando el tiempo juntos es un recurso escaso.",
        },
        {
          title: "Una sola cita que cuadrar",
          text: "Nos contáis vuestra disponibilidad y os proponemos el grupo que encaja con las dos agendas.",
        },
        {
          title: "Rendimiento fuera de clase",
          text: "Lo aprendido sirve en cada boda, fiesta o viaje: una hora semanal que os equipa para todas las demás.",
        },
      ],
      cta: "Cuadrar nuestro horario",
    },
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
    metaTitle: "Un plan de pareja que encaja en dos agendas — Vilanova",
    metaDescription: "Una cita fija cuadrada a vuestra disponibilidad real. Bachata en pareja en Vilanova i la Geltrú.",
  },
};

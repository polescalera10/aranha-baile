/**
 * Contenido editorial de cada disciplina — /clases/[modalidad].
 *
 * Los datos "vivos" (nombre, descripción corta, orden, activo) salen de la
 * tabla `modalidades` de Supabase (con fallback en content/landing.ts).
 * Este archivo aporta el contenido largo de cada página: qué es, qué se
 * aprende, qué te llevas y para quién es.
 *
 * Si mañana se añade una disciplina nueva en la BD sin entrada aquí, la
 * página se renderiza igualmente con el layout genérico (sin secciones ricas).
 *
 * Regla de honestidad: nada de datos inventados (horarios, profesores,
 * años de experiencia). Solo se describe la disciplina y sus beneficios.
 */

export type ModalidadContenido = {
  /** Intro de cabecera de la página (sustituye a la descripción corta). */
  lead: string;
  /** Título de la primera sección, con el artículo correcto ("¿Qué es el reparto?"). */
  queEsTitle: string;
  /** "¿Qué es?" — párrafos descriptivos. */
  queEs: string[];
  /** "En clase aprenderás" — lista de contenidos. */
  aprenderas: string[];
  /** "Qué te llevas" — beneficios con título y texto. */
  beneficios: { title: string; text: string }[];
  /** Cierre persuasivo: para quién es y por qué apuntarse. */
  paraTi: string;
};

export const modalidadesContenido: Record<string, ModalidadContenido> = {
  "salsa-cubana": {
    lead:
      "El baile social por excelencia: son, sabor y rueda de casino. La salsa cubana no se estudia, se vive en grupo — y engancha desde la primera clase.",
    queEsTitle: "¿Qué es la salsa cubana?",
    queEs: [
      "La salsa cubana (o casino) nace en La Habana y se baila en pareja, con un estilo circular, juguetón y muy musical. A diferencia de otros estilos de salsa más lineales, aquí todo fluye alrededor de tu pareja: giros, cambios de dirección y mucha conversación entre los dos cuerpos.",
      "Su formato más famoso es la rueda de casino: varias parejas bailan en círculo, un cantante va marcando las figuras y todo el mundo cambia de pareja al ritmo de la música. Es pura energía colectiva — imposible salir de una rueda sin sonreír.",
    ],
    aprenderas: [
      "El paso básico y la guía en pareja desde cero, sin necesidad de experiencia previa.",
      "Las figuras clásicas del casino: dile que no, setenta, enchufla y sus variantes.",
      "Rueda de casino: bailar en grupo, escuchar al cantante y cambiar de pareja con soltura.",
      "Musicalidad: entender la clave, el son y la timba para bailar con la música, no encima de ella.",
      "Recursos de improvisación para defenderte en cualquier fiesta o social.",
    ],
    beneficios: [
      {
        title: "Vida social real",
        text: "Es el baile más social que existe: rotas de pareja en cada clase, conoces a todo el grupo y las fiestas se convierten en tu plan de finde.",
      },
      {
        title: "Coordinación y memoria",
        text: "Guiar o seguir figuras trabaja la coordinación, el oído musical y la memoria — un entrenamiento completo que no parece entrenamiento.",
      },
      {
        title: "Confianza que se nota",
        text: "Sacar a alguien a bailar (o dejarte llevar) delante de gente cambia cómo te plantas en cualquier situación, dentro y fuera de la pista.",
      },
    ],
    paraTi:
      "Si quieres un baile alegre, de grupo, con el que puedas salir a cualquier pista del mundo y encontrar gente con quien bailar, la salsa cubana es tu puerta de entrada. No necesitas pareja ni experiencia: solo ganas de pasarlo bien. El resto lo ponemos nosotros.",
  },

  bachata: {
    lead:
      "Conexión, musicalidad y cero prisa. La bachata es el baile de pareja que engancha desde el primer día — y el que más suena en todas las fiestas.",
    queEsTitle: "¿Qué es la bachata?",
    queEs: [
      "La bachata nace en República Dominicana y hoy es el baile social más bailado en España. Se baila en pareja, con un básico sencillo de aprender y un techo altísimo: de los primeros pasos a los estilos más modernos hay todo un mundo de musicalidad, ondas y juego.",
      "Trabajamos desde la base dominicana hasta los recursos de la bachata moderna y sensual: conexión con la pareja, interpretación de la música y ese punto de elegancia que hace que dos personas parezcan una sola sobre la pista.",
    ],
    aprenderas: [
      "El paso básico y la conexión en pareja desde el primer día.",
      "Figuras y giros con guía clara, cómodos para los dos.",
      "Musicalidad: interpretar la guitarra, el bongó y las pausas de cada canción.",
      "Ondas, aislamientos y estilo propio para no bailar en modo automático.",
      "Recursos sociales: adaptarte a cualquier pareja en cualquier fiesta.",
    ],
    beneficios: [
      {
        title: "Resultados rápidos",
        text: "El básico se aprende en pocas clases: en poco tiempo ya puedes salir a bailar de verdad. Pocas cosas motivan tanto como progresar rápido.",
      },
      {
        title: "Conexión de verdad",
        text: "La bachata enseña a escuchar al otro sin hablar: guía, respuesta y confianza. Una habilidad que se queda contigo fuera de la pista.",
      },
      {
        title: "El baile más demandado",
        text: "Suena en todas las fiestas, bodas y sociales. Saber bachata es la llave que abre cualquier pista.",
      },
    ],
    paraTi:
      "Si buscas un baile de pareja elegante, cercano y con progresión rápida — o si la salsa te impone y quieres empezar por algo más pausado — la bachata es el punto de partida perfecto. Ven a probar una clase: viene siendo la favorita de los que dicen «yo no sé bailar».",
  },

  reparto: {
    lead:
      "El sonido de las calles de La Habana. El reparto es el género urbano cubano del momento: actitud, flow y un estilo que no se parece a nada.",
    queEsTitle: "¿Qué es el reparto?",
    queEs: [
      "El reparto es el género urbano que domina Cuba hoy: nace en los barrios (los «repartos») de La Habana, hereda del reggaetón cubano y de la timba, y tiene un lenguaje corporal propio — pasos marcados, disociación, actitud y mucha improvisación.",
      "Se baila individual, sin pareja, y es pura expresión: cada canción tiene sus pasos, sus gestos y su código. En clase desmontamos ese lenguaje paso a paso para que lo hagas tuyo, aunque nunca hayas bailado nada urbano.",
    ],
    aprenderas: [
      "Los pasos y códigos del reparto actual, explicados desde cero.",
      "Disociación corporal: mover pecho, cadera y brazos de forma independiente.",
      "Flow y actitud: bailar suelto, con intención, sin parecer coreografía de academia.",
      "Musicalidad urbana: acentos, cortes y cómo jugar con ellos.",
      "Improvisación: recursos para defenderte con cualquier tema, no solo el de clase.",
    ],
    beneficios: [
      {
        title: "Cardio disfrazado de fiesta",
        text: "Es de las clases más físicas de la escuela: sudas, quemas y entrenas todo el cuerpo sin mirar el reloj ni una vez.",
      },
      {
        title: "Suelta el cuerpo",
        text: "La disociación y la improvisación desbloquean tu forma de moverte. Se nota después en cualquier otro estilo que bailes.",
      },
      {
        title: "Un estilo que pocos tienen",
        text: "Fuera de Cuba casi nadie lo enseña bien. Dominar reparto te da un sello propio en cualquier pista.",
      },
    ],
    paraTi:
      "Si te va lo urbano, quieres bailar sin pareja y buscas algo con más calle que una coreografía comercial, el reparto es tu clase. No hace falta nivel previo: hace falta actitud, y eso se entrena aquí.",
  },

  reggaeton: {
    lead:
      "La música que ya te sabes, bailada con técnica y actitud. Reggaeton es la clase donde sudar, soltarte y pasarlo en grande — sin pareja y sin complejos.",
    queEsTitle: "¿Qué es el reggaeton?",
    queEs: [
      "Todos hemos bailado reggaeton en una fiesta. La diferencia entre «moverse» y bailar de verdad está en la técnica: control de cadera, disociación, actitud y saber qué hacer con cada parte del cuerpo en cada acento de la música.",
      "En clase trabajamos coreografías y pasos base sobre los temas del momento, con progresión real: primero el movimiento, luego el estilo, y al final ese punto de seguridad que hace que cualquier paso se vea bien.",
    ],
    aprenderas: [
      "Pasos base del reggaeton y cómo encadenarlos con naturalidad.",
      "Técnica de cadera y perreo con control (y sin lesiones).",
      "Disociación: que cada parte del cuerpo vaya a lo suyo.",
      "Coreografías completas sobre los temas que suenan ahora mismo.",
      "Actitud escénica: bailar para ti, no para aprobar un examen.",
    ],
    beneficios: [
      {
        title: "El mejor cardio de la semana",
        text: "Una clase entera de reggaeton es un entrenamiento completo: piernas, core y resistencia — con la mejor banda sonora posible.",
      },
      {
        title: "Confianza inmediata",
        text: "Es el estilo con la recompensa más rápida: en cuanto dominas dos o tres pasos, la próxima fiesta es otra historia.",
      },
      {
        title: "Cero requisitos",
        text: "Sin pareja, sin experiencia, sin edad «correcta». Solo ropa cómoda y ganas de soltarte.",
      },
    ],
    paraTi:
      "Si quieres una clase para desconectar, sudar y salir con una sonrisa — y de paso dejar de bailar siempre los mismos dos pasos en las fiestas — apúntate a reggaeton. Es la clase donde más se ríe de toda la escuela.",
  },

  "lady-style": {
    lead:
      "Técnica, presencia y estilo propio. Lady Style es la clase donde puedes trabajar tu forma de bailar — brazos, caderas, giros y esa seguridad que se ve desde lejos.",
    queEsTitle: "¿Qué es Lady Style?",
    queEs: [
      "Lady Style es una clase de técnica y estilo individual: se trabaja sin pareja, frente al espejo, puliendo todo lo que hace que un baile se vea bonito — la postura, las líneas de brazos, el movimiento de cadera, los giros y la actitud.",
      "Todo lo que entrenas aquí se traslada directo a la salsa, la bachata o cualquier otro estilo que bailes: es la clase que hace que lo demás suba de nivel. Y también funciona sola, como espacio para ganar soltura, presencia y confianza con tu propio cuerpo.",
    ],
    aprenderas: [
      "Postura y líneas: cómo colocarte para que cada movimiento se vea limpio.",
      "Técnica de brazos y manos: el detalle que distingue a quien baila bien.",
      "Movimiento de cadera y ondas con control.",
      "Técnica de giros: preparación, spot y equilibrio.",
      "Presencia y actitud: bailar ocupando tu espacio, sin pedir permiso.",
    ],
    beneficios: [
      {
        title: "Multiplica tus otros bailes",
        text: "Cada hora de técnica se nota después en la pista: tu salsa y tu bachata cambian de categoría cuando el estilo lo pones tú.",
      },
      {
        title: "Postura y control corporal",
        text: "Trabajas core, equilibrio y conciencia corporal. Caminas distinto al salir de clase — literalmente.",
      },
      {
        title: "Seguridad que se queda",
        text: "Mirarte al espejo y gustarte bailando hace más por la autoestima que muchos discursos. Aquí se entrena eso.",
      },
    ],
    paraTi:
      "Si ya bailas en pareja y quieres pulir tu estilo, o si prefieres empezar trabajando tu propio movimiento antes de lanzarte al baile social, Lady Style es tu clase. Ven como eres: la elegancia no se trae de casa, se entrena.",
  },

  heels: {
    lead:
      "Potencia, líneas y mucha actitud — sobre tacones o sin ellos. Heels es la clase donde la elegancia y la fuerza dejan de ser opuestos.",
    queEsTitle: "¿Qué es Heels?",
    queEs: [
      "Heels es un estilo de danza urbana que se baila (cuando quieras) sobre tacones: combina técnica de danza, trabajo de líneas, coreografía y una actitud escénica potente. Nació en los estudios de Los Ángeles y hoy llena clases en todo el mundo.",
      "No hace falta empezar con tacones: la técnica se construye primero descalza o con zapatillas, y los tacones llegan cuando tú estés lista. Lo importante no es el zapato — es la seguridad con la que lo pisas.",
    ],
    aprenderas: [
      "Técnica base sobre tacones: equilibrio, pisada segura y transiciones.",
      "Líneas y extensiones: sacar el máximo partido a cada movimiento.",
      "Coreografías con carácter, del detalle suave al golpe de actitud.",
      "Trabajo de suelo y niveles, adaptado a tu punto de partida.",
      "Presencia escénica: sostener una mirada, un silencio y un escenario.",
    ],
    beneficios: [
      {
        title: "Fuerza y equilibrio reales",
        text: "Bailar sobre tacones entrena piernas, core y estabilidad como pocas disciplinas. La elegancia, por debajo, es pura fuerza.",
      },
      {
        title: "Empoderamiento sin postureo",
        text: "Heels es un espacio para ocupar el escenario sin pedir perdón. La actitud que se entrena aquí se viene contigo a la calle.",
      },
      {
        title: "Expresión sin límites",
        text: "Es la clase más libre de la escuela: cada persona encuentra su versión del estilo. No hay un molde — hay un espejo.",
      },
    ],
    paraTi:
      "Si buscas una clase que combine técnica de danza, actitud y un chute de confianza — y te apetece un reto diferente a todo lo demás — Heels te está esperando. Con tacones o sin ellos: la energía es la misma y la puerta está abierta.",
  },
};

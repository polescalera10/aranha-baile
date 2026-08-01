/**
 * HORARIO CURSO REGULAR — temporada 26·27 (NEXUS VNG, Vilanova i la Geltrú).
 * Fuente: cartel oficial "Horario de baile 26·27".
 *
 * Rejilla por franja horaria × día (Lunes → Viernes). Cada celda es una clase
 * o `null` (hueco). El color es semántico por familia de estilo, siempre vía
 * token de marca (nada de colores sueltos).
 *
 * IMPORTANTE (28-07 → 01-08-2026): las opciones del formulario de inscripción
 * se derivan por SESIÓN (estilo + día + hora), no por estilo. Antes, un lead
 * que marcaba "Salsa" no decía ni el día ni el nivel — y hay tres salsas y
 * cuatro bachatas repartidas por la semana. Ahora cada casilla identifica una
 * clase concreta y el valor que viaja al CRM ya es legible ("Salsa 1 ·
 * Miércoles 20:30"), sin necesidad de tabla de traducción.
 */

export type Familia = "salsa" | "bachata" | "urbano";

export type ClaseRegular = {
  estilo: string; // "Salsa 1"
  profes: string; // "Ana y Pol"
  familia: Familia;
  /**
   * Nivel legible del grupo. Si se omite, se deriva del número del estilo
   * (0 = desde cero, 1 = iniciación, 2 = intermedio). Los estilos sin número
   * no muestran nivel: no inventamos requisitos que no están en el cartel.
   */
  nivel?: string;
};

export type FranjaHoraria = {
  hora: string; // "18:30"
  /** Una entrada por día (Lun, Mar, Mié, Jue, Vie). `null` = hueco. */
  clases: (ClaseRegular | null)[];
};

export const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

/** Texto de color por familia (token de marca). */
export const familiaColor: Record<Familia, string> = {
  salsa: "text-neon",
  bachata: "text-neon-mint",
  urbano: "text-neon-lime",
};

export const horarioRegular: FranjaHoraria[] = [
  {
    hora: "18:30",
    clases: [
      { estilo: "Bachata 1", profes: "Martina y Davide", familia: "bachata" },
      null,
      { estilo: "Reggaetón", profes: "Ana Aylén", familia: "urbano" },
      null,
      null,
    ],
  },
  {
    hora: "19:30",
    clases: [
      { estilo: "Bachata 2", profes: "Martina y Davide", familia: "bachata" },
      null,
      { estilo: "Reparto", profes: "Ana Aylén", familia: "urbano" },
      null,
      { estilo: "Lady Salsa", profes: "Ana Aylén", familia: "salsa" },
    ],
  },
  {
    hora: "20:30",
    clases: [
      { estilo: "Bachata Lady", profes: "Martina", familia: "bachata" },
      { estilo: "Heels", profes: "Yuri", familia: "urbano" },
      { estilo: "Salsa 1", profes: "Ana y Pol", familia: "salsa" },
      { estilo: "Salsa 0", profes: "Martina y Pol", familia: "salsa" },
      { estilo: "Salsa 2", profes: "Ana y Pol", familia: "salsa" },
    ],
  },
  {
    hora: "21:30",
    clases: [
      { estilo: "Cía Lady Bachata", profes: "Martina", familia: "bachata" },
      { estilo: "Sexy Style", profes: "Yuri", familia: "urbano" },
      { estilo: "Bachata 1", profes: "Ana y Pol", familia: "bachata" },
      { estilo: "Bachata 0", profes: "Martina y Pol", familia: "bachata" },
      { estilo: "Cía Salsa", profes: "Ana Aylén", familia: "salsa" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Derivados para el formulario de inscripción
 * ------------------------------------------------------------------ */

/** Una clase concreta de la semana, ya aplanada (estilo + día + hora). */
export type SesionRegular = ClaseRegular & {
  dia: string; // "Miércoles"
  hora: string; // "20:30"
  /** Identificador legible que se guarda en `leads.intereses` y viaja a n8n. */
  value: string; // "Salsa 1 · Miércoles 20:30"
};

/** Nivel derivado del número del estilo. Sin número → sin nivel. */
function nivelDe(estilo: string): string | undefined {
  if (/\b0$/.test(estilo)) return "Desde cero";
  if (/\b1$/.test(estilo)) return "Iniciación";
  if (/\b2$/.test(estilo)) return "Intermedio";
  return undefined;
}

/** Todas las clases de la semana en orden de día y hora. */
export const sesionesRegulares: SesionRegular[] = diasSemana.flatMap((dia, diaIdx) =>
  horarioRegular.reduce<SesionRegular[]>((acc, franja) => {
    const clase = franja.clases[diaIdx];
    if (clase) {
      acc.push({
        ...clase,
        nivel: clase.nivel ?? nivelDe(clase.estilo),
        dia,
        hora: franja.hora,
        value: `${clase.estilo} · ${dia} ${franja.hora}`,
      });
    }
    return acc;
  }, []),
);

const FAMILIA_LABEL: Record<Familia, string> = {
  salsa: "Salsa y estilos de salsa",
  bachata: "Bachata y estilos de bachata",
  urbano: "Urbano y estilo",
};

/** Etiqueta de la opción "aún no sé mi nivel" de cada familia. */
const SIN_NIVEL_LABEL: Record<Familia, string> = {
  salsa: "Salsa · aún no sé mi nivel",
  bachata: "Bachata · aún no sé mi nivel",
  urbano: "Urbano · no sé cuál elegir",
};

/**
 * Opciones del formulario del curso regular: una casilla por CLASE real,
 * agrupadas por familia y ordenadas por día y hora. Cada grupo cierra con una
 * salida honesta ("aún no sé mi nivel") para que nadie abandone el formulario
 * por no saber dónde encaja — seguimos sabiendo la familia y el día lo
 * cerramos por WhatsApp.
 */
export const cursoRegularGrupos = (["salsa", "bachata", "urbano"] as Familia[]).map((familia) => ({
  label: FAMILIA_LABEL[familia],
  options: [
    ...sesionesRegulares
      .filter((s) => s.familia === familia)
      .map((s) => ({
        value: s.value,
        label: s.estilo,
        meta: `${s.dia} · ${s.hora}`,
        hint: [s.nivel, s.profes].filter(Boolean).join(" · "),
      })),
    {
      value: SIN_NIVEL_LABEL[familia],
      label: "Aún no sé mi nivel",
      meta: "Nos lo dices y te ubicamos",
      hint: "Te llamamos y elegimos el grupo contigo",
    },
  ],
}));

/**
 * HORARIO CURSO REGULAR — temporada 26·27 (NEXUS VNG, Vilanova i la Geltrú).
 * Fuente: cartel oficial "Horario de baile 26·27".
 *
 * Rejilla por franja horaria × día (Lunes → Viernes). Cada celda es una clase
 * o `null` (hueco). El color es semántico por familia de estilo, siempre vía
 * token de marca (nada de colores sueltos).
 */

export type Familia = "salsa" | "bachata" | "urbano";

export type ClaseRegular = {
  estilo: string; // "Salsa 1"
  profes: string; // "Ana y Pol"
  familia: Familia;
  /** Etiqueta de interés para el formulario (por estilo, no por sesión). */
  interes: string;
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
      { estilo: "Bachata 1", profes: "Martina y Davide", familia: "bachata", interes: "bachata" },
      null,
      { estilo: "Reggaetón", profes: "Ana Aylén", familia: "urbano", interes: "reggaeton" },
      null,
      null,
    ],
  },
  {
    hora: "19:30",
    clases: [
      { estilo: "Bachata 2", profes: "Martina y Davide", familia: "bachata", interes: "bachata" },
      null,
      { estilo: "Reparto", profes: "Ana Aylén", familia: "urbano", interes: "reparto" },
      null,
      { estilo: "Lady Salsa", profes: "Ana Aylén", familia: "salsa", interes: "lady-salsa" },
    ],
  },
  {
    hora: "20:30",
    clases: [
      { estilo: "Bachata Lady", profes: "Martina", familia: "bachata", interes: "bachata-lady" },
      { estilo: "Heels", profes: "Yuri", familia: "urbano", interes: "heels" },
      { estilo: "Salsa 1", profes: "Ana y Pol", familia: "salsa", interes: "salsa" },
      { estilo: "Salsa 0", profes: "Martina y Pol", familia: "salsa", interes: "salsa" },
      { estilo: "Salsa 2", profes: "Ana y Pol", familia: "salsa", interes: "salsa" },
    ],
  },
  {
    hora: "21:30",
    clases: [
      { estilo: "Cía Lady Bachata", profes: "Martina", familia: "bachata", interes: "cia-lady-bachata" },
      { estilo: "Sexy Style", profes: "Yuri", familia: "urbano", interes: "sexy-style" },
      { estilo: "Bachata 1", profes: "Ana y Pol", familia: "bachata", interes: "bachata" },
      { estilo: "Bachata 0", profes: "Martina y Pol", familia: "bachata", interes: "bachata" },
      { estilo: "Cía Salsa", profes: "Ana Aylén", familia: "salsa", interes: "cia-salsa" },
    ],
  },
];

/**
 * Opciones de interés para el formulario del curso regular (estilos únicos,
 * agrupados por familia). Se derivan del horario para no duplicar la verdad.
 */
const INTERES_LABELS: Record<string, string> = {
  salsa: "Salsa",
  "lady-salsa": "Lady Salsa",
  "cia-salsa": "Compañía Salsa",
  bachata: "Bachata",
  "bachata-lady": "Bachata Lady",
  "cia-lady-bachata": "Compañía Lady Bachata",
  reggaeton: "Reggaetón",
  reparto: "Reparto",
  heels: "Heels",
  "sexy-style": "Sexy Style",
};

const FAMILIA_LABEL: Record<Familia, string> = {
  salsa: "Salsa y estilos de salsa",
  bachata: "Bachata y estilos de bachata",
  urbano: "Urbano y estilo",
};

function opcionesPorFamilia(familia: Familia) {
  const vistos = new Set<string>();
  const opts: { value: string; label: string }[] = [];
  for (const franja of horarioRegular) {
    for (const clase of franja.clases) {
      if (clase && clase.familia === familia && !vistos.has(clase.interes)) {
        vistos.add(clase.interes);
        opts.push({ value: clase.interes, label: INTERES_LABELS[clase.interes] ?? clase.estilo });
      }
    }
  }
  return opts;
}

export const cursoRegularGrupos = (["salsa", "bachata", "urbano"] as Familia[]).map((familia) => ({
  label: FAMILIA_LABEL[familia],
  options: opcionesPorFamilia(familia),
}));

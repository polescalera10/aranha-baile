/**
 * Helpers de formato compartidos por el panel interno.
 * Convención weekday: 1=Lunes … 7=Domingo (heredada de la tabla `clases`).
 */

export const WEEKDAYS: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export const WEEKDAYS_SHORT: Record<number, string> = {
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
  7: "Dom",
};

/** "20:00:00" → "20:00" */
export function formatTime(time: string): string {
  return time.slice(0, 5);
}

/** ISO date → "17 jul 2026" */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Etiquetas de UI para enums del panel. */
export const DANCE_ROLE_LABELS: Record<string, string> = {
  leader: "Leader",
  follower: "Follower",
  both: "Ambos",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  al_dia: "Al día",
  pendiente: "Pendiente",
};

export const ENROLLMENT_STATUS_LABELS: Record<string, string> = {
  activa: "Activa",
  pausada: "Pausada",
  baja: "Baja",
  lista_espera: "Lista de espera",
};

export const SESSION_STATUS_LABELS: Record<string, string> = {
  programada: "Programada",
  impartida: "Impartida",
  cancelada: "Cancelada",
};

export const CYCLE_TYPE_LABELS: Record<string, string> = {
  curso: "Curso (ciclo cerrado)",
  suelta: "Clase suelta",
};

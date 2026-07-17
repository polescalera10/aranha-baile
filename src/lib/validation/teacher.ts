import { z } from "zod";

/**
 * Validación del formulario de profesor (alta/edición).
 * `weekly_availability` se serializa al jsonb {"mon":[{"start","end"}],...}
 * con claves mon..sun y omitiendo los días sin bloques.
 */

export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

/** Clave jsonb → nº de weekday (convención 1=Lun … 7=Dom de `lib/format.ts`). */
export const DAY_TO_WEEKDAY: Record<DayKey, number> = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
};

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;

export const availabilityBlockSchema = z
  .object({
    start: z.string().regex(HHMM, "Hora no válida (HH:MM)"),
    end: z.string().regex(HHMM, "Hora no válida (HH:MM)"),
  })
  .refine((b) => b.start < b.end, {
    message: "La hora de inicio debe ser anterior a la de fin",
  });

export const teacherSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Dinos el nombre del profesor")
    .max(120, "Nombre demasiado largo"),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{6,14}$/, "Teléfono en formato E.164 (p. ej. +34600111222)")
    .optional()
    .or(z.literal("")),
  /** Slugs de `modalidades` activas. */
  disciplines: z.array(z.string().trim().min(1)).default([]),
  /** Solo llegan claves mon..sun (las construye la Server Action). */
  weekly_availability: z.record(z.string(), z.array(availabilityBlockSchema)),
  active: z.boolean(),
  profile_id: z.string().uuid("Perfil no válido").nullable(),
});

export type TeacherInput = z.infer<typeof teacherSchema>;

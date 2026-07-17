import { z } from "zod";
import type { DanceRole, PaymentStatus } from "@/types/database";

/** Valores válidos de los enums del alumno (fuente: types/database.ts). */
export const danceRoles = ["leader", "follower", "both"] as const satisfies readonly DanceRole[];
export const paymentStatuses = ["al_dia", "pendiente"] as const satisfies readonly PaymentStatus[];

/** Teléfono en formato E.164, p. ej. +34600000000. */
export const E164_REGEX = /^\+[1-9]\d{7,14}$/;

export const studentSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Dinos el nombre del alumno")
    .max(120, "Nombre demasiado largo"),
  phone: z
    .string()
    .trim()
    .regex(E164_REGEX, "Formato internacional, p. ej. +34600000000"),
  email: z
    .string()
    .trim()
    .email("Email no válido")
    .optional()
    .or(z.literal("")),
  dance_role: z.enum(danceRoles, {
    errorMap: () => ({ message: "Elige un rol de baile" }),
  }),
  nivel_id: z.string().uuid("Nivel no válido").optional().or(z.literal("")),
  partner_id: z.string().uuid("Pareja no válida").optional().or(z.literal("")),
  payment_status: z.enum(paymentStatuses, {
    errorMap: () => ({ message: "Elige el estado de la cuota" }),
  }),
  is_founding_member: z.boolean(),
  notes: z.string().trim().max(2000, "Notas demasiado largas").optional().or(z.literal("")),
  active: z.boolean(),
});

export type StudentInput = z.infer<typeof studentSchema>;

/** Notas editables desde la ficha del profesor. */
export const studentNotesSchema = z.object({
  student_id: z.string().uuid("Alumno no válido"),
  notes: z.string().trim().max(2000, "Notas demasiado largas").optional().or(z.literal("")),
});

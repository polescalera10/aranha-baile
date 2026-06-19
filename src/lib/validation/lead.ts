import { z } from "zod";

/** Orígenes válidos de un lead (coinciden con los CTA/bloques de la web). */
export const leadOrigenes = [
  "clase-prueba",
  "founding",
  "contacto",
  "modalidad",
] as const;

export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Dinos tu nombre")
    .max(120, "Nombre demasiado largo"),
  telefono: z
    .string()
    .trim()
    .min(6, "Teléfono no válido")
    .max(20, "Teléfono no válido")
    .regex(/^[+0-9\s().-]+$/, "El teléfono solo puede tener números y símbolos"),
  email: z
    .string()
    .trim()
    .email("Email no válido")
    .optional()
    .or(z.literal("")),
  modalidad_interes: z.string().trim().max(80).optional().or(z.literal("")),
  origen: z.enum(leadOrigenes),
  mensaje: z.string().trim().max(1000, "Mensaje demasiado largo").optional().or(z.literal("")),
  // Honeypot anti-spam: debe llegar vacío.
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

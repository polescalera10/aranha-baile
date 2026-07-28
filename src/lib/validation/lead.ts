import { z } from "zod";

/** Orígenes válidos de un lead (coinciden con los CTA/bloques de la web). */
export const leadOrigenes = [
  "clase-prueba",
  "founding",
  "contacto",
  "modalidad",
  "campana",
  "intensivos",
  "curso-regular",
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

/**
 * Formulario de INTENSIVOS y CURSO REGULAR (páginas de ventas con captación
 * por intereses). A diferencia del lead genérico:
 *   · email OBLIGATORIO (canal de seguimiento por interés),
 *   · `intereses`: al menos una etiqueta marcada (estilos/sesiones),
 *   · `consentimiento`: casilla RGPD obligatoria (LSSI-CE / RGPD).
 */
export const interestLeadSchema = z.object({
  nombre: z.string().trim().min(2, "Dinos tu nombre completo").max(120, "Nombre demasiado largo"),
  telefono: z
    .string()
    .trim()
    .min(6, "Teléfono no válido")
    .max(20, "Teléfono no válido")
    .regex(/^[+0-9\s().-]+$/, "El teléfono solo puede tener números y símbolos"),
  email: z.string().trim().min(1, "Necesitamos tu email").email("Email no válido").max(254),
  origen: z.enum(["intensivos", "curso-regular"]),
  intereses: z
    .array(z.string().trim().min(1).max(80))
    .min(1, "Marca al menos una opción que te interese")
    .max(50, "Demasiadas opciones marcadas"),
  consentimiento: z.literal("on", {
    errorMap: () => ({ message: "Debes aceptar el tratamiento de datos para continuar" }),
  }),
  // Honeypot anti-spam: debe llegar vacío.
  website: z.string().max(0).optional(),
});

export type InterestLeadInput = z.infer<typeof interestLeadSchema>;

/** Estados del embudo de un lead (enum `lead_estado` en Postgres). */
export const leadEstados = [
  "nuevo",
  "contactado",
  "prueba_agendada",
  "convertido",
  "descartado",
] as const;

export const leadEstadoSchema = z.enum(leadEstados);

import { z } from "zod";

/**
 * Validación de matrícula de alumno en curso (panel admin).
 * El control de aforo por rol vive en la Server Action, no aquí.
 */

export const enrollmentSchema = z.object({
  course_id: z.string().uuid("Curso no válido"),
  student_id: z.string().uuid("Elige un alumno"),
  role_in_course: z.enum(["leader", "follower"], {
    errorMap: () => ({ message: "Elige el rol en el curso" }),
  }),
  /** true → el admin ha confirmado la entrada en lista de espera. */
  to_waitlist: z.boolean(),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

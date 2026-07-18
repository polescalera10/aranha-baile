import { z } from "zod";

/**
 * Payload de "pasar lista": la sesión y el estado presente/ausente de cada
 * alumno activo del curso. Se envía completo en cada guardado (upsert),
 * también al editar una lista ya pasada.
 */
export const attendanceSchema = z.object({
  sessionId: z.string().uuid("Sesión no válida"),
  entries: z
    .array(
      z.object({
        student_id: z.string().uuid("Alumno no válido"),
        present: z.boolean(),
      }),
    )
    .min(1, "No hay alumnos en la lista"),
});

export type AttendanceInput = z.infer<typeof attendanceSchema>;

import { createClient } from "@/lib/supabase/server";
import type { Student, WhatsappEvent } from "@/types/database";

/**
 * Queries del módulo WhatsApp (solo admin vía RLS de `whatsapp_events`).
 * Convención Fase 2: nada de embeds PostgREST — queries planas y composición
 * en JS (los tipos de `Database` no describen relaciones).
 */

/* ── Log de eventos ────────────────────────────────────────────────────────── */

export type WhatsappEventListItem = WhatsappEvent & {
  /** Nombre del alumno destinatario (null en broadcasts o si se borró). */
  studentName: string | null;
};

export type WhatsappEventsPage = {
  events: WhatsappEventListItem[];
  total: number;
  page: number;
  pageSize: number;
};

/** Log paginado simple, más recientes primero. `page` empieza en 1. */
export async function getWhatsappEvents(
  page = 1,
  pageSize = 20,
): Promise<WhatsappEventsPage> {
  const supabase = await createClient();
  const from = (Math.max(page, 1) - 1) * pageSize;

  const { data, count, error } = await supabase
    .from("whatsapp_events")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) {
    // Incluye el 416 de un rango fuera de límites: página vacía, sin romper.
    console.error("[getWhatsappEvents] error:", error.message);
    return { events: [], total: count ?? 0, page, pageSize };
  }

  const events = data ?? [];
  const studentIds = [
    ...new Set(
      events.map((e) => e.student_id).filter((v): v is string => Boolean(v)),
    ),
  ];

  const nameById = new Map<string, string>();
  if (studentIds.length > 0) {
    const { data: students } = await supabase
      .from("students")
      .select("id, full_name")
      .in("id", studentIds);
    for (const s of students ?? []) nameById.set(s.id, s.full_name);
  }

  return {
    events: events.map((e) => ({
      ...e,
      studentName: e.student_id ? (nameById.get(e.student_id) ?? null) : null,
    })),
    total: count ?? 0,
    page,
    pageSize,
  };
}

/* ── Alumnos inactivos ─────────────────────────────────────────────────────── */

/** Días sin asistir (con matrícula activa) para considerar inactivo a un alumno. */
export const INACTIVITY_DAYS = 14;

export type InactiveStudent = {
  student: Pick<Student, "id" | "full_name" | "phone">;
  /** Fecha (YYYY-MM-DD) de la última sesión con presencia, o null si nunca asistió. */
  lastAttendance: string | null;
  /** Nombres de los cursos con matrícula activa. */
  courses: string[];
};

/** Date local → "YYYY-MM-DD" (sin sorpresas de zona horaria). */
function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Alumnos `active` con al menos una matrícula `activa` y SIN ninguna
 * asistencia `present=true` en los últimos INACTIVITY_DAYS días
 * (por `session_date` de la sesión). Sin asistencias primero, luego
 * las más antiguas.
 */
export async function getInactiveStudents(): Promise<InactiveStudent[]> {
  const supabase = await createClient();

  const [studentsRes, enrollRes] = await Promise.all([
    supabase
      .from("students")
      .select("id, full_name, phone")
      .eq("active", true)
      .order("full_name"),
    supabase
      .from("enrollments")
      .select("student_id, course_id")
      .eq("status", "activa"),
  ]);

  const enrollments = enrollRes.data ?? [];
  const enrolledIds = new Set(enrollments.map((e) => e.student_id));
  const candidates = (studentsRes.data ?? []).filter((s) => enrolledIds.has(s.id));
  if (candidates.length === 0) return [];

  // Asistencias con presencia de los candidatos → fecha de la sesión.
  const { data: attendance } = await supabase
    .from("attendance")
    .select("student_id, class_session_id")
    .eq("present", true)
    .in(
      "student_id",
      candidates.map((s) => s.id),
    );

  const sessionIds = [...new Set((attendance ?? []).map((a) => a.class_session_id))];
  const dateBySession = new Map<string, string>();
  if (sessionIds.length > 0) {
    const { data: sessions } = await supabase
      .from("class_sessions")
      .select("id, session_date")
      .in("id", sessionIds);
    for (const s of sessions ?? []) dateBySession.set(s.id, s.session_date);
  }

  const lastByStudent = new Map<string, string>();
  for (const a of attendance ?? []) {
    const date = dateBySession.get(a.class_session_id);
    if (!date) continue;
    const prev = lastByStudent.get(a.student_id);
    if (!prev || date > prev) lastByStudent.set(a.student_id, date);
  }

  // Cursos activos por alumno (para la columna "Cursos").
  const courseIds = [...new Set(enrollments.map((e) => e.course_id))];
  const courseNameById = new Map<string, string>();
  if (courseIds.length > 0) {
    const { data: courses } = await supabase
      .from("courses")
      .select("id, name")
      .in("id", courseIds);
    for (const c of courses ?? []) courseNameById.set(c.id, c.name);
  }
  const coursesByStudent = new Map<string, string[]>();
  for (const e of enrollments) {
    const name = courseNameById.get(e.course_id);
    if (!name) continue;
    const list = coursesByStudent.get(e.student_id) ?? [];
    list.push(name);
    coursesByStudent.set(e.student_id, list);
  }

  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - INACTIVITY_DAYS);
  const cutoffISO = toISODate(cutoff);

  return candidates
    .filter((s) => {
      const last = lastByStudent.get(s.id);
      return !last || last < cutoffISO;
    })
    .map((s) => ({
      student: s,
      lastAttendance: lastByStudent.get(s.id) ?? null,
      courses: coursesByStudent.get(s.id) ?? [],
    }))
    .sort((a, b) => {
      if (a.lastAttendance === b.lastAttendance)
        return a.student.full_name.localeCompare(b.student.full_name);
      if (a.lastAttendance === null) return -1;
      if (b.lastAttendance === null) return 1;
      return a.lastAttendance.localeCompare(b.lastAttendance);
    });
}

/* ── Audiencias del broadcast ──────────────────────────────────────────────── */

export type BroadcastAudiences = {
  /** Cursos activos con nº de alumnos destinatarios (matrícula activa + alumno activo). */
  courses: { id: string; name: string; recipients: number }[];
  /** Niveles con nº de alumnos activos de ese nivel. */
  niveles: { id: string; nombre: string; recipients: number }[];
};

/** Opciones del composer de broadcast con el nº de destinatarios de cada una. */
export async function getBroadcastAudiences(): Promise<BroadcastAudiences> {
  const supabase = await createClient();

  const [coursesRes, nivelesRes, enrollRes, studentsRes] = await Promise.all([
    supabase
      .from("courses")
      .select("id, name")
      .eq("active", true)
      .order("weekday")
      .order("start_time"),
    supabase.from("niveles").select("id, nombre").order("orden"),
    supabase
      .from("enrollments")
      .select("student_id, course_id")
      .eq("status", "activa"),
    supabase.from("students").select("id, nivel_id").eq("active", true),
  ]);

  const activeStudents = studentsRes.data ?? [];
  const activeIds = new Set(activeStudents.map((s) => s.id));

  const countByCourse = new Map<string, number>();
  for (const e of enrollRes.data ?? []) {
    if (!activeIds.has(e.student_id)) continue;
    countByCourse.set(e.course_id, (countByCourse.get(e.course_id) ?? 0) + 1);
  }

  const countByNivel = new Map<string, number>();
  for (const s of activeStudents) {
    if (!s.nivel_id) continue;
    countByNivel.set(s.nivel_id, (countByNivel.get(s.nivel_id) ?? 0) + 1);
  }

  return {
    courses: (coursesRes.data ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      recipients: countByCourse.get(c.id) ?? 0,
    })),
    niveles: (nivelesRes.data ?? []).map((n) => ({
      id: n.id,
      nombre: n.nombre,
      recipients: countByNivel.get(n.id) ?? 0,
    })),
  };
}

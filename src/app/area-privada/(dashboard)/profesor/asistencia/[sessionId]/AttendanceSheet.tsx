"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import {
  submitAttendance,
  type AttendanceResult,
} from "@/lib/actions/attendance";

/**
 * Hoja de asistencia optimizada para pasar lista con una mano desde el móvil:
 *   · una fila por alumno, TODO el ancho es pulsable (tap = presente ⇄ ausente)
 *   · todos presentes por defecto (lo normal es marcar solo a los que faltan)
 *   · contador y botón de guardado en barra sticky, en zona del pulgar,
 *     por encima de la tab bar del layout (respeta safe-area)
 */

type SheetStudent = { id: string; full_name: string };

function StateIcon({ present }: { present: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-7 flex-none items-center justify-center rounded-full transition-colors ${
        present ? "bg-accent text-ink" : "bg-text-strong/8 text-text-faint"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        {present ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
        )}
      </svg>
    </span>
  );
}

export function AttendanceSheet({
  sessionId,
  students,
  initialPresent,
  isEdit,
}: {
  sessionId: string;
  students: SheetStudent[];
  /** Estado inicial por alumno (todos presentes si no había lista previa). */
  initialPresent: Record<string, boolean>;
  /** true si la lista ya se pasó (cambia el texto del botón). */
  isEdit: boolean;
}) {
  const [present, setPresent] = useState<Record<string, boolean>>(initialPresent);
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [savedOnce, setSavedOnce] = useState(false);
  const [isPending, startTransition] = useTransition();

  const presentCount = useMemo(
    () => students.filter((s) => present[s.id] !== false).length,
    [present, students],
  );

  function toggle(studentId: string) {
    setResult(null);
    setPresent((prev) => ({ ...prev, [studentId]: !(prev[studentId] ?? true) }));
  }

  function save() {
    startTransition(async () => {
      const res = await submitAttendance({
        sessionId,
        entries: students.map((s) => ({
          student_id: s.id,
          present: present[s.id] ?? true,
        })),
      });
      setResult(res);
      if (res.status === "success") setSavedOnce(true);
    });
  }

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {students.map((s) => {
          const isPresent = present[s.id] ?? true;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={isPresent}
                className={`flex min-h-16 w-full touch-manipulation select-none items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors active:scale-[0.99] ${
                  isPresent
                    ? "border-accent/35 bg-accent/10"
                    : "border-text-strong/10 bg-bg-panel"
                }`}
              >
                <span
                  className={`min-w-0 truncate font-body text-base font-semibold ${
                    isPresent ? "text-text-strong" : "text-text-muted"
                  }`}
                >
                  {s.full_name}
                </span>
                <span className="flex flex-none items-center gap-2">
                  <span
                    className={`font-body text-xs font-semibold ${
                      isPresent ? "text-accent" : "text-text-faint"
                    }`}
                  >
                    {isPresent ? "Presente" : "Ausente"}
                  </span>
                  <StateIcon present={isPresent} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Barra de guardado: sticky por encima de la tab bar móvil (min-h-14 + safe-area). */}
      <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] mt-5 rounded-lg border border-text-strong/10 bg-bg-elevated p-4 shadow-card md:bottom-6">
        {result?.message && (
          <p
            role={result.status === "error" ? "alert" : "status"}
            className={`mb-3 font-body text-sm font-semibold ${
              result.status === "error" ? "text-danger" : "text-accent"
            }`}
          >
            {result.message}
          </p>
        )}
        <div className="flex items-center gap-4">
          <p
            aria-live="polite"
            className="flex-none font-body text-sm font-bold text-text-strong"
          >
            <span className="text-accent">{presentCount}</span>/{students.length}{" "}
            presentes
          </p>
          <Button
            type="button"
            onClick={save}
            loading={isPending}
            className="min-h-12 flex-1 text-base"
          >
            {isEdit || savedOnce ? "Guardar cambios" : "Guardar lista"}
          </Button>
        </div>
      </div>
    </div>
  );
}

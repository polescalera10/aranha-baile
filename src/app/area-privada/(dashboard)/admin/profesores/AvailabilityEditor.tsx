"use client";

import { controlClasses } from "@/components/ui/Field";
import { WEEKDAYS } from "@/lib/format";
import { DAY_KEYS, DAY_TO_WEEKDAY } from "@/lib/validation/teacher";
import type { Teacher } from "@/types/database";

/**
 * Editor simple de disponibilidad semanal: un bloque opcional por día
 * (hora inicio + hora fin, o ambos vacíos). La Server Action lo serializa
 * al jsonb {"mon":[{"start":"18:00","end":"21:00"}],...} omitiendo días vacíos.
 */
export function AvailabilityEditor({
  defaultValue,
  errors,
}: {
  defaultValue?: Teacher["weekly_availability"];
  /** Errores del formulario, con claves `avail_mon`..`avail_sun`. */
  errors?: Record<string, string[]>;
}) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-1 font-body text-[13px] font-semibold text-text-strong">
        Disponibilidad semanal
      </legend>
      <p className="-mt-1 font-body text-xs text-text-muted">
        Un bloque por día. Deja las horas vacías si ese día no está disponible.
      </p>

      {DAY_KEYS.map((day) => {
        const dayName = WEEKDAYS[DAY_TO_WEEKDAY[day]];
        const block = defaultValue?.[day]?.[0];
        const error = errors?.[`avail_${day}`]?.[0];

        return (
          <div key={day} className="flex flex-col gap-1">
            <div className="grid grid-cols-[5rem_1fr_1fr] items-center gap-2">
              <span className="font-body text-sm font-semibold text-text-body">
                {dayName}
              </span>
              <input
                type="time"
                name={`avail_${day}_start`}
                defaultValue={block?.start ?? ""}
                aria-label={`${dayName}: hora de inicio`}
                className={controlClasses(error)}
              />
              <input
                type="time"
                name={`avail_${day}_end`}
                defaultValue={block?.end ?? ""}
                aria-label={`${dayName}: hora de fin`}
                className={controlClasses(error)}
              />
            </div>
            {error && (
              <p className="font-body text-xs font-semibold text-red">{error}</p>
            )}
          </div>
        );
      })}
    </fieldset>
  );
}

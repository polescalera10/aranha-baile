"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveCourse, type CourseFormState } from "@/lib/actions/courses";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { CYCLE_TYPE_LABELS, formatTime, WEEKDAYS } from "@/lib/format";
import type { Course } from "@/types/database";

const initial: CourseFormState = { status: "idle" };

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {isEdit ? "Guardar cambios" : "Crear curso"}
    </Button>
  );
}

/**
 * Formulario de alta/edición de curso. Con `course` edita (id oculto);
 * sin él, crea. La action redirige al detalle tras guardar.
 */
export function CourseForm({
  course,
  modalidades,
  niveles,
  teachers,
}: {
  course?: Course;
  modalidades: { id: string; nombre: string }[];
  niveles: { id: string; nombre: string }[];
  teachers: { id: string; full_name: string }[];
}) {
  const [state, formAction] = useActionState(saveCourse, initial);
  const [active, setActive] = useState(course?.active ?? true);
  const isEdit = Boolean(course);
  const err = (field: string) => state.errors?.[field]?.[0];

  return (
    <form action={formAction} noValidate className="grid gap-4 sm:grid-cols-2">
      {course && <input type="hidden" name="id" value={course.id} />}
      {active && <input type="hidden" name="active" value="on" />}

      <div className="sm:col-span-2">
        <Input
          label="Nombre del curso"
          name="name"
          required
          defaultValue={course?.name ?? ""}
          placeholder="Salsa Básico — Martes 20h"
          error={err("name")}
        />
      </div>

      <Select
        label="Modalidad"
        name="modalidad_id"
        required
        defaultValue={course?.modalidad_id ?? ""}
        error={err("modalidad_id")}
      >
        <option value="">Elige una modalidad</option>
        {modalidades.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </Select>

      <Select
        label="Nivel"
        name="nivel_id"
        defaultValue={course?.nivel_id ?? ""}
        error={err("nivel_id")}
      >
        <option value="">Sin nivel</option>
        {niveles.map((n) => (
          <option key={n.id} value={n.id}>
            {n.nombre}
          </option>
        ))}
      </Select>

      <Select
        label="Profesor titular"
        name="teacher_id"
        defaultValue={course?.teacher_id ?? ""}
        error={err("teacher_id")}
        hint="Solo profes activos."
      >
        <option value="">Sin asignar</option>
        {teachers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.full_name}
          </option>
        ))}
      </Select>

      <Select
        label="Día de la semana"
        name="weekday"
        required
        defaultValue={course ? String(course.weekday) : ""}
        error={err("weekday")}
      >
        <option value="">Elige un día</option>
        {Object.entries(WEEKDAYS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Input
        label="Hora de inicio"
        name="start_time"
        type="time"
        required
        defaultValue={course ? formatTime(course.start_time) : ""}
        error={err("start_time")}
      />

      <Input
        label="Duración (minutos)"
        name="duration_min"
        type="number"
        inputMode="numeric"
        min={15}
        max={600}
        step={5}
        required
        defaultValue={course?.duration_min ?? 60}
        error={err("duration_min")}
      />

      <Input
        label="Aforo leaders"
        name="capacity_leaders"
        type="number"
        inputMode="numeric"
        min={0}
        max={200}
        required
        defaultValue={course?.capacity_leaders ?? 10}
        error={err("capacity_leaders")}
      />

      <Input
        label="Aforo followers"
        name="capacity_followers"
        type="number"
        inputMode="numeric"
        min={0}
        max={200}
        required
        defaultValue={course?.capacity_followers ?? 10}
        error={err("capacity_followers")}
      />

      <Select
        label="Tipo de ciclo"
        name="cycle_type"
        required
        defaultValue={course?.cycle_type ?? "curso"}
        error={err("cycle_type")}
      >
        {Object.entries(CYCLE_TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Input
        label="Fecha de inicio (opcional)"
        name="start_date"
        type="date"
        defaultValue={course?.start_date ?? ""}
        error={err("start_date")}
      />

      <Input
        label="Fecha de fin (opcional)"
        name="end_date"
        type="date"
        defaultValue={course?.end_date ?? ""}
        error={err("end_date")}
        hint="Las sesiones no se generan más allá de esta fecha."
      />

      <div className="flex items-center gap-3 sm:col-span-2">
        <Toggle checked={active} onChange={setActive} label="Curso activo" />
        <span className="font-body text-sm font-semibold text-text-strong">
          Curso activo
        </span>
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-sm border border-red/30 bg-red/5 px-4 py-3 font-body text-sm text-red sm:col-span-2"
        >
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3 sm:col-span-2">
        <SubmitButton isEdit={isEdit} />
        <Button
          variant="ghost"
          href={
            course
              ? `/area-privada/admin/cursos/${course.id}`
              : "/area-privada/admin/cursos"
          }
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

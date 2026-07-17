import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { updateStudent } from "@/lib/actions/students";
import { getNiveles, getPartnerOptions, getStudent } from "@/lib/queries/students";
import { Card } from "@/components/ui/Card";
import { StudentForm } from "../../StudentForm";

export default async function EditarAlumnoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole("admin");
  const { id } = await params;

  const student = await getStudent(id);
  if (!student) notFound();

  const [niveles, partners] = await Promise.all([
    getNiveles(),
    getPartnerOptions(student.id),
  ]);

  return (
    <>
      <Link
        href={`/area-privada/admin/alumnos/${student.id}`}
        className="font-body text-sm font-semibold text-text-muted transition-colors hover:text-accent"
      >
        ← Ficha de {student.full_name}
      </Link>
      <h1 className="mt-3 font-display text-[clamp(30px,4.5vw,44px)] text-text-strong">
        Editar alumno
      </h1>
      <p className="mt-2 font-body text-base text-text-muted">{student.full_name}</p>

      <Card className="mt-8 max-w-3xl">
        <StudentForm
          action={updateStudent}
          niveles={niveles}
          partners={partners}
          student={student}
          submitLabel="Guardar cambios"
          cancelHref={`/area-privada/admin/alumnos/${student.id}`}
        />
      </Card>
    </>
  );
}

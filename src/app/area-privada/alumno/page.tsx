import { requireRole } from "@/lib/auth";
import { RolePlaceholder } from "@/components/area/RolePlaceholder";

export default async function AlumnoPage() {
  const { user } = await requireRole("alumno");
  return <RolePlaceholder rol="alumno" email={user.email} />;
}

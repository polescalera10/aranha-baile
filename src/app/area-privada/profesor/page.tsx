import { requireRole } from "@/lib/auth";
import { RolePlaceholder } from "@/components/area/RolePlaceholder";

export default async function ProfesorPage() {
  const { user } = await requireRole("profesor");
  return <RolePlaceholder rol="profesor" email={user.email} />;
}

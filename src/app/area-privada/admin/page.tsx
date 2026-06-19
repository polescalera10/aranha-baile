import { requireRole } from "@/lib/auth";
import { RolePlaceholder } from "@/components/area/RolePlaceholder";

export default async function AdminPage() {
  const { user } = await requireRole("admin");
  return <RolePlaceholder rol="admin" email={user.email} />;
}

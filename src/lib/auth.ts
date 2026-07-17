import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

/**
 * Garantiza sesión + rol en una página protegida del área privada.
 * Sin sesión → login. Rol distinto → su propio panel.
 * Devuelve { user, role } cuando el acceso es válido.
 */
export async function requireRole(role: UserRole) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/area-privada");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const current = profile?.role ?? "alumno";
  if (current !== role) redirect(`/area-privada/${current}`);

  return { user, role: current };
}

/**
 * Como requireRole, pero acepta varios roles válidos.
 * Sin sesión → login. Rol fuera de la lista → su propio panel.
 * Devuelve { user, role } cuando el acceso es válido.
 */
export async function requireAnyRole(roles: UserRole[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/area-privada");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const current = profile?.role ?? "alumno";
  if (!roles.includes(current)) redirect(`/area-privada/${current}`);

  return { user, role: current };
}

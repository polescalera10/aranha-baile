import { redirect } from "next/navigation";

/**
 * La landing del curso regular se fusionó con /clases (una sola página de
 * ventas). Mantenemos la ruta como redirección permanente por si algún enlace
 * externo apunta aquí.
 */
export default function CursoRegularPage() {
  redirect("/clases");
}

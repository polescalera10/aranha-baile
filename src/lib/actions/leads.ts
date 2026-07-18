"use server";

import { postToN8n } from "@/lib/n8n/client";
import { createClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validation/lead";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Errores por campo, para feedback inline. */
  errors?: Record<string, string[]>;
};

/**
 * Server Action de los formularios públicos (clase de prueba, founding, contacto).
 * Flujo: validar (Zod) → insertar en `leads` → POST al webhook n8n → feedback.
 * El webhook n8n NUNCA se expone al cliente: se llama desde aquí, en el servidor.
 */
export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    email: formData.get("email") ?? "",
    modalidad_interes: formData.get("modalidad_interes") ?? "",
    origen: formData.get("origen"),
    mensaje: formData.get("mensaje") ?? "",
    website: formData.get("website") ?? "",
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot: si viene relleno, fingimos éxito y no hacemos nada.
  if (parsed.data.website) {
    return { status: "success", message: "¡Gracias! Te escribimos enseguida." };
  }

  const { website: _hp, ...lead } = parsed.data;

  // 1) Persistir el lead (RLS permite insert anónimo en `leads`).
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    nombre: lead.nombre,
    telefono: lead.telefono,
    email: lead.email || null,
    modalidad_interes: lead.modalidad_interes || null,
    origen: lead.origen,
    mensaje: lead.mensaje || null,
  });

  if (error) {
    console.error("[submitLead] insert error:", error.message);
    return {
      status: "error",
      message: "No hemos podido guardar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.",
    };
  }

  // 2) Notificar a n8n (email + WhatsApp). No bloquea el éxito del lead.
  await postToN8n({ ...lead, recibido_en: new Date().toISOString() }).catch((e) =>
    console.error("[submitLead] webhook n8n falló:", e),
  );

  return {
    status: "success",
    message: "¡Gracias! Te escribimos por WhatsApp enseguida.",
  };
}

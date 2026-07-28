"use server";

import { revalidatePath } from "next/cache";
import { postToN8n } from "@/lib/n8n/client";
import { createClient } from "@/lib/supabase/server";
import { interestLeadSchema, leadEstadoSchema, leadSchema } from "@/lib/validation/lead";

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

/**
 * Server Action de las landings de INTENSIVOS y CURSO REGULAR.
 * Igual que `submitLead` pero con email obligatorio, consentimiento RGPD y un
 * array de `intereses` (etiquetas para marketing segmentado). Los intereses se
 * guardan como `text[]` en `leads` y se envían a n8n también en texto plano.
 */
export async function submitInterestLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    email: formData.get("email") ?? "",
    origen: formData.get("origen"),
    // Checkboxes múltiples con el mismo name → getAll.
    intereses: formData.getAll("intereses").map(String),
    consentimiento: formData.get("consentimiento") ?? "",
    website: formData.get("website") ?? "",
  };

  const parsed = interestLeadSchema.safeParse(raw);
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

  const { website: _hp, consentimiento: _c, ...lead } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    nombre: lead.nombre,
    telefono: lead.telefono,
    email: lead.email,
    origen: lead.origen,
    intereses: lead.intereses,
    mensaje: null,
    // Trazabilidad legible en el CRM: qué landing convirtió.
    modalidad_interes: lead.origen === "intensivos" ? "Intensivos agosto" : "Curso regular",
  });

  if (error) {
    console.error("[submitInterestLead] insert error:", error.message);
    return {
      status: "error",
      message:
        "No hemos podido guardar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.",
    };
  }

  await postToN8n({
    ...lead,
    intereses_texto: lead.intereses.join(", "),
    consentimiento: true,
    recibido_en: new Date().toISOString(),
  }).catch((e) => console.error("[submitInterestLead] webhook n8n falló:", e));

  return {
    status: "success",
    message: "¡Gracias! Hemos recibido tu solicitud y te escribimos enseguida.",
  };
}

/** Resultado de las mutaciones rápidas del panel (fuera de useActionState). */
export type LeadMutationResult = { ok: boolean; message?: string };

/**
 * Cambia el estado de un lead desde el panel (acción rápida del inicio de admin).
 * La barrera real es la RLS: solo `is_admin()` puede actualizar `leads`.
 */
export async function updateLeadEstado(
  leadId: string,
  estado: string,
): Promise<LeadMutationResult> {
  const parsed = leadEstadoSchema.safeParse(estado);
  if (!parsed.success) return { ok: false, message: "Estado no válido." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ estado: parsed.data })
    .eq("id", leadId);

  if (error) {
    console.error("[updateLeadEstado] error:", error.message);
    return { ok: false, message: "No se ha podido actualizar el lead." };
  }

  revalidatePath("/area-privada/admin");
  revalidatePath("/area-privada/admin/leads");
  return { ok: true };
}

"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadFormState } from "@/lib/actions/leads";
import type { leadOrigenes } from "@/lib/validation/lead";

const initial: LeadFormState = { status: "idle" };

const FIELD =
  "w-full rounded-sm border border-white/12 bg-bg-elevated px-4 py-3 font-body text-[15px] text-text-strong outline-none transition-colors placeholder:text-text-muted focus:border-neon";
const LABEL = "mb-1.5 block font-body text-[13px] font-semibold text-text-body";
const ERR = "mt-1 font-body text-xs font-semibold text-neon";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-neon px-7 py-[15px] font-body text-base font-bold text-ink shadow-neon transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Enviando…" : "Enviar"}
    </button>
  );
}

/**
 * Formulario de captación de leads (clase de prueba / founding / contacto).
 * Escribe en Supabase y dispara el webhook n8n vía Server Action.
 */
export function LeadForm({
  origen,
  withModalidad = false,
  withMensaje = true,
  hiddenModalidad,
}: {
  origen: (typeof leadOrigenes)[number];
  withModalidad?: boolean;
  withMensaje?: boolean;
  /** Valor fijo de `modalidad_interes` enviado oculto (p. ej. trazabilidad de landing de campaña). No combinar con `withModalidad`. */
  hiddenModalidad?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-neon/25 bg-bg-panel p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neon/10 text-2xl text-neon">
          ✓
        </div>
        <p className="font-display text-2xl text-text-strong">¡Mensaje enviado!</p>
        <p className="mt-2 font-body text-[15px] text-text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="origen" value={origen} />
      {hiddenModalidad && <input type="hidden" name="modalidad_interes" value={hiddenModalidad} />}
      {/* Honeypot anti-spam: oculto a usuarios, visible a bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="lf-nombre" className={LABEL}>
          Nombre
        </label>
        <input id="lf-nombre" name="nombre" required className={FIELD} placeholder="Tu nombre" />
        {state.errors?.nombre && <p className={ERR}>{state.errors.nombre[0]}</p>}
      </div>

      <div>
        <label htmlFor="lf-telefono" className={LABEL}>
          Teléfono
        </label>
        <input
          id="lf-telefono"
          name="telefono"
          inputMode="tel"
          required
          className={FIELD}
          placeholder="600 000 000"
        />
        {state.errors?.telefono && <p className={ERR}>{state.errors.telefono[0]}</p>}
      </div>

      <div>
        <label htmlFor="lf-email" className={LABEL}>
          Email <span className="font-normal text-text-faint">(opcional)</span>
        </label>
        <input id="lf-email" name="email" type="email" className={FIELD} placeholder="tu@email.com" />
        {state.errors?.email && <p className={ERR}>{state.errors.email[0]}</p>}
      </div>

      {withModalidad && (
        <div>
          <label htmlFor="lf-modalidad" className={LABEL}>
            Modalidad de interés <span className="font-normal text-text-faint">(opcional)</span>
          </label>
          <input
            id="lf-modalidad"
            name="modalidad_interes"
            className={FIELD}
            placeholder="Salsa, bachata…"
          />
        </div>
      )}

      {withMensaje && (
        <div>
          <label htmlFor="lf-mensaje" className={LABEL}>
            Mensaje <span className="font-normal text-text-faint">(opcional)</span>
          </label>
          <textarea
            id="lf-mensaje"
            name="mensaje"
            rows={4}
            className={`${FIELD} resize-y`}
            placeholder="Cuéntanos qué buscas"
          />
          {state.errors?.mensaje && <p className={ERR}>{state.errors.mensaje[0]}</p>}
        </div>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-sm border border-neon/30 bg-neon/5 px-4 py-3 font-body text-sm text-neon">
          {state.message}
        </p>
      )}

      <div className="mt-1">
        <SubmitButton />
      </div>
    </form>
  );
}

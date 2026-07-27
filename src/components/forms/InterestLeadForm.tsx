"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInterestLead, type LeadFormState } from "@/lib/actions/leads";

const initial: LeadFormState = { status: "idle" };

const FIELD =
  "w-full min-h-12 rounded-sm border border-white/12 bg-bg-elevated px-4 py-3 font-body text-base text-text-strong outline-none transition-colors placeholder:text-text-muted focus:border-neon";
const LABEL = "mb-1.5 block font-body text-[13px] font-semibold text-text-body";
const ERR = "mt-1 font-body text-xs font-semibold text-neon";

export type InterestOption = { value: string; label: string; hint?: string };
export type InterestGroup = { label: string; options: InterestOption[] };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-neon px-7 py-[15px] font-body text-base font-bold text-ink shadow-neon transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Enviando…" : label}
    </button>
  );
}

/**
 * Formulario de captación de las landings de INTENSIVOS y CURSO REGULAR.
 * Recoge nombre completo, email, teléfono, uno o varios intereses (checkboxes,
 * se envían como `intereses[]` y se guardan como tags para marketing segmentado)
 * y el consentimiento RGPD obligatorio. Escribe en Supabase vía Server Action.
 */
export function InterestLeadForm({
  origen,
  groups,
  submitLabel = "Reservar mi plaza",
}: {
  origen: "intensivos" | "curso-regular";
  groups: InterestGroup[];
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitInterestLead, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-neon/25 bg-bg-panel p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neon/10 text-2xl text-neon">
          ✓
        </div>
        <p className="font-display text-2xl text-text-strong">¡Solicitud recibida!</p>
        <p className="mt-2 font-body text-[15px] text-text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="origen" value={origen} />
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
        <label htmlFor="il-nombre" className={LABEL}>
          Nombre completo
        </label>
        <input
          id="il-nombre"
          name="nombre"
          required
          className={FIELD}
          placeholder="Nombre y apellidos"
        />
        {state.errors?.nombre && <p className={ERR}>{state.errors.nombre[0]}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="il-email" className={LABEL}>
            Email
          </label>
          <input
            id="il-email"
            name="email"
            type="email"
            required
            className={FIELD}
            placeholder="tu@email.com"
          />
          {state.errors?.email && <p className={ERR}>{state.errors.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="il-telefono" className={LABEL}>
            Teléfono
          </label>
          <input
            id="il-telefono"
            name="telefono"
            inputMode="tel"
            required
            className={FIELD}
            placeholder="600 000 000"
          />
          {state.errors?.telefono && <p className={ERR}>{state.errors.telefono[0]}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={LABEL}>¿Qué te interesa? Marca todo lo que quieras</legend>
        <div className="mt-1 space-y-4">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-neon-mint">
                {group.label}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-start gap-3 rounded-sm border border-white/10 bg-bg-elevated px-3 py-2.5 transition-colors hover:border-neon/40 has-[:checked]:border-neon has-[:checked]:bg-neon/5"
                  >
                    <input
                      type="checkbox"
                      name="intereses"
                      value={opt.value}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-neon"
                    />
                    <span className="font-body text-[14px] leading-tight text-text-strong">
                      {opt.label}
                      {opt.hint && (
                        <span className="mt-0.5 block font-normal text-[12px] text-text-muted">
                          {opt.hint}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {state.errors?.intereses && <p className={ERR}>{state.errors.intereses[0]}</p>}
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consentimiento"
          value="on"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-neon"
        />
        <span className="font-body text-[13px] leading-snug text-text-muted">
          He leído y acepto la{" "}
          <a
            href="/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neon underline"
          >
            política de privacidad
          </a>{" "}
          y el tratamiento de mis datos para gestionar mi solicitud y recibir información de NEXUS
          VNG.
        </span>
      </label>
      {state.errors?.consentimiento && <p className={ERR}>{state.errors.consentimiento[0]}</p>}

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-sm border border-neon/30 bg-neon/5 px-4 py-3 font-body text-sm text-neon"
        >
          {state.message}
        </p>
      )}

      <div className="mt-1">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}

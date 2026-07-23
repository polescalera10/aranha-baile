import { useId } from "react";

/**
 * Envoltorio común de campos de formulario: label, hint y error con el
 * cableado de ids/aria compartido por Input, Select y Textarea.
 */
export type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
};

export function useFieldIds(id?: string) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return {
    fieldId,
    hintId: `${fieldId}-hint`,
    errorId: `${fieldId}-error`,
  };
}

export function describedBy(
  ids: { hintId: string; errorId: string },
  hint?: string,
  error?: string,
) {
  const refs = [hint && ids.hintId, error && ids.errorId].filter(Boolean);
  return refs.length > 0 ? refs.join(" ") : undefined;
}

export function FieldShell({
  label,
  fieldId,
  hintId,
  errorId,
  hint,
  error,
  children,
}: FieldProps & {
  fieldId: string;
  hintId: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="font-body text-[13px] font-semibold text-text-strong"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="font-body text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="font-body text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Estilo base compartido de los controles de formulario. */
export const controlClasses = (error?: string) =>
  `w-full scheme-dark rounded-sm border bg-bg-elevated px-3.5 py-2.5 font-body text-sm text-text-strong placeholder:text-text-muted focus-visible:outline-accent disabled:opacity-55 ${
    error ? "border-danger" : "border-text-strong/15"
  }`;

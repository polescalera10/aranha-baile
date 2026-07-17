import {
  controlClasses,
  describedBy,
  FieldShell,
  useFieldIds,
  type FieldProps,
} from "./Field";

export type TextareaProps = FieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children">;

export function Textarea({
  label,
  error,
  hint,
  id,
  rows = 4,
  className = "",
  ...props
}: TextareaProps) {
  const ids = useFieldIds(id);

  return (
    <FieldShell label={label} error={error} hint={hint} {...ids}>
      <textarea
        id={ids.fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, hint, error)}
        className={`${controlClasses(error)} resize-y ${className}`}
        {...props}
      />
    </FieldShell>
  );
}

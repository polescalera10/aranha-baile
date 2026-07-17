import {
  controlClasses,
  describedBy,
  FieldShell,
  useFieldIds,
  type FieldProps,
} from "./Field";

export type InputProps = FieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
  const ids = useFieldIds(id);

  return (
    <FieldShell label={label} error={error} hint={hint} {...ids}>
      <input
        id={ids.fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, hint, error)}
        className={`${controlClasses(error)} ${className}`}
        {...props}
      />
    </FieldShell>
  );
}

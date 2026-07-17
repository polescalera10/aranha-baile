import {
  controlClasses,
  describedBy,
  FieldShell,
  useFieldIds,
  type FieldProps,
} from "./Field";

export type SelectProps = FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  label,
  error,
  hint,
  id,
  className = "",
  children,
  ...props
}: SelectProps) {
  const ids = useFieldIds(id);

  return (
    <FieldShell label={label} error={error} hint={hint} {...ids}>
      <select
        id={ids.fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, hint, error)}
        className={`${controlClasses(error)} appearance-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

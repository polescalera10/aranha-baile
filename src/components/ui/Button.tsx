import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary:
    "border border-text-strong/15 bg-white text-text-body hover:bg-bg-cream",
  danger: "bg-red text-white hover:bg-red/90",
  ghost: "bg-transparent text-text-body hover:bg-text-strong/6",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
};

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Con href se renderiza como <Link> (mismo aspecto de botón). */
  href?: string;
  /** Deshabilita el botón y muestra un spinner sutil. Solo aplica a <button>. */
  loading?: boolean;
};

export type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-sm font-body font-semibold transition-colors disabled:pointer-events-none disabled:opacity-55 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled || loading} className={classes} {...props}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-text-strong/8 text-text-body",
  success: "bg-accent/12 text-accent",
  warning: "bg-gold/22 text-text-strong",
  danger: "bg-red/10 text-red",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-body text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

import Link from "next/link";

export function Logo({
  size = 25,
  onDark = true,
}: {
  size?: number;
  onDark?: boolean;
}) {
  return (
    <Link href="/" className="flex items-baseline gap-[9px] no-underline">
      <span
        className={`font-display uppercase tracking-[0.04em] ${onDark ? "text-white" : "text-text-strong"}`}
        style={{ fontSize: size }}
      >
        Aranha
      </span>
      <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-warm">
        Baile
      </span>
    </Link>
  );
}

/**
 * Glifo de chat (cuadrado redondeado con la esquina inferior-izquierda viva).
 * Es el marcador de marca usado en el diseño — no el logotipo de WhatsApp —
 * para mantener fidelidad visual sin reproducir una marca de terceros.
 */
export function WaGlyph({
  size = 20,
  className = "bg-ink",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block flex-none rounded-[8px] rounded-bl-[2px] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

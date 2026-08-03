import { timingSafeEqual } from "node:crypto";

/**
 * Comparación de secretos en tiempo constante.
 *
 * `a !== b` corta en el primer byte distinto, así que el tiempo de respuesta
 * filtra cuántos bytes iniciales acertó quien llama: con suficientes intentos
 * se puede reconstruir el secreto byte a byte. `timingSafeEqual` siempre tarda
 * lo mismo. Ver docs/auditoria-seguridad-2026-08-03.md (M2).
 *
 * La longitud sí se compara antes (timingSafeEqual exige buffers iguales); eso
 * solo revela el tamaño del secreto, no su contenido.
 */
export function secretMatches(received: string | null, expected: string): boolean {
  if (!received) return false;
  const a = Buffer.from(received, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

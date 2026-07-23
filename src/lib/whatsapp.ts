import { WHATSAPP_NUMBER } from "@/lib/site";

/**
 * Origen del clic. Sirve para (a) prerrellenar un mensaje distinto por bloque
 * y (b) identificar qué CTA convierte mejor.
 */
export type WaOrigin =
  | "hero"
  | "sticky"
  | "founding"
  | "cta-final"
  | "footer"
  | "nav"
  | "modalidad"
  | "contacto"
  | "evento";

const MESSAGES: Record<WaOrigin, string> = {
  hero: "¡Hola! Me gustaría info de la clase de prueba de baile 🙂",
  sticky: "¡Hola! Quiero reservar mi clase de prueba de baile 💃",
  founding: "¡Hola! Quiero mi plaza fundadora de NEXUS VNG ✨",
  "cta-final": "¡Hola! ¿Empezamos? Me gustaría apuntarme a una clase de prueba 🙂",
  footer: "¡Hola! Me gustaría más información sobre NEXUS VNG 🙂",
  nav: "¡Hola! Me gustaría info sobre las clases de baile 🙂",
  modalidad: "¡Hola! Me interesa la clase de", // se completa con la modalidad
  contacto: "¡Hola! Os escribo desde la web de NEXUS VNG 🙂",
  evento: "¡Hola! Me gustaría más información sobre el evento", // se completa con el nombre del evento
};

/**
 * Construye un enlace wa.me con mensaje prerrellenado y URL-encoded.
 * @param origin  bloque/CTA de origen
 * @param extra   texto adicional (p. ej. el nombre de la modalidad)
 */
export function buildWaLink(origin: WaOrigin, extra?: string): string {
  const base = MESSAGES[origin];
  const text = extra ? `${base} ${extra} 💃` : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

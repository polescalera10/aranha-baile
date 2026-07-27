import { describe, expect, it } from "vitest";
import { buildWaLink } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/site";

/**
 * buildWaLink es la función más crítica del sitio: el objetivo nº1 es convertir
 * visitas en mensajes de WhatsApp, y todos los CTA pasan por aquí. Un enlace mal
 * formado o un texto sin codificar rompe la conversión sin dar ningún error.
 */
describe("buildWaLink", () => {
  it("apunta a wa.me con el número configurado", () => {
    expect(buildWaLink("hero")).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);
  });

  it("codifica el mensaje base como parámetro text", () => {
    const url = new URL(buildWaLink("hero"));
    expect(url.searchParams.get("text")).toBe(
      "¡Hola! Me gustaría info de la clase de prueba de baile 🙂",
    );
  });

  it("no deja espacios ni acentos sin codificar en la query", () => {
    const raw = buildWaLink("footer");
    const query = raw.slice(raw.indexOf("?text=") + "?text=".length);
    expect(query).not.toMatch(/[\s¡áéíóúñ]/);
  });

  it("compone base + extra + emoji cuando el origen tiene mensaje propio", () => {
    const text = new URL(buildWaLink("modalidad", "Bachata")).searchParams.get("text");
    expect(text).toBe("¡Hola! Me interesa la clase de Bachata 💃");
  });

  it("usa solo el extra cuando el origen no tiene mensaje base (campañas)", () => {
    const propio = "¡Hola! Vengo de la landing de parejas y quiero info";
    const text = new URL(buildWaLink("campana", propio)).searchParams.get("text");
    expect(text).toBe(propio);
  });

  it("devuelve texto vacío para campana sin extra (no inventa mensaje)", () => {
    expect(new URL(buildWaLink("campana")).searchParams.get("text")).toBe("");
  });

  it("da un mensaje distinto por origen para poder atribuir la conversión", () => {
    const origins = ["hero", "sticky", "founding", "cta-final", "footer", "nav"] as const;
    const textos = origins.map((o) => new URL(buildWaLink(o)).searchParams.get("text"));
    expect(new Set(textos).size).toBe(origins.length);
  });

  it("no rompe con caracteres reservados de URL en el extra", () => {
    const text = new URL(buildWaLink("evento", "Fiesta & Salsa #1?")).searchParams.get("text");
    expect(text).toBe("¡Hola! Me gustaría más información sobre el evento Fiesta & Salsa #1? 💃");
  });
});

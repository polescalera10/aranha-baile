import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Aranha Baile nace dentro del gimnasio Aranha en Vilanova i la Geltrú: misma marca, alma de comunidad.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <SupportPage
      eyebrow="Quiénes somos"
      title="Más que una escuela, una comunidad"
      intro="Dentro del gimnasio Aranha de Vilanova i la Geltrú, con la misma marca y un público distinto: calidez, pertenencia y baile."
    >
      <div className="prose-aranha max-w-[68ch] space-y-4">
        <PlaceholderNote>
          Historia de la escuela, valores, vínculo con el gimnasio Aranha y la visión de comunidad.
          Se completará con el cliente.
        </PlaceholderNote>
      </div>
    </SupportPage>
  );
}

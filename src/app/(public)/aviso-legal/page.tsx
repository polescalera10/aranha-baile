import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de Aranha Baile.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <SupportPage title="Aviso legal">
      <PlaceholderNote>
        Texto legal (titularidad, condiciones de uso, propiedad intelectual). PLACEHOLDER: aportar
        contenido jurídico definitivo.
      </PlaceholderNote>
    </SupportPage>
  );
}

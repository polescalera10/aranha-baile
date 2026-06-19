import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Aranha Baile.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <SupportPage title="Política de privacidad">
      <PlaceholderNote>
        Tratamiento de datos personales (RGPD/LOPDGDD), finalidad de los formularios y derechos del
        usuario. PLACEHOLDER: aportar contenido jurídico definitivo.
      </PlaceholderNote>
    </SupportPage>
  );
}

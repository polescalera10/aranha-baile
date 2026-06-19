import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Aranha Baile.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <SupportPage title="Política de cookies">
      <PlaceholderNote>
        Tipos de cookies utilizadas y gestión del consentimiento. PLACEHOLDER: aportar contenido
        jurídico definitivo.
      </PlaceholderNote>
    </SupportPage>
  );
}

import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";

export const metadata: Metadata = {
  title: "Horarios",
  description: "Horarios de las clases de baile de Aranha en Vilanova i la Geltrú.",
  alternates: { canonical: "/horarios" },
};

export default function HorariosPage() {
  return (
    <SupportPage
      eyebrow="Cuándo"
      title="Horarios"
      intro="Consulta los días y horas de cada modalidad y nivel."
    >
      <PlaceholderNote>
        Tabla / calendario de horarios por modalidad y nivel. Se alimentará de la tabla{" "}
        <code className="font-mono text-sm">clases</code> de Supabase. PLACEHOLDER hasta tener los
        datos definitivos.
      </PlaceholderNote>
    </SupportPage>
  );
}

import type { Metadata } from "next";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { JsonLd, eventLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Fiestas, masterclasses y socials de Aranha Baile en Vilanova i la Geltrú.",
  alternates: { canonical: "/eventos" },
};

// PLACEHOLDER: sustituir por consulta a `eventos` (publico = true), ordenados por fecha.
const EVENTOS = [
  { titulo: "Fiesta social mensual", fecha: "2026-07-04T21:00:00", descripcion: "Noche de baile abierta a todos los niveles." },
  { titulo: "Masterclass de bachata", fecha: "2026-07-18T19:00:00", descripcion: "Sesión especial con profesor invitado." },
];

export default function EventosPage() {
  return (
    <SupportPage
      eyebrow="La comunidad en vivo"
      title="Eventos"
      intro="Fiestas, masterclasses y socials donde la escuela se convierte en pista."
    >
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {EVENTOS.map((e) => (
          <li key={e.titulo} className="overflow-hidden rounded-lg border border-text-strong/8 bg-white shadow-card">
            <PhotoPlaceholder label="[ evento ]" tint="mix" className="min-h-[180px] p-3" />
            <div className="p-6">
              <time className="font-body text-xs font-semibold uppercase tracking-wide text-red">
                {new Date(e.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long" })}
              </time>
              <h2 className="mt-1 font-display text-2xl text-text-strong">{e.titulo}</h2>
              <p className="mt-2 font-body text-[15px] text-text-muted">{e.descripcion}</p>
            </div>
            <JsonLd data={eventLd(e)} />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <PlaceholderNote>Listado completo de eventos desde Supabase. PLACEHOLDER.</PlaceholderNote>
      </div>
    </SupportPage>
  );
}

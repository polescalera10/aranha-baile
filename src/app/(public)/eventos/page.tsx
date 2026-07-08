import type { Metadata } from "next";
import Link from "next/link";
import { SupportPage } from "@/components/layout/SupportPage";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { JsonLd, eventLd } from "@/components/seo/JsonLd";
import { getEventos } from "@/lib/queries/eventos";

export const metadata: Metadata = {
  title: "Eventos de Baile",
  description: "Fiestas, masterclasses y socials de Aranha Baile en Vilanova i la Geltrú.",
  alternates: { canonical: "/eventos" },
};

// Revalidar cada hora
export const revalidate = 3600;

const COVER_IMAGES: Record<string, string> = {
  "fiesta-social-mensual": "/images/social_dance_event.png",
  "masterclass-bachata": "/images/bachata_masterclass.png",
};

export default async function EventosPage() {
  const eventos = await getEventos();

  return (
    <SupportPage
      eyebrow="La comunidad en vivo"
      title="Eventos"
      intro="Fiestas, masterclasses y socials donde la escuela se convierte en pista."
    >
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-0 list-none">
        {eventos.map((e) => {
          const cover = e.slug ? COVER_IMAGES[e.slug] : null;
          
          return (
            <li key={e.id}>
              <Link
                href={`/eventos/${e.slug}`}
                className="group overflow-hidden rounded-lg border border-text-strong/8 bg-white shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 block no-underline text-inherit"
              >
                {/* Cabecera de la tarjeta con imagen o fallback */}
                <div className="overflow-hidden h-48 relative bg-bg-sand">
                  {cover ? (
                    <img
                      src={cover}
                      alt={e.titulo}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <PhotoPlaceholder label={`[ ${e.tipo} ]`} tint="mix" className="h-full p-3" />
                  )}
                  <span className="absolute top-3 left-3 bg-red text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                    {e.tipo}
                  </span>
                </div>

                <div className="p-6">
                  <time className="font-body text-xs font-semibold uppercase tracking-wide text-red">
                    {new Date(e.fecha).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}h
                  </time>
                  <h2 className="mt-1 font-display text-2xl text-text-strong group-hover:text-red transition-colors">
                    {e.titulo}
                  </h2>
                  <p className="mt-2 font-body text-[14px] text-text-muted line-clamp-2 leading-relaxed">
                    {e.descripcion?.replace(/[#*_[\]]/g, "")}
                  </p>
                  <span className="mt-4 inline-block font-body text-[13px] font-bold text-red group-hover:underline">
                    Ver más detalles &rarr;
                  </span>
                </div>
                <JsonLd data={eventLd({ titulo: e.titulo, descripcion: e.descripcion, fecha: e.fecha })} />
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Estado vacío honesto cuando no hay eventos publicados. */}
      {eventos.length === 0 && (
        <p className="max-w-[60ch] font-body text-base leading-relaxed text-text-body">
          Estamos preparando el calendario de fiestas, socials y masterclasses. Síguenos en
          Instagram o escríbenos por WhatsApp y te avisamos del próximo evento.
        </p>
      )}

      {/*
        Nota interna (oculta en producción): los eventos se sincronizan desde la
        tabla `eventos` de Supabase — añade socials o masterclasses ahí y
        aparecen automáticamente.
      */}
    </SupportPage>
  );
}

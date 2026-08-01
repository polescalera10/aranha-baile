import type { Metadata } from "next";
import { notFound } from "next/navigation";

/*
  RUTA DESACTIVADA A PROPÓSITO — devuelve 404 siempre.

  Motivo: todavía no existen fichas reales de profesores (el grid de
  /profesores está comentado a la espera de nombres y fotos de Pol). Mientras
  la ruta respondía 200 con un placeholder ("Nombre Apellido") y canónica
  propia, cualquier slug inventado —/profesores/xyz123qqq— generaba una URL
  indexable de basura: espacio infinito de páginas vacías para Google.

  Se reactivará cuando haya fichas reales: bastará con recuperar el contenido
  comentado al final del archivo, sustituir el placeholder por la consulta a
  los datos del profesor y llamar a notFound() solo si el slug no existe.
  Recordar entonces añadir /profesores/[slug] al sitemap.
*/

export async function generateMetadata(): Promise<Metadata> {
  notFound();
}

export default async function ProfesorPage() {
  notFound();
}

/*
  Contenido original (placeholder) a recuperar cuando existan fichas reales:

  import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";
  import { WaLink } from "@/components/ui/WaLink";
  import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

  type Params = { params: Promise<{ slug: string }> };

  export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    return {
      title: `Profesor · ${slug}`,
      description: "Perfil del profesor de NEXUS VNG.",
      alternates: { canonical: `/profesores/${slug}` },
    };
  }

  export default async function ProfesorPage({ params }: Params) {
    const { slug } = await params;

    return (
      <SupportPage eyebrow="Profesor" title="Nombre Apellido">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <PhotoPlaceholder label={`[ foto · ${slug} ]`} tint="warm" className="min-h-[360px] rounded-lg p-3" />
          <div className="space-y-4">
            <PlaceholderNote>
              Bio del profesor: trayectoria, modalidades que imparte, estilo de enseñanza. Se
              completará con el cliente.
            </PlaceholderNote>
            <WaLink origin="contacto" variant="red" className="px-7 py-[15px]">
              Pregúntale por una clase
            </WaLink>
          </div>
        </div>
      </SupportPage>
    );
  }
*/

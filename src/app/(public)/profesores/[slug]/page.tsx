import type { Metadata } from "next";
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

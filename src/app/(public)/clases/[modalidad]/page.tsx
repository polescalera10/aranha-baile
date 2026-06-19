import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPage, PlaceholderNote } from "@/components/layout/SupportPage";
import { WaLink } from "@/components/ui/WaLink";
import { JsonLd, courseLd } from "@/components/seo/JsonLd";
import { getModalidadBySlug, getModalidadSlugs } from "@/lib/queries/modalidades";

export const revalidate = 3600;

type Params = { params: Promise<{ modalidad: string }> };

export async function generateStaticParams() {
  const slugs = await getModalidadSlugs();
  return slugs.map((modalidad) => ({ modalidad }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { modalidad } = await params;
  const m = await getModalidadBySlug(modalidad);
  if (!m) return { title: "Clase no encontrada" };
  return {
    title: `Clases de ${m.nombre} en Vilanova i la Geltrú`,
    description: m.descripcion ?? undefined,
    alternates: { canonical: `/clases/${m.slug}` },
    openGraph: { title: `Clases de ${m.nombre}`, description: m.descripcion ?? undefined },
  };
}

export default async function ModalidadPage({ params }: Params) {
  const { modalidad } = await params;
  const m = await getModalidadBySlug(modalidad);
  if (!m) notFound();

  return (
    <SupportPage eyebrow="Modalidad" title={m.nombre} intro={m.descripcion ?? undefined}>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <PlaceholderNote>
            Descripción extendida de la clase de {m.nombre}: para quién es, qué aprenderás, niveles
            disponibles, profesores y horarios. Se completará con el cliente.
          </PlaceholderNote>
          <PlaceholderNote>
            Galería / vídeo de la modalidad. PLACEHOLDER: imágenes reales a color.
          </PlaceholderNote>
        </div>
        <aside className="h-fit rounded-lg border border-text-strong/8 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl text-text-strong">¿Te animas?</h2>
          <p className="mt-2 font-body text-[15px] text-text-muted">
            Primera clase de prueba gratis. Escríbenos y te decimos el mejor día para tu nivel.
          </p>
          <WaLink origin="modalidad" extra={`de ${m.nombre}`} variant="red" className="mt-4 w-full py-[15px]">
            Probar {m.nombre}
          </WaLink>
        </aside>
      </div>
      <JsonLd data={courseLd(m.nombre, m.descripcion ?? "", m.slug)} />
    </SupportPage>
  );
}

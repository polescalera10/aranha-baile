import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCampana, listCampanaParams } from "@/content/campanas";
import { CampanaHero } from "@/components/campanas/CampanaHero";
import { CampanaAgitacion } from "@/components/campanas/CampanaAgitacion";
import { AntesDespues } from "@/components/campanas/AntesDespues";
import { ClaseRecomendada } from "@/components/campanas/ClaseRecomendada";
import { DolorSolucion } from "@/components/campanas/DolorSolucion";
import { ComoFunciona } from "@/components/campanas/ComoFunciona";
import { CampanaObjecion } from "@/components/campanas/CampanaObjecion";
import { PruebaSocial } from "@/components/campanas/PruebaSocial";
import { CampanaFounding } from "@/components/campanas/CampanaFounding";
import { CampanaFaq } from "@/components/campanas/CampanaFaq";
import { CampanaCta } from "@/components/campanas/CampanaCta";
import { CampanaSticky } from "@/components/campanas/CampanaSticky";

export const revalidate = 3600;

type Params = { params: Promise<{ icp: string; dolor: string }> };

/** Genera las 30 rutas /l/[icp]/[dolor] a partir del mapa de contenido. */
export async function generateStaticParams() {
  return listCampanaParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { icp, dolor } = await params;
  const c = getCampana(icp, dolor);
  if (!c) return { title: "Página no encontrada" };

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Landings de campaña (pago): fuera de indexación y del sitemap.
    robots: { index: false, follow: true },
    openGraph: { title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function CampanaPage({ params }: Params) {
  const { icp, dolor } = await params;
  const c = getCampana(icp, dolor);
  if (!c) notFound();

  return (
    <>
      <CampanaHero
        headline={c.headline}
        subhead={c.subhead}
        ctaLabel={c.ctaHero}
        mensajeWhatsapp={c.mensajeWhatsapp}
      />
      {/* PAS: agitar el dolor → contraste antes/después → la clase que lo resuelve. */}
      <CampanaAgitacion kicker={c.agitacion.kicker} parrafos={c.agitacion.parrafos} />
      <AntesDespues data={c.antesDespues} />
      <ClaseRecomendada clase={c.clase} mensajeWhatsapp={c.mensajeWhatsapp} />
      <DolorSolucion items={c.dolorSolucion} />
      <ComoFunciona />
      <CampanaObjecion pregunta={c.objecion.pregunta} respuesta={c.objecion.respuesta} />
      {c.pruebaSocial && <PruebaSocial texto={c.pruebaSocial} />}
      <CampanaFounding mensajeWhatsapp={c.mensajeWhatsapp} />
      <CampanaFaq items={c.faqExtra} />
      <CampanaCta
        cierreEmocional={c.cierreEmocional}
        ctaLabel={c.ctaHero}
        mensajeWhatsapp={c.mensajeWhatsapp}
        icp={icp}
        dolor={dolor}
      />
      <CampanaSticky mensaje={c.mensajeWhatsapp} />
    </>
  );
}

import { Hero } from "@/components/landing/Hero";
import { ParaTi } from "@/components/landing/ParaTi";
import { Experiencia } from "@/components/landing/Experiencia";
import { Modalidades } from "@/components/landing/Modalidades";
import { Comunidad } from "@/components/landing/Comunidad";
import { Profesores } from "@/components/landing/Profesores";
import { Founding } from "@/components/landing/Founding";
import { ComoEmpezar } from "@/components/landing/ComoEmpezar";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal } from "@/components/landing/CtaFinal";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";
import { getModalidades } from "@/lib/queries/modalidades";
import { faqs } from "@/content/landing";

// ISR: la landing es estática y se revalida cada hora (modalidades editables).
export const revalidate = 3600;

export default async function HomePage() {
  const modalidades = await getModalidades();

  return (
    <main>
      <Hero />
      <ParaTi />
      <Experiencia />
      <Modalidades modalidades={modalidades} />
      <Comunidad />
      <Profesores />
      <Founding />
      <ComoEmpezar />
      <Faq />
      <CtaFinal />
      <JsonLd data={faqLd(faqs)} />
    </main>
  );
}

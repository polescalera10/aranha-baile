import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { Accordion } from "@/components/ui/Accordion";
import { WaLink } from "@/components/ui/WaLink";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/landing";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Dónde estamos, edades, niveles y qué llevar a tu primera clase de baile.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <SupportPage
      eyebrow="Antes de escribir"
      title="Preguntas frecuentes"
      intro="Lo que más nos preguntáis. Si te queda alguna duda, escríbenos por WhatsApp."
    >
      <div className="mx-auto max-w-[780px]">
        <Accordion items={faqs} />
        <div className="mt-10 flex justify-center">
          <WaLink origin="contacto" variant="red" className="px-7 py-[15px]">
            Tengo otra duda
          </WaLink>
        </div>
      </div>
      <JsonLd data={faqLd(faqs)} />
    </SupportPage>
  );
}

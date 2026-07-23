import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { LeadForm } from "@/components/forms/LeadForm";
import { WaLink } from "@/components/ui/WaLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos por WhatsApp o déjanos tus datos. Te respondemos rápido.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <SupportPage
      eyebrow="Hablemos"
      title="Contacto"
      intro="La vía más rápida es WhatsApp. Si lo prefieres, déjanos tus datos y te escribimos."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl text-text-strong">Escríbenos</h2>
          <p className="mt-2 max-w-[42ch] font-body text-[15px] text-text-muted">
            Reserva tu primera clase de prueba y da tus primeros pasos con nosotros.
          </p>
          <WaLink origin="contacto" variant="red" className="mt-4 px-7 py-[15px]">
            Abrir WhatsApp
          </WaLink>

          <div className="mt-8 space-y-1 font-body text-sm text-text-body">
            <p className="font-semibold text-text-strong">Dónde estamos</p>
            <address className="not-italic leading-7 text-text-muted">
              {site.nap.venue}
              {/* La calle solo se pinta cuando esté confirmada en lib/site.ts. */}
              {site.nap.streetAddress && (
                <>
                  <br />
                  {site.nap.streetAddress}
                </>
              )}
              <br />
              {site.nap.postalCode} {site.nap.addressLocality} ({site.nap.addressRegion})
              <br />
              {site.nap.telephoneDisplay}
            </address>
          </div>
        </div>

        <div className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-card sm:p-8">
          <h2 className="mb-4 font-display text-2xl text-text-strong">Déjanos tus datos</h2>
          <LeadForm origen="contacto" withModalidad withMensaje />
        </div>
      </div>
    </SupportPage>
  );
}

import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { WaLink } from "@/components/ui/WaLink";
import { levels } from "@/content/landing";

export const metadata: Metadata = {
  title: "Horarios",
  description: "Horarios de las clases de baile de NEXUS VNG en Vilanova i la Geltrú.",
  alternates: { canonical: "/horarios" },
};

export default function HorariosPage() {
  return (
    <SupportPage
      eyebrow="Cuándo"
      title="Horarios"
      intro="Estamos cerrando el cuadro definitivo de horarios de la temporada. Mientras tanto, dinos qué quieres bailar y tu disponibilidad, y te proponemos grupo."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <h2 className="font-display text-3xl text-text-strong">Grupos por nivel real</h2>
          <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-body">
            Cada disciplina se organiza en grupos por nivel, para que avances a tu ritmo y nunca te
            sientas ni perdido ni frenado. Cuando nos escribas, te ubicamos en el grupo que mejor
            encaja contigo.
          </p>
          <ul className="space-y-3">
            {levels.map((l) => (
              <li key={l.n} className="flex items-center gap-4">
                <span className="font-display text-2xl text-neon-mint">{l.n}</span>
                <span className="font-body text-[15px] font-semibold text-text-strong">{l.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-lg border border-white/8 bg-bg-panel p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-text-strong">Encuentra tu hueco</h2>
          <p className="mt-2 font-body text-[15px] text-text-muted">
            Escríbenos con tu disponibilidad y la disciplina que te interesa, y te decimos qué
            grupos encajan con tu agenda.
          </p>
          <WaLink origin="nav" variant="red" className="mt-4 w-full py-[15px]">
            Consultar horarios
          </WaLink>
        </aside>
      </div>

      {/*
        TODO: tabla / calendario de horarios por modalidad y nivel, alimentada de
        la tabla `clases` de Supabase, cuando el cuadro definitivo esté cerrado.
        <PlaceholderNote>
          Tabla / calendario de horarios por modalidad y nivel. Se alimentará de la tabla{" "}
          <code className="font-mono text-sm">clases</code> de Supabase.
        </PlaceholderNote>
      */}
    </SupportPage>
  );
}

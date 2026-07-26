import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import { InterestLeadForm } from "@/components/forms/InterestLeadForm";
import { intensivos, intensivosGrupos } from "@/content/intensivos";

export const metadata: Metadata = {
  title: "Intensivos de Agosto",
  description:
    "8 intensivos de baile en agosto en Vilanova i la Geltrú: salsa, bachata, reparto, heels y más. Dos semanas, cada día un estilo. Reserva tu plaza.",
  alternates: { canonical: "/intensivos" },
};

const beneficios = [
  {
    n: "01",
    title: "Aprende rápido, de una sentada",
    text: "Dos horas por sesión centradas en un solo estilo. Concentras el aprendizaje y sales bailando de verdad, no con la teoría a medias.",
    accent: "text-neon",
  },
  {
    n: "02",
    title: "Prueba antes de decidir",
    text: "¿No sabes qué estilo es para ti? Cada día uno distinto. Descúbrelos sin comprometerte a un curso entero.",
    accent: "text-neon-mint",
  },
  {
    n: "03",
    title: "Sin verano perdido",
    text: "Agosto no tiene por qué ser un parón. Muévete, conoce gente y llega a septiembre con el cuerpo activado y una comunidad nueva.",
    accent: "text-neon-lime",
  },
];

export default function IntensivosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/6 bg-bg-panel pb-[clamp(48px,8vw,88px)] pt-[clamp(48px,8vw,80px)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(48,228,236,.12),transparent_70%)]" />
          <div className="container-nexus relative z-[1]">
            <Reveal
              as="span"
              className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon-mint"
            >
              Nexus VNG · Vilanova i la Geltrú
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-3 max-w-[16ch] text-balance font-display text-[clamp(44px,8vw,88px)] leading-[0.92]">
                Intensivos <span className="text-gradient-nexus">Agosto</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[54ch] font-body text-[clamp(16px,1.6vw,20px)] leading-relaxed text-white/80">
                Dos semanas, ocho estilos, un intensivo cada día de 19:30 a 21:30. Ven a por el que
                te llama —o a por todos— y aprovecha agosto para desbloquear tu baile.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#reservar"
                  className="inline-flex items-center justify-center rounded-md bg-neon px-7 py-[15px] font-body text-base font-bold text-ink shadow-neon transition-transform duration-200 hover:-translate-y-0.5 no-underline"
                >
                  Reservar mi plaza
                </a>
                <span className="font-body text-sm text-white/60">
                  Plazas limitadas por aforo de sala.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Por qué */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(28px,4vw,44px)] leading-tight text-text-strong">
                Un intensivo hace en dos horas lo que otros meses no logran
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {beneficios.map((b, idx) => (
                <Reveal
                  key={b.n}
                  delay={idx * 0.06}
                  className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft"
                >
                  <div className={`font-display text-2xl font-bold ${b.accent}`}>{b.n}</div>
                  <h3 className="mt-3 font-display text-xl text-text-strong">{b.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-text-muted">
                    {b.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sesiones por semana */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus space-y-12">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] text-text-strong">
                El calendario, día a día
              </h2>
              <p className="mt-3 max-w-[60ch] font-body text-base text-text-muted">
                Cada sesión es independiente: apúntate a las que te interesen. Todas de 19:30 a
                21:30.
              </p>
            </Reveal>

            {intensivos.map((semana) => (
              <div key={semana.label} className="space-y-6">
                <Reveal className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/8 pb-3">
                  <h3 className="font-body text-sm font-bold uppercase tracking-[0.16em] text-neon">
                    {semana.label}
                  </h3>
                  <span className="font-body text-sm text-text-muted">{semana.rango}</span>
                </Reveal>
                <div className="grid gap-5 sm:grid-cols-2">
                  {semana.sesiones.map((s, idx) => (
                    <Reveal
                      key={s.value}
                      delay={idx * 0.05}
                      className="flex gap-4 rounded-lg border border-white/8 bg-bg-base p-5 shadow-soft transition-colors hover:border-neon/30"
                    >
                      <div className="flex w-14 shrink-0 flex-col items-center rounded-sm bg-bg-elevated px-2 py-2 text-center">
                        <span className="font-body text-[11px] font-bold uppercase tracking-wide text-neon-mint">
                          {s.dia.split(" ")[0]}
                        </span>
                        <span className="font-display text-2xl leading-none text-text-strong">
                          {s.dia.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display text-xl text-text-strong">{s.estilo}</h4>
                          {s.nivel && (
                            <span className="rounded-full border border-neon/40 px-2 py-0.5 font-body text-[11px] font-bold text-neon">
                              {s.nivel}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 font-body text-[13px] text-text-muted">
                          {s.profes} · {s.hora}
                        </p>
                        <p className="mt-2 font-body text-[14px] leading-relaxed text-text-body">
                          {s.desc}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulario */}
        <section id="reservar" className="scroll-mt-24 bg-bg-base py-[clamp(48px,8vw,96px)]">
          <div className="container-nexus grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <Reveal>
                <h2 className="font-display text-[clamp(30px,4.5vw,48px)] leading-tight text-text-strong">
                  Reserva tu plaza en los intensivos
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="max-w-[52ch] font-body text-base leading-relaxed text-text-muted">
                  Marca los intensivos que te interesen y déjanos tus datos. Te confirmamos plaza y
                  te contamos todo lo que necesitas. Las plazas son limitadas por el aforo de la
                  sala.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-body text-sm text-text-muted">
                  ¿Prefieres preguntar antes?{" "}
                  <WaLink origin="nav" variant="outline" showGlyph={false} className="px-4 py-2 text-sm">
                    Escríbenos por WhatsApp
                  </WaLink>
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="rounded-xl border border-white/8 bg-bg-panel p-6 shadow-card sm:p-8">
              <InterestLeadForm
                origen="intensivos"
                groups={intensivosGrupos}
                submitLabel="Reservar mi plaza"
              />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import { Precios } from "@/components/landing/Precios";
import { InterestLeadForm } from "@/components/forms/InterestLeadForm";
import {
  cursoRegularGrupos,
  diasSemana,
  familiaColor,
  horarioRegular,
} from "@/content/horario-regular";
import { getModalidades } from "@/lib/queries/modalidades";

export const metadata: Metadata = {
  title: "Clases de Baile · Curso Regular",
  description:
    "Curso regular de baile en Vilanova i la Geltrú, temporada 26·27: salsa cubana, bachata, reggaetón, heels y más, de lunes a viernes. Grupos desde cero absoluto. Apúntate desde 35 €/mes.",
  alternates: { canonical: "/clases" },
};

// Revalidar cada hora por si cambian las modalidades en Supabase.
export const revalidate = 3600;

const razones = [
  {
    n: "01",
    title: "Constancia que se nota",
    text: "Una clase suelta motiva; el curso regular transforma. Cada semana avanzas sobre lo anterior y en pocos meses bailas de verdad, no de milagro.",
    accent: "text-neon",
  },
  {
    n: "02",
    title: "Tu grupo, tu gente",
    text: "Vienes cada semana con las mismas caras. Llegas solo y a las pocas clases el finde ya empieza en la pista. La comunidad es el mejor motivo para no faltar.",
    accent: "text-neon-mint",
  },
  {
    n: "03",
    title: "Desde cero absoluto",
    text: "Grupos por nivel real, sin presión y sin ridículos. Empieces donde empieces, hay un hueco pensado para ti — y profes que te acompañan.",
    accent: "text-neon-lime",
  },
];

export default async function ClasesPage() {
  const modalidades = await getModalidades();

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero de ventas */}
        <section className="relative overflow-hidden border-b border-white/6 bg-bg-panel pb-[clamp(48px,8vw,88px)] pt-[clamp(48px,8vw,80px)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgba(113,233,201,.12),transparent_70%)]" />
          <div className="container-nexus relative z-[1]">
            <Reveal
              as="span"
              className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon-mint"
            >
              Curso regular · Temporada 26·27 · Vilanova i la Geltrú
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-3 max-w-[18ch] text-balance font-display text-[clamp(40px,7vw,80px)] leading-[0.92]">
                Aprende a bailar y <span className="text-gradient-nexus">encuentra tu gente</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[56ch] font-body text-[clamp(16px,1.6vw,20px)] leading-relaxed text-white/80">
                Salsa cubana, bachata, urbano y estilo, de lunes a viernes, con grupos desde cero
                absoluto. La mejor decisión de este año no es un propósito más: son dos horas a la
                semana para ti.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#apuntarme"
                  className="inline-flex items-center justify-center rounded-md bg-neon px-7 py-[15px] font-body text-base font-bold text-ink shadow-neon transition-transform duration-200 hover:-translate-y-0.5 no-underline"
                >
                  Quiero apuntarme
                </a>
                <span className="font-body text-sm text-white/60">
                  Desde 35 €/mes · sin presión, sin permanencia.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Por qué apuntarse */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-[clamp(28px,4vw,44px)] leading-tight text-text-strong">
                Por qué apuntarte es lo mejor que puedes hacer
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {razones.map((r, idx) => (
                <Reveal
                  key={r.n}
                  delay={idx * 0.06}
                  className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft"
                >
                  <div className={`font-display text-2xl font-bold ${r.accent}`}>{r.n}</div>
                  <h3 className="mt-3 font-display text-xl text-text-strong">{r.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-text-muted">
                    {r.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Estilos que puedes bailar (cards → detalle SEO) */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus space-y-8">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] text-text-strong">
                Estilos que puedes bailar
              </h2>
              <p className="mt-3 max-w-[60ch] font-body text-base text-text-muted">
                Elige uno, combínalos o llévatelos todos con la tarifa plana. Entra en cualquiera
                para ver de qué va y a quién le encaja.
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modalidades.map((m, idx) => (
                <Reveal
                  key={m.slug}
                  delay={idx * 0.05}
                  className="flex flex-col justify-between rounded-lg border border-white/8 bg-bg-base p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-card"
                >
                  <div>
                    <h3 className="mb-2 font-display text-2xl text-text-strong">{m.nombre}</h3>
                    <p className="mb-6 font-body text-[14px] leading-relaxed text-text-muted">
                      {m.descripcion}
                    </p>
                  </div>
                  <Link
                    href={`/clases/${m.slug}`}
                    className="mt-auto inline-flex items-center font-body text-sm font-bold text-neon no-underline hover:underline"
                  >
                    Ver {m.nombre} &rarr;
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Horario de la temporada */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus space-y-8">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] text-text-strong">
                Horario de la temporada
              </h2>
              <p className="mt-3 max-w-[60ch] font-body text-base text-text-muted">
                De lunes a viernes, de 18:30 a 21:30. Elige tu estilo y tu franja; nosotros te
                ubicamos en el grupo de tu nivel.
              </p>
            </Reveal>

            <Reveal className="overflow-x-auto">
              <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-2">
                <thead>
                  <tr>
                    <th className="w-[68px] px-2 py-2 text-left font-body text-[11px] font-bold uppercase tracking-wider text-text-faint">
                      Hora
                    </th>
                    {diasSemana.map((dia) => (
                      <th
                        key={dia}
                        className="rounded-sm bg-bg-elevated px-3 py-2 text-center font-display text-base text-text-strong"
                      >
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horarioRegular.map((franja) => (
                    <tr key={franja.hora}>
                      <td className="px-2 py-2 align-middle font-display text-lg text-text-muted">
                        {franja.hora}
                      </td>
                      {franja.clases.map((clase, i) => (
                        <td key={i} className="align-top">
                          {clase ? (
                            <div className="flex h-full min-h-[66px] flex-col rounded-sm border border-white/8 bg-bg-panel px-3 py-3 transition-colors hover:border-neon/30">
                              <p
                                className={`font-body text-sm font-bold leading-tight ${familiaColor[clase.familia]}`}
                              >
                                {clase.estilo}
                              </p>
                              <p className="mt-1 font-body text-[12px] text-text-muted">
                                {clase.profes}
                              </p>
                            </div>
                          ) : (
                            <div className="h-full min-h-[66px] rounded-sm border border-dashed border-white/5" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal>
              <p className="font-body text-[13px] text-text-faint">
                Grupos desde cero absoluto · sin presión. ¿No ves tu hueco? Escríbenos y lo
                encontramos.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Precios */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus">
            <Precios />
          </div>
        </section>

        {/* Formulario */}
        <section id="apuntarme" className="scroll-mt-24 bg-bg-base py-[clamp(48px,8vw,96px)]">
          <div className="container-nexus grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <Reveal>
                <h2 className="font-display text-[clamp(30px,4.5vw,48px)] leading-tight text-text-strong">
                  Apúntate al curso
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="max-w-[52ch] font-body text-base leading-relaxed text-text-muted">
                  Marca los estilos que te interesan y déjanos tus datos. Te escribimos para
                  ubicarte en tu grupo por nivel y resolver cualquier duda antes de empezar.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-body text-sm text-text-muted">
                  ¿Prefieres preguntar antes?{" "}
                  <WaLink
                    origin="nav"
                    variant="outline"
                    showGlyph={false}
                    className="px-4 py-2 text-sm"
                  >
                    Escríbenos por WhatsApp
                  </WaLink>
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={0.1}
              className="rounded-xl border border-white/8 bg-bg-panel p-6 shadow-card sm:p-8"
            >
              <InterestLeadForm
                origen="curso-regular"
                groups={cursoRegularGrupos}
                submitLabel="Apuntarme al curso"
              />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

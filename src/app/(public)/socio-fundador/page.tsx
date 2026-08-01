import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Countdown } from "@/components/ui/Countdown";
import { WaLink } from "@/components/ui/WaLink";
import { InterestLeadForm } from "@/components/forms/InterestLeadForm";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";
import { founding } from "@/content/landing";
import { precios } from "@/content/precios";
import { ahorro, plazas, socioFundador as c } from "@/content/socio-fundador";
import { cursoRegularGrupos } from "@/content/horario-regular";

export const metadata: Metadata = {
  title: "Socio Fundador · 10 plazas a 85 €/mes",
  description:
    "Solo 10 plazas de socio fundador en NEXUS VNG (Vilanova i la Geltrú): todas las disciplinas de tu nivel por 85 €/mes en vez de 100 €, con la cuota bloqueada mientras sigas de alta. Reserva la tuya.",
  alternates: { canonical: "/socio-fundador" },
  openGraph: {
    title: "Socio Fundador de NEXUS VNG · 10 plazas a 85 €/mes",
    description:
      "Todas las disciplinas de tu nivel por 85 €/mes, con la cuota bloqueada mientras sigas de alta. Solo 10 plazas.",
    url: "/socio-fundador",
  },
};

/** Barra de plazas: mínimo visual del 6 % para que la barra se vea aunque esté a 0. */
const tomadasPct = Math.max(6, Math.round(((plazas.total - plazas.left) / plazas.total) * 100));

export default function SocioFundadorPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── Hero de venta: promesa + tarjeta de precio ─────────────── */}
        <section className="relative overflow-hidden border-b border-white/6 bg-bg-panel pb-[clamp(48px,8vw,88px)] pt-[clamp(40px,7vw,76px)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_20%_0%,rgba(113,233,201,.16),transparent_70%)]" />
          <div className="container-nexus relative z-[1] grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal
                as="span"
                className="inline-block rounded-full border border-neon-lime/40 bg-neon-lime/10 px-3.5 py-[7px] font-body text-[11px] font-extrabold uppercase tracking-[0.14em] text-neon-lime"
              >
                {c.hero.kicker}
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(40px,7.5vw,80px)] leading-[0.92]">
                  {c.hero.title}{" "}
                  <span className="text-gradient-nexus">{c.hero.titleAccent}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-[54ch] font-body text-[clamp(16px,1.6vw,20px)] leading-relaxed text-white/80">
                  {c.hero.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href="#reservar"
                    className="inline-flex min-h-12 items-center justify-center rounded-md bg-neon px-7 py-[15px] font-body text-base font-bold text-ink no-underline shadow-neon transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {c.hero.cta}
                  </a>
                  <WaLink
                    origin="founding"
                    variant="outline"
                    className="min-h-12 px-6 py-[14px] text-[15px]"
                  >
                    Preguntar por WhatsApp
                  </WaLink>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="mt-4 font-body text-sm text-white/55">{c.hero.ctaNote}</p>
              </Reveal>
            </div>

            {/* Tarjeta de oferta: el bloque premium de la página. */}
            <Reveal
              delay={0.1}
              className="rounded-xl border-[1.5px] border-neon-lime/45 bg-[linear-gradient(180deg,#16161b,#0d0d10)] p-[clamp(24px,4vw,36px)] shadow-glow"
            >
              <div className="flex justify-center">
                <span className="rounded-full border border-neon-lime/40 bg-neon-lime/10 px-3.5 py-[7px] text-center font-body text-[11px] font-extrabold uppercase tracking-[0.12em] text-neon-lime">
                  {founding.badge}
                </span>
              </div>

              <div className="mt-5 flex items-baseline justify-center gap-2.5">
                <span className="font-display text-[clamp(54px,9vw,76px)] leading-none text-neon-mint">
                  {founding.price}
                </span>
                <span className="font-body text-[17px] text-white/65">/mes</span>
                {founding.priceOld && (
                  <span className="font-body text-[19px] text-white/40 line-through">
                    {founding.priceOld}
                  </span>
                )}
              </div>
              <p className="mt-2 text-center font-body text-[13px] text-white/60">
                Tarifa plana: todas las disciplinas de tu nivel.
              </p>

              {/* Cuenta atrás: solo si hay fecha de cierre real. */}
              {founding.deadline && (
                <>
                  <div className="mt-6 text-center font-body text-xs font-semibold uppercase tracking-[0.05em] text-white/60">
                    {founding.deadlineLabel}
                  </div>
                  <Countdown deadline={founding.deadline} />
                </>
              )}

              <div className="mt-6">
                <div className="mb-2 flex justify-between font-body text-xs text-white/65">
                  <span>Plazas fundadoras</span>
                  <span>
                    Quedan {plazas.left} / {plazas.total}
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-white/8"
                  role="img"
                  aria-label={`Quedan ${plazas.left} de ${plazas.total} plazas fundadoras`}
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-neon-lime via-neon-mint to-neon"
                    style={{ width: `${tomadasPct}%` }}
                  />
                </div>
              </div>

              <p className="mt-6 text-center font-body text-sm leading-relaxed text-white/70">
                {founding.urgencyNote}
              </p>

              <a
                href="#reservar"
                className="mt-6 inline-flex w-full min-h-12 items-center justify-center rounded-md bg-neon-lime px-6 py-[16px] font-body text-base font-bold text-ink no-underline shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
              >
                {c.form.submitLabel}
              </a>
              <p className="mt-3 text-center font-body text-xs text-white/50">
                {founding.finePrint}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── La promesa explicada ───────────────────────────────────── */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus max-w-[820px]">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(28px,4.4vw,46px)] leading-tight text-text-strong">
                {c.promesa.title}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 font-body text-[clamp(15px,1.5vw,18px)] leading-relaxed text-text-muted">
                {c.promesa.body}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 font-body text-[clamp(15px,1.5vw,18px)] leading-relaxed text-text-muted">
                {c.promesa.body2}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Beneficios ─────────────────────────────────────────────── */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-[clamp(28px,4.4vw,46px)] leading-tight text-text-strong">
                {c.beneficios.title}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
              {c.beneficios.items.map((b, idx) => (
                <Reveal
                  key={b.n}
                  delay={idx * 0.05}
                  className="rounded-lg border border-white/8 bg-bg-base p-6 shadow-soft"
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

        {/* ── Comparativa fundador vs estándar ───────────────────────── */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus max-w-[900px] space-y-8">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4.4vw,46px)] leading-tight text-text-strong">
                {c.comparativa.title}
              </h2>
              <p className="mt-3 max-w-[58ch] font-body text-base text-text-muted">
                La misma escuela, las mismas clases y los mismos profes. Lo único que cambia es
                cuándo entras.
              </p>
            </Reveal>

            {/* La tabla se desplaza dentro de su caja, nunca la página. */}
            <Reveal
              className="overflow-x-auto focus-visible:outline-neon"
              role="region"
              aria-label="Comparativa entre plaza fundadora y alta normal"
              tabIndex={0}
            >
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-3 py-3 font-body text-[11px] font-bold uppercase tracking-wider text-text-faint">
                      &nbsp;
                    </th>
                    <th className="rounded-t-sm bg-neon-lime/10 px-4 py-3 font-display text-lg text-neon-lime">
                      Socio fundador
                    </th>
                    <th className="px-4 py-3 font-display text-lg text-text-muted">Alta normal</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparativa.filas.map((f) => (
                    <tr key={f.concepto} className="border-b border-white/6">
                      <td className="px-3 py-4 font-body text-[13px] font-semibold text-text-body">
                        {f.concepto}
                      </td>
                      <td className="bg-neon-lime/5 px-4 py-4 font-body text-[14px] font-semibold text-text-strong">
                        {f.fundador}
                      </td>
                      <td className="px-4 py-4 font-body text-[14px] text-text-muted">
                        {f.estandar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-lg border border-neon-lime/20 bg-neon-lime/5 p-5">
                <p className="font-body text-[15px] leading-relaxed text-text-body">
                  <strong className="text-neon-lime">
                    {ahorro.mes} € al mes · {ahorro.anio} € al año.
                  </strong>{" "}
                  Esa es la diferencia entre entrar ahora y entrar cuando se agoten las plazas — y
                  se repite cada año que sigas bailando con nosotros.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ¿Es para ti? ───────────────────────────────────────────── */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus max-w-[900px]">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4.4vw,46px)] leading-tight text-text-strong">
                {c.paraQuien.title}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Reveal
                delay={0.06}
                className="rounded-lg border border-neon-mint/25 bg-bg-base p-6 shadow-soft"
              >
                <h3 className="font-display text-xl text-neon-mint">{c.paraQuien.si.title}</h3>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {c.paraQuien.si.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 text-base leading-none text-neon-mint">
                        ✓
                      </span>
                      <span className="font-body text-[14px] leading-relaxed text-text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal
                delay={0.12}
                className="rounded-lg border border-white/8 bg-bg-base p-6 shadow-soft"
              >
                <h3 className="font-display text-xl text-text-muted">{c.paraQuien.no.title}</h3>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {c.paraQuien.no.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 text-base leading-none text-text-faint">
                        ·
                      </span>
                      <span className="font-body text-[14px] leading-relaxed text-text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <p className="mt-6 font-body text-sm text-text-faint">
                ¿Solo quieres un estilo?{" "}
                <Link href="/clases" className="font-semibold text-neon no-underline hover:underline">
                  Mira las tarifas sueltas desde {precios.base} €/mes
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Cómo se coge la plaza ──────────────────────────────────── */}
        <section className="bg-bg-base py-[clamp(48px,8vw,88px)]">
          <div className="container-nexus">
            <Reveal>
              <h2 className="font-display text-[clamp(28px,4.4vw,46px)] leading-tight text-text-strong">
                {c.pasos.title}
              </h2>
            </Reveal>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {c.pasos.items.map((p, idx) => (
                <Reveal
                  key={p.n}
                  delay={idx * 0.06}
                  className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neon/10 font-display text-lg text-neon">
                    {p.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-text-strong">{p.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-text-muted">
                    {p.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Objeciones ─────────────────────────────────────────────── */}
        <section className="bg-bg-panel py-[clamp(48px,8vw,88px)]">
          <div className="mx-auto w-full max-w-[780px] px-[clamp(20px,5vw,56px)]">
            <Reveal
              as="span"
              className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon"
            >
              Antes de decidir
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3.5 font-display text-[clamp(30px,5vw,56px)] leading-[0.98] text-text-strong">
                Todo lo que sueles preguntar
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="mt-[26px]">
              <Accordion items={[...c.faqs]} />
            </Reveal>
          </div>
        </section>

        {/* ── Formulario ─────────────────────────────────────────────── */}
        <section id="reservar" className="scroll-mt-24 bg-bg-base py-[clamp(48px,8vw,96px)]">
          <div className="container-nexus grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <Reveal
                as="span"
                className="inline-block rounded-full border border-neon-lime/40 bg-neon-lime/10 px-3.5 py-[7px] font-body text-[11px] font-extrabold uppercase tracking-[0.14em] text-neon-lime"
              >
                {c.form.kicker}
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display text-[clamp(30px,4.5vw,48px)] leading-tight text-text-strong">
                  {c.form.title}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="max-w-[52ch] font-body text-base leading-relaxed text-text-muted">
                  {c.form.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="rounded-lg border border-white/8 bg-bg-panel p-5">
                  <p className="font-body text-[15px] text-text-body">
                    <strong className="text-neon-mint">{founding.price}/mes</strong>{" "}
                    <span className="text-text-faint line-through">{founding.priceOld}</span> ·
                    todas las disciplinas de tu nivel · cuota bloqueada mientras sigas de alta.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="font-body text-sm text-text-muted">
                  {c.form.fallback}{" "}
                  <WaLink
                    origin="founding"
                    variant="outline"
                    showGlyph={false}
                    className="min-h-11 px-4 py-2 text-sm"
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
                origen="socio-fundador"
                groups={cursoRegularGrupos}
                submitLabel={c.form.submitLabel}
                interesesLabel={c.form.interesesLabel}
                interesesHelp={c.form.interesesHelp}
              />
            </Reveal>
          </div>
        </section>

        <JsonLd data={faqLd([...c.faqs])} />
      </main>
    </>
  );
}

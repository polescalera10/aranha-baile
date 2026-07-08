import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SupportPage } from "@/components/layout/SupportPage";
import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import { JsonLd, courseLd } from "@/components/seo/JsonLd";
import { getModalidades, getModalidadBySlug, getModalidadSlugs } from "@/lib/queries/modalidades";
import { modalidadesContenido } from "@/content/modalidades";
import { founding } from "@/content/landing";

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
  const contenido = modalidadesContenido[m.slug];
  const description = contenido?.lead ?? m.descripcion ?? undefined;
  return {
    title: `Clases de ${m.nombre} en Vilanova i la Geltrú`,
    description,
    alternates: { canonical: `/clases/${m.slug}` },
    openGraph: { title: `Clases de ${m.nombre}`, description },
  };
}

export default async function ModalidadPage({ params }: Params) {
  const { modalidad } = await params;
  const m = await getModalidadBySlug(modalidad);
  if (!m) notFound();

  // Contenido editorial largo (content/modalidades.ts). Puede no existir si la
  // modalidad se creó en la BD sin redactar aún su página.
  const contenido = modalidadesContenido[m.slug];
  const otras = (await getModalidades()).filter((o) => o.slug !== m.slug);

  return (
    <SupportPage
      eyebrow="Modalidad"
      title={m.nombre}
      intro={contenido?.lead ?? m.descripcion ?? undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          {contenido ? (
            <>
              {/* ¿Qué es? */}
              <Reveal as="section" className="space-y-4">
                <h2 className="font-display text-3xl text-text-strong">{contenido.queEsTitle}</h2>
                {contenido.queEs.map((p) => (
                  <p key={p.slice(0, 32)} className="max-w-[70ch] font-body text-base leading-relaxed text-text-body">
                    {p}
                  </p>
                ))}
              </Reveal>

              {/* En clase aprenderás */}
              <Reveal as="section" className="space-y-4">
                <h2 className="font-display text-3xl text-text-strong">En clase aprenderás</h2>
                <ul className="space-y-3">
                  {contenido.aprenderas.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-red" aria-hidden />
                      <span className="max-w-[65ch] font-body text-[15px] leading-relaxed text-text-body">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Qué te llevas */}
              <Reveal as="section" className="space-y-5">
                <h2 className="font-display text-3xl text-text-strong">Qué te llevas</h2>
                <div className="space-y-5">
                  {contenido.beneficios.map((b) => (
                    <div key={b.title} className="max-w-[70ch]">
                      <h3 className="font-body text-[16px] font-bold normal-case tracking-normal text-text-strong">
                        {b.title}
                      </h3>
                      <p className="mt-1 font-body text-[15px] leading-relaxed text-text-body">{b.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* ¿Es para ti? — cierre persuasivo */}
              <Reveal as="section" className="rounded-lg bg-ink p-[clamp(24px,4vw,40px)] text-white">
                <h2 className="font-display text-3xl text-white">¿Es para ti?</h2>
                <p className="mt-3 max-w-[65ch] font-body text-[15px] leading-relaxed text-white/85">
                  {contenido.paraTi}
                </p>
                <WaLink origin="modalidad" extra={`de ${m.nombre}`} variant="red" className="mt-6 px-7 py-[15px]">
                  Probar una clase de {m.nombre}
                </WaLink>
              </Reveal>
            </>
          ) : (
            // Modalidad nueva en la BD sin contenido editorial todavía: layout genérico.
            <p className="max-w-[70ch] font-body text-base leading-relaxed text-text-body">
              {m.descripcion}
            </p>
          )}

          {/*
            TODO: galería / vídeo de la modalidad — pendiente de fotografía real a color.
            <PlaceholderNote>Galería / vídeo de la modalidad.</PlaceholderNote>
          */}
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-lg border border-text-strong/8 bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl text-text-strong">¿Te animas?</h2>
            <p className="mt-2 font-body text-[15px] text-text-muted">
              Reserva tu primera clase de prueba. Escríbenos y te asignamos el grupo ideal para tu
              nivel.
            </p>
            <WaLink origin="modalidad" extra={`de ${m.nombre}`} variant="red" className="mt-4 w-full py-[15px]">
              Probar {m.nombre}
            </WaLink>
            <p className="mt-4 border-t border-text-strong/8 pt-4 font-body text-[13px] leading-relaxed text-text-muted">
              Tarifa fundadora: <strong className="text-text-strong">{founding.price}/mes</strong>{" "}
              con acceso a todas las disciplinas de tu nivel — {m.nombre} incluida.
            </p>
          </div>

          {otras.length > 0 && (
            <nav className="rounded-lg border border-text-strong/8 bg-white p-6 shadow-soft" aria-label="Otras disciplinas">
              <h2 className="font-body text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
                Otras disciplinas
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otras.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/clases/${o.slug}`}
                      className="inline-block rounded-full border border-text-strong/12 px-3.5 py-[7px] font-body text-[13px] font-semibold text-text-body no-underline transition-colors hover:border-red hover:text-red"
                    >
                      {o.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
      <JsonLd data={courseLd(m.nombre, contenido?.lead ?? m.descripcion ?? "", m.slug)} />
    </SupportPage>
  );
}

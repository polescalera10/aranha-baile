import type { Metadata } from "next";
import Link from "next/link";
import { SupportPage } from "@/components/layout/SupportPage";
import { Reveal } from "@/components/ui/Reveal";
import { getModalidades } from "@/lib/queries/modalidades";

export const metadata: Metadata = {
  title: "Clases de Baile",
  description:
    "Aprende a bailar salsa cubana, bachata, reparto y más en Vilanova i la Geltrú. Conoce nuestros valores y encuentra tu estilo.",
  alternates: { canonical: "/clases" },
};

// Revalidar cada hora por si cambian las modalidades en Supabase
export const revalidate = 3600;

export default async function ClasesPage() {
  const modalidades = await getModalidades();

  return (
    <SupportPage
      eyebrow="Aprende con nosotros"
      title="Nuestras Clases"
      intro="Aprende a bailar a tu ritmo, sin presiones y en el mejor ambiente de Vilanova i la Geltrú. Encuentra el estilo que más va contigo."
    >
      <div className="space-y-16">
        {/* Sección de Valores y Puntos de Vista */}
        <section className="space-y-8">
          <Reveal>
            <h2 className="font-display text-3xl text-text-strong tracking-wide">
              Nuestra Filosofía de Aprendizaje
            </h2>
            <p className="mt-4 max-w-[70ch] font-body text-base text-text-muted leading-relaxed">
              En NEXUS VNG entendemos que dar el paso de entrar a una clase de baile puede dar vértigo. 
              Por eso, hemos diseñado un método enfocado en la calidez, la progresión natural y el disfrute. 
              Aquí no vienes a memorizar secuencias rígidas; vienes a sentir la música y conectar con los demás.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Reveal delay={0.06} className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neon/10 text-neon font-display text-xl font-bold">
                01
              </div>
              <h3 className="font-display text-xl text-text-strong">Progresas sin agobio</h3>
              <p className="mt-2 font-body text-[14px] text-text-muted leading-relaxed">
                A tu ritmo y por niveles reales. Nos aseguramos de que asimiles las bases antes de avanzar, sin presiones ni frustraciones.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neon-mint/10 text-neon-mint font-display text-xl font-bold">
                02
              </div>
              <h3 className="font-display text-xl text-text-strong">Comunidad de verdad</h3>
              <p className="mt-2 font-body text-[14px] text-text-muted leading-relaxed">
                El baile es social. Fomentamos que los alumnos roten en clase para que conozcas a todo el grupo. Muchos entran solos y salen en grupo.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neon-lime/10 text-neon-lime font-display text-xl font-bold">
                03
              </div>
              <h3 className="font-display text-xl text-text-strong">Confianza en la pista</h3>
              <p className="mt-2 font-body text-[14px] text-text-muted leading-relaxed">
                Te damos recursos prácticos y estilo desde la primera sesión. Queremos que salgas a la pista sintiéndote seguro, libre y capaz.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Sección de Modalidades */}
        <section className="space-y-8 pt-8 border-t border-white/8">
          <Reveal>
            <h2 className="font-display text-3xl text-text-strong tracking-wide">
              Estilos que puedes bailar
            </h2>
            <p className="mt-2 font-body text-base text-text-muted leading-relaxed">
              Explora las modalidades que enseñamos en la escuela. Haz clic en cualquiera de ellas para ver detalles de horarios, profesores y clases de prueba.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {modalidades.map((m, idx) => (
              <Reveal
                key={m.slug}
                delay={idx * 0.05}
                className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft hover:border-neon/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl text-text-strong mb-2">
                    {m.nombre}
                  </h3>
                  <p className="font-body text-[14px] text-text-muted leading-relaxed mb-6">
                    {m.descripcion}
                  </p>
                </div>
                <Link
                  href={`/clases/${m.slug}`}
                  className="inline-flex items-center font-body text-sm font-bold text-neon hover:underline no-underline mt-auto"
                >
                  Ver detalles de {m.nombre} &rarr;
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </SupportPage>
  );
}

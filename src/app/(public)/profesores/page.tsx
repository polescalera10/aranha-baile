import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SupportPage } from "@/components/layout/SupportPage";
import { WaLink } from "@/components/ui/WaLink";
import { modalidadesDe, profesores } from "@/content/profesores";

export const metadata: Metadata = {
  title: "Profesores de baile en Vilanova i la Geltrú",
  description:
    "Cómo enseñamos en NEXUS VNG: grupos por nivel real, corrección individual en cada clase y parejas de profesores en los grupos de baile en pareja.",
  alternates: { canonical: "/profesores" },
  // Al compartir esta página sale la foto del equipo, no la imagen genérica.
  openGraph: {
    title: "Profesores de baile en Vilanova i la Geltrú",
    images: [
      {
        url: "/images/equipo-nexus.png",
        width: 921,
        height: 568,
        alt: "El equipo de profesores de NEXUS VNG",
      },
    ],
  },
};

/*
  Nombres, fotos y disciplinas del equipo viven en content/profesores.ts (las
  disciplinas se derivan del cartel de horarios, no se escriben a mano).

  TODO: bio real de cada profesor. Hasta que Pol la pase, la ficha individual
  muestra solo lo verificable — nada de trayectorias ni titulaciones inventadas.
*/

export default function ProfesoresPage() {
  return (
    <SupportPage
      eyebrow="Quién te acompaña"
      title="El equipo"
      intro="Profesores en formación constante que corrigen con cariño y adaptan la clase a tu nivel. Así es como damos clase — y cómo notarás la diferencia desde el primer día."
    >
      <div className="space-y-[clamp(48px,7vw,80px)]">
        {/* Foto real del equipo. Recorte con fondo transparente, así que
            object-contain sobre el panel: con cover se cortarían cabezas en
            móvil. Sin nombres: no se atribuye cara a nombre sin confirmarlo. */}
        <figure className="bg-bg-elevated m-0 overflow-hidden rounded-xl">
          <Image
            src="/images/equipo-nexus.png"
            alt="El equipo de profesores de NEXUS VNG"
            width={921}
            height={568}
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="h-auto w-full object-contain"
          />
        </figure>

        {/* Fichas del equipo. Nombres, fotos y disciplinas salen de
            content/profesores.ts; las disciplinas se derivan del cartel. */}
        <section className="space-y-6">
          <h2 className="font-display text-text-strong text-[clamp(28px,4vw,44px)]">
            Quién te va a dar clase
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-5">
            {profesores.map((p) => {
              const disciplinas = modalidadesDe(p.nombre);
              return (
                <li key={p.slug}>
                  <Link href={`/profesores/${p.slug}`} className="group block no-underline">
                    <div className="bg-bg-elevated overflow-hidden rounded-lg">
                      <Image
                        src={p.foto}
                        alt={p.fotoAlt}
                        width={p.ancho}
                        height={p.alto}
                        sizes="(max-width: 640px) 90vw, 260px"
                        className="aspect-[3/4] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <h3 className="font-display text-text-strong group-hover:text-neon mt-3 text-2xl transition-colors">
                      {p.nombre}
                    </h3>
                    <p className="font-body text-text-muted mt-1 text-[13px] leading-snug">
                      {disciplinas.map((d) => d.nombre).join(" · ")}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <section className="space-y-4">
              <h2 className="font-display text-text-strong text-3xl">
                Aquí te conocen por tu nombre
              </h2>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                No te suelta nadie. Nuestro equipo cuida el detalle de cada movimiento, corrige con
                cariño y adapta la clase a tu nivel — desde el primer día. En una escuela pequeña
                eso no es un eslogan: es lo único que se puede hacer cuando el grupo cabe en una
                sala y el profe te ve entrar.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-text-strong text-3xl">Grupos por nivel real</h2>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                No mezclamos a quien lleva tres años con quien viene por primera vez. Cada
                disciplina se abre por niveles —desde cero absoluto, iniciación, intermedio— y en
                el horario cada grupo lleva el suyo marcado. Eso cambia por completo la clase: nadie
                frena a nadie y nadie se queda mirando cómo los demás hacen algo que aún no toca.
              </p>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                Si al probar vemos que el grupo se te queda corto o largo, se ajusta. Preferimos
                moverte de grupo a que te aburras o te agobies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-text-strong text-3xl">
                Corrección individual, no una clase dirigida
              </h2>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                La diferencia entre repetir un paso y aprenderlo está en que alguien te diga qué
                estás haciendo distinto. En clase se explica, se practica y se pasa por las parejas
                corrigiendo: peso, postura, tiempo. Varias clases se imparten con dos profesores a
                la vez, precisamente para que en el trabajo en pareja haya corrección por los dos
                lados.
              </p>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                Y se rota. No hace falta venir acompañado: bailas con todo el grupo, que es la única
                forma real de aprender a guiar y a seguir con gente distinta.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-text-strong text-3xl">
                Quién imparte cada clase
              </h2>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                El nombre del profe de cada grupo está publicado en la parrilla de la temporada,
                junto al estilo y la franja horaria: así sabes con quién vas a bailar antes de
                escribirnos.
              </p>
              <p className="font-body text-text-muted max-w-[65ch] text-[15px] leading-relaxed">
                <Link
                  href="/horarios"
                  className="text-neon font-semibold no-underline hover:underline"
                >
                  Ver el horario con los profes de cada grupo →
                </Link>
              </p>
              <p className="font-body text-text-body max-w-[65ch] text-base leading-relaxed">
                Arriba tienes la ficha de cada uno: sus clases, sus días y las disciplinas que
                imparte. Y la mejor forma de conocerlos sigue siendo en persona — reserva tu clase
                de prueba y ponles cara bailando.
              </p>
            </section>
          </div>

          <aside className="bg-bg-panel shadow-card h-fit rounded-lg border border-white/8 p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-text-strong text-2xl">Conócelos bailando</h2>
            <p className="font-body text-text-muted mt-2 text-[15px]">
              Escríbenos y reserva tu primera clase de prueba con el grupo que mejor encaje contigo.
            </p>
            <WaLink origin="nav" variant="red" className="mt-4 w-full py-[15px]">
              Reservar clase de prueba
            </WaLink>
            <p className="font-body text-text-faint mt-3 text-[13px]">
              ¿Prefieres verlo antes?{" "}
              <Link href="/clases" className="text-text-muted no-underline hover:underline">
                Mira las disciplinas
              </Link>{" "}
              o{" "}
              <Link href="/horarios" className="text-text-muted no-underline hover:underline">
                la parrilla de la temporada
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>

      {/*
        Grid original de fichas (oculto hasta tener datos reales):

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-6">
          {PROFES.map((p) => (
            <li key={p.slug}>
              <Link href={`/profesores/${p.slug}`} className="group block no-underline">
                <PhotoPlaceholder label="[ foto profe ]" tint="warm" className="min-h-[280px] rounded-lg p-3" />
                <h2 className="mt-3 font-display text-2xl text-text-strong">{p.nombre}</h2>
                <p className="font-body text-sm text-text-muted">Salsa · Bachata · …</p>
              </Link>
            </li>
          ))}
        </ul>
      */}
    </SupportPage>
  );
}

import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { WaLink } from "@/components/ui/WaLink";

export const metadata: Metadata = {
  title: "Profesores",
  description:
    "El equipo de NEXUS VNG: profesores en formación constante que cuidan cada detalle y te acompañan desde el primer día.",
  alternates: { canonical: "/profesores" },
};

/*
  TODO: fichas reales del equipo — sustituir por consulta a profiles
  (role = 'profesor') o por datos estáticos cuando Pol confirme nombres,
  fotos y disciplinas. Grid original comentado al final del archivo.
*/

export default function ProfesoresPage() {
  return (
    <SupportPage
      eyebrow="Quién te acompaña"
      title="El equipo"
      intro="Profesores en formación constante que corrigen con cariño y adaptan la clase a tu nivel."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <h2 className="font-display text-3xl text-text-strong">
            Aquí te conocen por tu nombre
          </h2>
          <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-body">
            No te suelta nadie. Nuestro equipo cuida el detalle de cada movimiento, corrige con
            cariño y adapta la clase a tu nivel — desde el primer día. Muy pronto podrás conocer
            aquí a cada profesor con nombre, cara y disciplina.
          </p>
          <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-body">
            Mientras tanto, la mejor forma de conocerlos es en persona: reserva tu clase de prueba
            y ponles cara bailando.
          </p>
        </div>

        <aside className="h-fit rounded-lg border border-white/8 bg-bg-panel p-6 shadow-card">
          <h2 className="font-display text-2xl text-text-strong">Conócelos bailando</h2>
          <p className="mt-2 font-body text-[15px] text-text-muted">
            Escríbenos y reserva tu primera clase de prueba con el grupo que mejor encaje contigo.
          </p>
          <WaLink origin="nav" variant="red" className="mt-4 w-full py-[15px]">
            Reservar clase de prueba
          </WaLink>
        </aside>
      </div>

      {/*
        Grid original de fichas (oculto hasta tener datos reales):

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
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

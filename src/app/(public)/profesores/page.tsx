import type { Metadata } from "next";
import Link from "next/link";
import { SupportPage } from "@/components/layout/SupportPage";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export const metadata: Metadata = {
  title: "Profesores",
  description:
    "El equipo de Aranha Baile: profesores en formación constante que cuidan cada detalle y te acompañan desde el primer día.",
  alternates: { canonical: "/profesores" },
};

// PLACEHOLDER: sustituir por consulta a profiles (role = 'profesor') cuando haya datos.
const PROFES = [
  { slug: "profe-1", nombre: "Nombre Apellido" },
  { slug: "profe-2", nombre: "Nombre Apellido" },
  { slug: "profe-3", nombre: "Nombre Apellido" },
];

export default function ProfesoresPage() {
  return (
    <SupportPage
      eyebrow="Quién te acompaña"
      title="El equipo"
      intro="Profesores en formación constante que corrigen con cariño y adaptan la clase a tu nivel."
    >
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {PROFES.map((p) => (
          <li key={p.slug}>
            <Link href={`/profesores/${p.slug}`} className="group block no-underline">
              <PhotoPlaceholder
                label="[ foto profe ]"
                tint="warm"
                className="min-h-[280px] rounded-lg p-3"
              />
              <h2 className="mt-3 font-display text-2xl text-text-strong">{p.nombre}</h2>
              <p className="font-body text-sm text-text-muted">Salsa · Bachata · PLACEHOLDER</p>
            </Link>
          </li>
        ))}
      </ul>
    </SupportPage>
  );
}

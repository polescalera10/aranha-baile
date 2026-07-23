import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { WaLink } from "@/components/ui/WaLink";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "NEXUS VNG nace dentro del gimnasio Aranha en Vilanova i la Geltrú: marca propia, alma de comunidad.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <SupportPage
      eyebrow="Quiénes somos"
      title="Más que una escuela, una comunidad"
      intro="Dentro del gimnasio Aranha de Vilanova i la Geltrú, con marca propia y un público distinto: calidez, pertenencia y baile."
    >
      <div className="max-w-[68ch] space-y-5">
        <p className="font-body text-base leading-relaxed text-text-body">
          NEXUS VNG nace dentro del gimnasio Aranha, en Vilanova i la Geltrú. Misma casa, otra
          energía: donde el gimnasio entrena cuerpos, la escuela junta personas. Salsa cubana,
          bachata, reparto, reggaeton, lady style y heels — con grupos por nivel real, desde cero
          absoluto hasta avanzado.
        </p>
        <p className="font-body text-base leading-relaxed text-text-body">
          Creemos que una escuela de baile no se mide por sus coreografías, sino por lo que pasa
          alrededor: la gente que llega sola y sale con planes, los grupos que se convierten en
          cuadrilla, las fiestas donde todo lo aprendido cobra sentido. Por eso cuidamos el
          ambiente tanto como la técnica.
        </p>
        <p className="font-body text-base leading-relaxed text-text-body">
          Si quieres comprobarlo, no hace falta que nos creas: ven a una clase de prueba y velo
          por ti mismo.
        </p>
        {/*
          TODO: ampliar con la historia real de la escuela (origen, personas
          detrás, vínculo con el gimnasio) cuando Pol pase el contenido.
        */}
        <WaLink origin="contacto" variant="red" className="mt-2 px-7 py-[15px]">
          Reservar clase de prueba
        </WaLink>
      </div>
    </SupportPage>
  );
}

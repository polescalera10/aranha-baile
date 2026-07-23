import type { Metadata } from "next";
import { SupportPage } from "@/components/layout/SupportPage";
import { LegalDraftNote, LegalList, LegalP, LegalSection, LegalTodo } from "@/components/layout/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de NEXUS VNG.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <SupportPage
      title="Política de cookies"
      intro="Qué cookies usa este sitio, para qué sirven y cómo puedes gestionarlas."
    >
      <LegalDraftNote />

      <LegalSection title="1. Qué son las cookies">
        <LegalP>
          Las cookies son pequeños archivos que el navegador guarda al visitar un sitio web. Sirven,
          por ejemplo, para mantener una sesión iniciada o recordar preferencias.
        </LegalP>
      </LegalSection>

      <LegalSection title="2. Cookies que usa este sitio">
        <LegalP>
          Actualmente {site.name} solo utiliza cookies técnicas, estrictamente necesarias para el
          funcionamiento del sitio y exentas de consentimiento según el artículo 22.2 de la LSSI-CE:
        </LegalP>
        <LegalList
          items={[
            "Cookies de sesión de autenticación (Supabase, con prefijo “sb-”): mantienen la sesión iniciada en el área privada de alumnos y profesores. Duración: la de la sesión y su renovación.",
            "La parte pública de la web (landing, clases, contacto) no instala cookies de análisis, publicidad ni seguimiento.",
          ]}
        />
        <LegalP>
          <LegalTodo>
            si se añade analítica (p. ej. GA4, Plausible) o píxeles de marketing, actualizar esta
            tabla e implantar un banner de consentimiento previo antes de activarlos
          </LegalTodo>
        </LegalP>
      </LegalSection>

      <LegalSection title="3. Cookies de terceros">
        <LegalP>
          Los enlaces a servicios externos (WhatsApp, Instagram, Google Maps) abren esos servicios
          fuera de este sitio; una vez allí, se aplican sus propias políticas de cookies. Este sitio
          no incrusta contenido de terceros que instale cookies en nuestras páginas.
        </LegalP>
      </LegalSection>

      <LegalSection title="4. Cómo gestionar o eliminar cookies">
        <LegalP>
          Puedes configurar tu navegador para bloquear o eliminar cookies (consulta la ayuda de
          Chrome, Safari, Firefox o Edge). Si bloqueas las cookies técnicas, el área privada puede
          dejar de funcionar; la parte pública seguirá siendo accesible.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Actualizaciones">
        <LegalP>
          Esta política se revisará si cambian las cookies utilizadas. Última actualización:{" "}
          <LegalTodo>fecha de publicación definitiva</LegalTodo>.
        </LegalP>
      </LegalSection>
    </SupportPage>
  );
}

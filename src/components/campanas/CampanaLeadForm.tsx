import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Formulario de captación de las landings de campaña. Reutiliza LeadForm con
 * origen fijo "campana" y codifica el slug ICP/dolor en `modalidad_interes`
 * (oculto) para poder atribuir qué landing convierte.
 */
export function CampanaLeadForm({ icp, dolor }: { icp: string; dolor: string }) {
  return (
    <LeadForm
      origen="campana"
      withModalidad={false}
      withMensaje={false}
      hiddenModalidad={`campana:${icp}/${dolor}`}
    />
  );
}

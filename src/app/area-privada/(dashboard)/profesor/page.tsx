import { requireRole } from "@/lib/auth";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function ProfesorPage() {
  await requireRole("profesor");

  return (
    <>
      <h1 className="font-display text-[clamp(30px,4.5vw,44px)] text-text-strong">
        Hoy
      </h1>
      <p className="mt-2 font-body text-base text-text-muted">
        Tus clases del día, listas para pasar lista.
      </p>

      <div className="mt-8">
        <EmptyState
          title="Todavía no hay clases que mostrar"
          description="Aquí verás tus clases de hoy para pasar lista."
        />
      </div>
    </>
  );
}

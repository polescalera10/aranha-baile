import { Logo } from "@/components/layout/Logo";
import { SignOutButton } from "@/app/area-privada/SignOutButton";

/**
 * Esqueleto común de los paneles por rol. Aún sin features: solo confirma
 * acceso seguro + enrutado. Las pantallas internas se construirán después.
 */
export function RolePlaceholder({
  rol,
  email,
}: {
  rol: "alumno" | "profesor" | "admin";
  email?: string;
}) {
  const label = { alumno: "Alumno", profesor: "Profesor", admin: "Admin" }[rol];

  return (
    <div className="min-h-screen">
      <header className="border-b border-text-strong/8 bg-white">
        <div className="container-aranha flex items-center justify-between py-4">
          <Logo size={22} onDark={false} />
          <div className="flex items-center gap-4">
            {email && <span className="hidden font-body text-sm text-text-muted sm:inline">{email}</span>}
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container-aranha py-16">
        <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-red">
          Área privada
        </span>
        <h1 className="mt-3 font-display text-[clamp(36px,6vw,64px)] text-text-strong">
          Área de {label}
        </h1>
        <p className="mt-3 max-w-[52ch] font-body text-lg text-text-muted">
          En construcción. El acceso y el enrutado por rol ya funcionan; las pantallas internas
          (seguimiento de clases, asistencia y contenido) llegarán en la siguiente fase.
        </p>

        <div className="mt-8 rounded-lg border border-dashed border-text-strong/20 bg-white/60 p-8 font-body text-text-muted">
          {/* PLACEHOLDER: dashboard de {rol} */}
          Próximamente: panel de {label.toLowerCase()}.
        </div>
      </main>
    </div>
  );
}

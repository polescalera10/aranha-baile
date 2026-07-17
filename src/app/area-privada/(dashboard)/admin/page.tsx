import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const modules = [
  {
    href: "/area-privada/admin/alumnos",
    title: "Alumnos",
    description: "Altas, fichas y estado de pago del alumnado.",
  },
  {
    href: "/area-privada/admin/cursos",
    title: "Cursos",
    description: "Grupos, horarios y sesiones de cada curso.",
  },
  {
    href: "/area-privada/admin/profesores",
    title: "Profesores",
    description: "Equipo docente y cursos asignados.",
  },
  {
    href: "/area-privada/admin/whatsapp",
    title: "WhatsApp",
    description: "Avisos y comunicación con los grupos.",
  },
];

export default async function AdminPage() {
  await requireRole("admin");

  return (
    <>
      <h1 className="font-display text-[clamp(30px,4.5vw,44px)] text-text-strong">
        Panel de administración
      </h1>
      <p className="mt-2 max-w-[52ch] font-body text-base text-text-muted">
        Gestión interna de la escuela. Elige un módulo para empezar.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} className="group">
            <Card
              title={mod.title}
              action={<Badge variant="neutral">En construcción</Badge>}
              className="h-full transition-shadow group-hover:shadow-card"
            >
              <p className="font-body text-sm text-text-muted">{mod.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

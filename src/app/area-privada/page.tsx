import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "./LoginForm";

/**
 * Login del área privada. El middleware ya redirige a un usuario autenticado
 * a su panel por rol, así que aquí solo se renderiza el formulario.
 */
export default function AreaPrivadaLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex justify-center">
          <Logo size={28} onDark={false} />
        </div>
        <div className="rounded-xl border border-text-strong/8 bg-white p-8 shadow-card">
          <h1 className="font-display text-3xl text-text-strong">Área privada</h1>
          <p className="mb-6 mt-1 font-body text-sm text-text-muted">
            Accede con tu cuenta de alumno, profesor o admin.
          </p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center font-body text-sm text-text-muted">
          <Link href="/" className="text-red no-underline hover:underline">
            ← Volver a la web
          </Link>
        </p>
      </div>
    </div>
  );
}

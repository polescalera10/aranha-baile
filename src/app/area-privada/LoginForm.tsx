"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Login del área privada (Supabase Auth, email + contraseña).
 * Tras autenticar, redirige a la home del área; el middleware reenvía al
 * panel correspondiente según el rol del perfil.
 */
export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage("Email o contraseña incorrectos.");
      return;
    }
    // Recarga para que el middleware redirija según rol.
    router.refresh();
    router.replace("/area-privada");
  }

  const field =
    "w-full scheme-dark rounded-sm border border-text-strong/15 bg-bg-elevated px-4 py-3 font-body text-[15px] text-text-strong outline-none focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block font-body text-[13px] font-semibold text-text-body">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block font-body text-[13px] font-semibold text-text-body">
          Contraseña
        </label>
        <input id="password" name="password" type="password" required className={field} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-sm border border-danger/30 bg-danger/10 px-4 py-2.5 font-body text-sm text-danger">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 rounded-md bg-accent px-7 py-[15px] font-body text-base font-bold text-ink shadow-neon transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {status === "loading" ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

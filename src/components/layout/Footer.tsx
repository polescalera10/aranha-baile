import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { buildWaLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

const PILL =
  "rounded-full border border-white/15 px-4 py-[9px] font-body text-[13px] font-semibold text-white no-underline transition-colors hover:border-neon/50 hover:text-neon";

const COL_LABEL =
  "font-body text-[11px] font-bold uppercase tracking-[0.16em] text-neon-mint/80";

const EXPLORA: ReadonlyArray<readonly [string, string]> = [
  ["/clases", "Clases"],
  ["/eventos", "Eventos"],
  ["/sobre-nosotros", "Sobre nosotros"],
  ["/contacto", "Contacto"],
];

const LEGAL: ReadonlyArray<readonly [string, string]> = [
  ["/aviso-legal", "Aviso legal"],
  ["/privacidad", "Privacidad"],
  ["/cookies", "Cookies"],
];

/**
 * Footer global con NAP consistente (Name · Address · Phone) para SEO local.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink pb-28 pt-[clamp(48px,6vw,72px)] text-white">
      <div className="container-nexus grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
        <div>
          <Logo size={26} />
          <p className="mt-3.5 max-w-[38ch] font-body text-sm leading-relaxed text-white/60">
            Escuela de salsa cubana y bachata. Dentro del gimnasio Aranha · {site.nap.addressLocality}.
          </p>
        </div>

        <div>
          <div className={COL_LABEL}>Dónde</div>
          <address className="mt-3 font-mono text-[13px] not-italic leading-7 text-white/70">
            {site.nap.venue}
            {/* La calle solo se pinta cuando esté confirmada en lib/site.ts. */}
            {site.nap.streetAddress && (
              <>
                <br />
                {site.nap.streetAddress}
              </>
            )}
            <br />
            {site.nap.postalCode} {site.nap.addressLocality}
            <br />
            {site.nap.telephoneDisplay}
          </address>
        </div>

        <div>
          <div className={COL_LABEL}>Explora</div>
          <ul className="mt-3 flex flex-col gap-2">
            {EXPLORA.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-[13px] text-white/70 no-underline transition-colors hover:text-neon"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={COL_LABEL}>Síguenos</div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {/* Los enlaces sociales solo se pintan si hay URL real en lib/site.ts. */}
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={PILL}
              >
                Instagram
              </a>
            )}
            {site.social.tiktok && (
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={PILL}
              >
                TikTok
              </a>
            )}
            <a href={buildWaLink("footer")} target="_blank" rel="noopener noreferrer" className={PILL}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container-nexus">
        <div className="my-4 mt-8 h-px bg-white/10" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} {site.name} · Hecho con ritmo
          </p>
          <div className="flex gap-4">
            {LEGAL.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs text-white/50 no-underline transition-colors hover:text-neon"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

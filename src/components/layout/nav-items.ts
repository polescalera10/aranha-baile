/**
 * Enlaces de navegación del sitio público.
 * Fuente única para la cabecera de escritorio y el menú móvil, de modo que
 * ambos no se desincronicen.
 */
export type NavLink = { href: string; label: string };

/** Nav de la landing (cabecera transparente sobre el hero). */
export const NAV_LANDING: readonly NavLink[] = [
  { href: "/clases", label: "Clases" },
  { href: "/profesores", label: "Profesores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/horarios", label: "Horarios" },
  { href: "/faq", label: "FAQ" },
];

/** Nav de las páginas de soporte (cabecera sólida). */
export const NAV_SITE: readonly NavLink[] = [
  { href: "/clases", label: "Clases" },
  { href: "/intensivos", label: "Intensivos" },
  { href: "/profesores", label: "Profesores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/faq", label: "FAQ" },
];

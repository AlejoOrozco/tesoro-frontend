export interface NavItem {
  readonly href: string;
  readonly label: string;
}

/** Labels are user-visible (Spanish); routes are English. /about and /contact land in Stage 5. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

/** Legal pages land in Stage 5.3; until then these resolve to the branded 404. */
export const LEGAL_ITEMS: readonly NavItem[] = [
  { href: "/terms", label: "Términos y condiciones" },
  { href: "/privacy", label: "Privacidad y habeas data" },
];

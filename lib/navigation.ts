export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly ariaLabel?: string;
}

/** Labels are user-visible (Spanish); routes are English. /about and /contact land in Stage 5. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

export type AccountIconId = "account" | "cart";

export interface AccountIconItem extends NavItem {
  readonly id: AccountIconId;
}

export const ACCOUNT_ICON_BY_ID: Record<AccountIconId, AccountIconItem> = {
  cart: { id: "cart", href: "/cart", label: "Carrito" },
  account: { id: "account", href: "/login", label: "Inicia sesión" },
};

/** Placeholder catalog groups until category pages land. */
export const CATEGORY_ITEMS: readonly NavItem[] = [
  { href: "/category/phones", label: "Celulares y accesorios" },
  { href: "/category/audio", label: "Audio" },
  { href: "/category/power", label: "Carga y energía" },
  { href: "/category/cases", label: "Fundas y protección" },
  { href: "/category/wearables", label: "Relojes inteligentes" },
];

/** Secondary header links. Ofertas jumps to the live rail; the rest 404 until Stage 5. */
export const DEPARTMENT_ITEMS: readonly NavItem[] = [
  { href: "/#productos", label: "Ofertas" },
  { href: "/services", label: "Servicios" },
  { href: "/pqr", label: "PQR", ariaLabel: "Peticiones, quejas y reclamos" },
];

/** Legal pages land in Stage 5.3; until then these resolve to the branded 404. */
export const LEGAL_ITEMS: readonly NavItem[] = [
  { href: "/terms", label: "Términos y condiciones" },
  { href: "/privacy", label: "Privacidad y habeas data" },
];

"use client";

import Link from "next/link";
import type { ReactElement } from "react";

import { HEADER_ICON_BUTTON_CLASSES, HEADER_ICON_GLYPH_CLASSES } from "@/components/header-icon-styles";
import { CartIcon, UserIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useVisitorSession } from "@/components/use-visitor-session";
import { ACCOUNT_ICON_BY_ID } from "@/lib/navigation";
import type { SiteOrigins } from "@/lib/origins";
import type { VisitorSession } from "@/lib/visitor-session";

function CartLink(): ReactElement {
  const item = ACCOUNT_ICON_BY_ID.cart;
  return (
    <Link href={item.href} className={HEADER_ICON_BUTTON_CLASSES}>
      <CartIcon className={HEADER_ICON_GLYPH_CLASSES} />
      {item.label}
    </Link>
  );
}

function SessionLink({ href, label }: { readonly href: string | null; readonly label: string }): ReactElement {
  const content = (
    <>
      <UserIcon className={HEADER_ICON_GLYPH_CLASSES} />
      {label}
    </>
  );
  if (href === null) return <span className={HEADER_ICON_BUTTON_CLASSES}>{content}</span>;
  return (
    <a href={href} className={HEADER_ICON_BUTTON_CLASSES}>
      {content}
    </a>
  );
}

function accountHref(appOrigin: string | null, session: VisitorSession): string | null {
  if (appOrigin === null || session.status === "loading") return null;
  if (session.status === "signed-in") return `${appOrigin}/account`;
  return `${appOrigin}/login`;
}

function AccountItem({
  appOrigin,
  session,
}: {
  readonly appOrigin: string | null;
  readonly session: VisitorSession;
}): ReactElement {
  if (session.status === "loading") {
    return (
      <li>
        <span className={HEADER_ICON_BUTTON_CLASSES} aria-busy="true">
          <UserIcon className={HEADER_ICON_GLYPH_CLASSES} />
          <span className="sr-only">Cargando sesión</span>
        </span>
      </li>
    );
  }

  const signedIn = session.status === "signed-in";
  return (
    <li>
      <SessionLink href={accountHref(appOrigin, session)} label={signedIn ? "Cuenta" : "Iniciar sesión"} />
    </li>
  );
}

/** Theme, then the app session link, then cart. Account pages live on the app host. */
export function HeaderAccountIcons({ origins }: { readonly origins: SiteOrigins }): ReactElement {
  const session = useVisitorSession(origins.apiOrigin);

  return (
    <ul className="flex items-center gap-4">
      <li>
        <ThemeToggle />
      </li>
      <AccountItem appOrigin={origins.appOrigin} session={session} />
      <li>
        <CartLink />
      </li>
    </ul>
  );
}

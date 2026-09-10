import Link from "next/link";
import type { ReactElement } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Site chrome: solid navy in both themes, per the approved mocks — which is
 * why the gold lockup needs no per-theme swap. The glass treatment
 * (docs/design/glass-effect.md) stays a deliberate later polish, not a default.
 */
export function SiteHeader(): ReactElement {
  return (
    <header className="sticky top-0 z-40 bg-chrome text-chrome-foreground">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <BrandLockup preload />
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Principal" className="hidden sm:block">
            <NavLinks orientation="row" />
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

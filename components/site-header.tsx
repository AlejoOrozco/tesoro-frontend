import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";
import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Site chrome: solid navy in both themes, per the approved mocks — which is
 * why the gold lockup needs no per-theme swap. The glass treatment
 * (docs/design/glass-effect.md) stays a deliberate later polish, not a default.
 * No horizontal wordmark asset exists, so the lockup composes the diamond
 * favicon with a typed wordmark, as in the mocks.
 */
export function SiteHeader(): ReactElement {
  return (
    <header className="sticky top-0 z-40 bg-chrome text-chrome-foreground">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Image src={brandAssets.faviconGoldNoBackground.image} alt="" className="size-8" priority />
          <span className="flex flex-col">
            <span className="text-base leading-tight font-bold tracking-wide text-gold-200">
              TESORO <span className="font-light">GLOBAL</span>
            </span>
            <span className="text-xs leading-tight font-light tracking-widest">CONECTANDO AL MUNDO</span>
          </span>
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

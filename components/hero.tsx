import type { ReactElement } from "react";

import { Container } from "@/components/container";
import { HeroBanner } from "@/components/hero-banner";
import { HeroTrust } from "@/components/hero-trust";
import { HERO_SECTION_ID } from "@/lib/landmarks";

/**
 * Banner on chrome, then a short navy band so the cards sit off the artwork.
 * Glow behind the cards eases chrome into the page background.
 */
export function Hero(): ReactElement {
  return (
    <section id={HERO_SECTION_ID}>
      <h1 className="sr-only">Tesoro Global — Conectando al mundo</h1>
      <div className="bg-chrome pt-[var(--header-offset)] pb-4">
        <HeroBanner />
      </div>
      <div className="relative">
        <div aria-hidden="true" className="hero-ending-glow pointer-events-none absolute inset-x-0 top-0 h-32" />
        <Container className="relative">
          <HeroTrust />
        </Container>
      </div>
    </section>
  );
}

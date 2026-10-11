import type { ReactElement } from "react";

import { Container } from "@/components/container";
import { HeroBanner } from "@/components/hero-banner";
import { HeroTrust } from "@/components/hero-trust";
import { HERO_SECTION_ID } from "@/lib/landmarks";

/** Banner, then the category row. The wash starts on the cards and fades through their top half. */
export function Hero(): ReactElement {
  return (
    <section id={HERO_SECTION_ID}>
      <h1 className="sr-only">Tesoro Global — Conectando al mundo</h1>
      <HeroBanner>
        <Container>
          <HeroTrust />
        </Container>
      </HeroBanner>
    </section>
  );
}

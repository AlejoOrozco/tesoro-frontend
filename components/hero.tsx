import Image from "next/image";
import type { ReactElement } from "react";

import { heroAssets } from "@/assets/hero";
import { Container } from "@/components/container";
import { HeroIntro } from "@/components/hero-intro";
import { HeroTrust } from "@/components/hero-trust";

/**
 * Navy hero, then chrome fades into the page background behind the trust
 * cards (Mercado Libre-style overlap).
 */
export function Hero(): ReactElement {
  return (
    <section>
      <div className="bg-chrome text-chrome-foreground">
        <Container className="pt-12 pb-24 sm:pt-16 sm:pb-32">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <HeroIntro />
            <Image
              src={heroAssets.productCluster.image}
              alt="Celular, auriculares y batería portátil"
              preload
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="mx-auto h-auto w-full max-w-lg"
            />
          </div>
        </Container>
      </div>
      <div className="relative bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-chrome to-background"
        />
        <Container className="relative -mt-16 pb-8">
          <HeroTrust />
        </Container>
      </div>
    </section>
  );
}

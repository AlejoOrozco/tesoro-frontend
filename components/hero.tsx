import Image from "next/image";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";
import { Container } from "@/components/container";
import { HeroIntro } from "@/components/hero-intro";
import { HeroTrust } from "@/components/hero-trust";

/**
 * Navy band in both themes (chrome), per the approved mocks. The visual is
 * the background-free brand mark until real product cut-outs arrive
 * (content-refactor pass) — only transparent assets work on themed surfaces.
 */
export function Hero(): ReactElement {
  return (
    <section className="bg-chrome text-chrome-foreground">
      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <HeroIntro />
          <Image
            src={brandAssets.logoGoldNoBackground.image}
            alt=""
            preload
            sizes="(min-width: 640px) 18rem, 14rem"
            className="mx-auto h-auto w-56 sm:w-72"
          />
        </div>
        <HeroTrust />
      </Container>
    </section>
  );
}

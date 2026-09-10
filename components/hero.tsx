import Image from "next/image";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/typography";

/**
 * Navy band in both themes (chrome), per the approved mocks. The visual is
 * the background-free brand mark until real product cut-outs arrive
 * (content-refactor pass) — only transparent assets work on themed surfaces.
 */
export function Hero(): ReactElement {
  return (
    <section className="bg-chrome text-chrome-foreground">
      <Container className="grid items-center gap-8 py-12 sm:grid-cols-[1fr_auto] sm:py-16">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <Heading level={1}>Tecnología y accesorios, sin fronteras</Heading>
          <p className="text-lg leading-relaxed text-neutral-300">
            Productos originales, garantía real y envíos a todo el país. En Tesoro Global te conectamos con lo último
            en tecnología.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Contáctanos
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary" size="lg">
              Nuestros servicios
            </ButtonLink>
          </div>
        </div>
        <Image
          src={brandAssets.logoGoldNoBackground.image}
          alt=""
          priority
          className="mx-auto h-auto w-56 sm:w-72"
        />
      </Container>
    </section>
  );
}

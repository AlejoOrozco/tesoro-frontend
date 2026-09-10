import type { ReactElement } from "react";

import { ButtonLink } from "@/components/button";
import { Heading } from "@/components/typography";

export function HeroIntro(): ReactElement {
  return (
    <div className="flex max-w-xl flex-col items-start gap-6">
      <p className="text-xs font-medium tracking-widest text-gold-200">TECNOLOGÍA · ACCESORIOS · TU MUNDO</p>
      <Heading level={1}>
        Tecnología y accesorios, <span className="text-gold-200">sin fronteras</span>
      </Heading>
      <p className="text-lg leading-relaxed text-neutral-300">
        Productos originales, garantía real y envíos a todo el país. En Tesoro Global te conectamos con lo último en
        tecnología.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/contact" size="lg">
          Contáctanos
        </ButtonLink>
        <ButtonLink href="#services" variant="ghost" size="lg">
          Nuestros servicios
        </ButtonLink>
      </div>
    </div>
  );
}

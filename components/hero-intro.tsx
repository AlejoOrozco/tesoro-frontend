import type { ReactElement } from "react";

import { ButtonLink } from "@/components/button";
import { Heading } from "@/components/typography";

export function HeroIntro(): ReactElement {
  return (
    <div className="flex max-w-xl flex-col items-start gap-6">
      <p className="text-xs font-medium tracking-widest text-gold-200">TECNOLOGÍA · ACCESORIOS · TU MUNDO</p>
      <Heading level={1}>
        Conectando al mundo <span className="text-gold-200">de la tecnología</span>
      </Heading>
      <p className="text-lg leading-relaxed text-neutral-300">
        Los mejores productos, las marcas más confiables y la tecnología que necesitas, en un solo lugar.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/contact" size="lg">
          Contáctanos
        </ButtonLink>
        <ButtonLink href="#productos" variant="ghost" size="lg">
          Ver productos
        </ButtonLink>
      </div>
    </div>
  );
}

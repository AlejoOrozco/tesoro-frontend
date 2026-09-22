import type { StaticImageData } from "next/image";

import anoConectandoAlMundo from "./hero/ano-conectando-al-mundo.png";
import compraHoyRecibe3Dias from "./hero/compra-hoy-recibe-3-dias.png";
import dosAnosGarantia from "./hero/dos-anos-garantia.png";
import loMejorEnTecnologia from "./hero/lo-mejor-en-tecnologia.png";

export interface HeroSlide {
  readonly id: string;
  readonly image: StaticImageData;
  readonly alt: string;
}

/** Landing banners — 2400×625 (96:25), content inset; empty navy at the sides and bottom. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "conectando",
    image: anoConectandoAlMundo,
    alt: "Más de 1 año conectando al mundo. Importa desde EE.UU. o China.",
  },
  {
    id: "tecnologia",
    image: loMejorEnTecnologia,
    alt: "Lo mejor en tecnología. JBL, Wiwu, Movisun y 1Hora.",
  },
  {
    id: "envios",
    image: compraHoyRecibe3Dias,
    alt: "Compra hoy, recibe en 3 días, con envíos a toda Colombia.",
  },
  {
    id: "garantia",
    image: dosAnosGarantia,
    alt: "Todos nuestros productos cuentan con hasta 2 años de garantía.",
  },
];

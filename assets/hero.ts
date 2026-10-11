import type { StaticImageData } from "next/image";

import seisAnosConectandoAlMundo from "./hero/mas-de-6-anos-conectando-al-mundo.png";
import compraHoyRecibeEn2Dias from "./hero/compra-hoy-recibe-en-2-dias.png";
import dosAnosGarantia from "./hero/todos-los-productos-con-hasta-2-anos-de-garantia.png";
import loMejorEnTecnologia from "./hero/lo-mejor-en-tecnologia.png";

export interface HeroSlide {
  readonly id: string;
  readonly image: StaticImageData;
  readonly alt: string;
}

/** Landing banners — 2400×625 (96:25), full page width. Fill the frame; the scene should reach the edges. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "conectando",
    image: seisAnosConectandoAlMundo,
    alt: "Más de 6 años conectando al mundo. Importa desde EE.UU. o China.",
  },
  {
    id: "tecnologia",
    image: loMejorEnTecnologia,
    alt: "Lo mejor en tecnología. JBL, Wiwu, Movisun y 1Hora.",
  },
  {
    id: "envios",
    image: compraHoyRecibeEn2Dias,
    alt: "Compra hoy, recibe en 2 días, con envíos a toda Colombia.",
  },
  {
    id: "garantia",
    image: dosAnosGarantia,
    alt: "Todos los productos con hasta 2 años de garantía.",
  },
];

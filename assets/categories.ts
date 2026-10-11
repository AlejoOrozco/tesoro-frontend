import type { DescribedImage } from "@/assets/described-image";

import headphones from "./categories/audifonos.jpg";
import powerBanks from "./categories/baterias-portatiles.jpg";
import cables from "./categories/cables-de-conexion.jpg";
import phones from "./categories/celulares-y-accesorios.jpg";
import watches from "./categories/relojes-inteligentes.jpg";

export interface CategoryArt extends DescribedImage {
  /** True when the picture already includes the category name. */
  readonly labelInArt: boolean;
}

/** One dark scene per category. The product sits on the right so the name can sit on the left. */
export const categoryImages = {
  phones: {
    src: phones,
    alt: "Celulares y accesorios: celular dorado con triple cámara sobre fondo oscuro",
    labelInArt: true,
  },
  audio: {
    src: headphones,
    alt: "Audio: audífonos negros de diadema sobre fondo oscuro",
    labelInArt: true,
  },
  power: {
    src: powerBanks,
    alt: "Baterías portátiles: power bank negro con carga magnética de 15W sobre fondo oscuro",
    labelInArt: true,
  },
  cases: {
    src: cables,
    alt: "Cables de conexión: cables Lightning, micro-USB y USB-C sobre fondo oscuro",
    labelInArt: true,
  },
  wearables: {
    src: watches,
    alt: "Relojes inteligentes: dos smartwatches, uno rosa y uno blanco, sobre fondo oscuro",
    labelInArt: true,
  },
} as const satisfies Record<"phones" | "audio" | "power" | "cases" | "wearables", CategoryArt>;

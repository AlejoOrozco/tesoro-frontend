import type { DescribedImage } from "@/assets/described-image";

import audio from "./categories/audio.png";
import cases from "./categories/cases.png";
import phones from "./categories/phones.png";
import power from "./categories/power.png";
import wearables from "./categories/wearables.png";

/** One object per hero category. The glass card sits behind these, not over them. */
export const categoryImages = {
  phones: {
    src: phones,
    alt: "Celular negro con pantalla apagada",
  },
  audio: {
    src: audio,
    alt: "Auriculares inalámbricos blancos en su estuche abierto",
  },
  power: {
    src: power,
    alt: "Batería portátil negra",
  },
  cases: {
    src: cases,
    alt: "Funda lila para celular",
  },
  wearables: {
    src: wearables,
    alt: "Reloj inteligente negro con correa de silicona",
  },
} as const satisfies Record<"phones" | "audio" | "power" | "cases" | "wearables", DescribedImage>;

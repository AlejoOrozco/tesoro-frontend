import type { DescribedImage } from "@/assets/described-image";

import powerBankMockup from "./products/power-bank-mockup.png";

export type ProductImageId = "powerBank";

export const productAssets = {
  powerBank: {
    src: powerBankMockup,
    alt: "Batería portátil magnética Xiaomi de 5000 mAh",
  },
} as const satisfies Record<ProductImageId, DescribedImage>;

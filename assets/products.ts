import type { StaticImageData } from "next/image";

import powerBankMockup from "./products/power-bank-mockup.png";

interface ProductAsset {
  readonly image: StaticImageData;
  readonly hasBakedBackground: boolean;
}

export type ProductImageId = "powerBank";

export const productAssets = {
  powerBank: {
    image: powerBankMockup,
    hasBakedBackground: false,
  },
} as const satisfies Record<ProductImageId, ProductAsset>;

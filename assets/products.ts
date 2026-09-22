import type { StaticImageData } from "next/image";

import powerBankMockup from "./products/power-bank-mockup.png";

export type ProductImageId = "powerBank";

export const productAssets = {
  powerBank: powerBankMockup,
} as const satisfies Record<ProductImageId, StaticImageData>;

import type { DescribedImage } from "@/assets/described-image";

import zazWhiteLogo from "./credits/zaz-white-logo.png";

export const creditAssets = {
  zaz: {
    src: zazWhiteLogo,
    alt: "Logotipo de Zaz",
  },
} as const satisfies Record<"zaz", DescribedImage>;

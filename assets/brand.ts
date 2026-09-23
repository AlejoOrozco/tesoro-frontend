import type { DescribedImage } from "@/assets/described-image";

import logoGoldNoBackground from "./brand/logo-gold-no-background.png";
import logoGoldNoLabel from "./brand/logo-gold-no-label.png";

/** Brand kit used in the UI. Import `asset.src` and pass it to `next/image`. */
export const brandAssets = {
  logoGoldNoBackground: {
    src: logoGoldNoBackground,
    alt: "Logotipo de Tesoro Global SAS, conectando al mundo",
  },
  logoGoldNoLabel: {
    src: logoGoldNoLabel,
    alt: "Logotipo de Tesoro Global SAS",
  },
} as const satisfies Record<"logoGoldNoBackground" | "logoGoldNoLabel", DescribedImage>;

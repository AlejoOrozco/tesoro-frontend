import type { StaticImageData } from "next/image";

import faviconGoldNoBackground from "./brand/favicon-gold-no-background.png";
import faviconNavyNoBackground from "./brand/favicon-navy-no-background.png";
import logoGold from "./brand/logo-gold.jpg";
import logoGoldNoBackground from "./brand/logo-gold-no-background.png";
import logoGrayNoBackground from "./brand/logo-gray-no-background.png";
import logoNavy from "./brand/logo-navy.jpg";
import logoWhiteNoBackground from "./brand/logo-white-no-background.png";

interface BrandAsset {
  readonly image: StaticImageData;
  readonly hasBakedBackground: boolean;
}

export const brandAssets = {
  faviconGoldNoBackground: {
    image: faviconGoldNoBackground,
    hasBakedBackground: false,
  },
  faviconNavyNoBackground: {
    image: faviconNavyNoBackground,
    hasBakedBackground: false,
  },
  logoGold: {
    image: logoGold,
    hasBakedBackground: true,
  },
  logoGoldNoBackground: {
    image: logoGoldNoBackground,
    hasBakedBackground: false,
  },
  logoGrayNoBackground: {
    image: logoGrayNoBackground,
    hasBakedBackground: false,
  },
  logoNavy: {
    image: logoNavy,
    hasBakedBackground: true,
  },
  logoWhiteNoBackground: {
    image: logoWhiteNoBackground,
    hasBakedBackground: false,
  },
} as const satisfies Record<string, BrandAsset>;

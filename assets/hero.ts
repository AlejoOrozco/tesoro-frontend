import type { StaticImageData } from "next/image";

import iphoneAirpodsPowerbankHero from "./hero/iphone-airpods-powerbank-hero.png";

interface HeroAsset {
  readonly image: StaticImageData;
  readonly hasBakedBackground: boolean;
}

export const heroAssets = {
  productCluster: {
    image: iphoneAirpodsPowerbankHero,
    hasBakedBackground: false,
  },
} as const satisfies Record<string, HeroAsset>;

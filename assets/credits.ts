import type { StaticImageData } from "next/image";

import zazWhiteLogo from "./credits/zaz-white-logo.png";

export const creditAssets = {
  zaz: zazWhiteLogo,
} as const satisfies Record<"zaz", StaticImageData>;

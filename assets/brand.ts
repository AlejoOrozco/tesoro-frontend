import type { StaticImageData } from "next/image";

import logoGoldNoBackground from "./brand/logo-gold-no-background.png";
import logoGoldNoLabel from "./brand/logo-gold-no-label.png";

/** Brand kit used in the UI. Import `asset` and pass it to `next/image`. */
export const brandAssets = {
  logoGoldNoBackground,
  logoGoldNoLabel,
} as const satisfies Record<"logoGoldNoBackground" | "logoGoldNoLabel", StaticImageData>;

import type { StaticImageData } from "next/image";

import wompiLogo from "./partners/wompi-logo.webp";

export const partnerAssets = {
  wompi: wompiLogo,
} as const satisfies Record<"wompi", StaticImageData>;

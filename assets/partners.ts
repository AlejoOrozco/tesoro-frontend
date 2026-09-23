import type { DescribedImage } from "@/assets/described-image";

import wompiLogo from "./partners/wompi-logo-black.png";

export const partnerAssets = {
  wompi: {
    src: wompiLogo,
    alt: "Logotipo de Wompi",
  },
} as const satisfies Record<"wompi", DescribedImage>;

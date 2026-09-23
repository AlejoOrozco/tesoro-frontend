import Image from "next/image";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";

interface BrandLockupProps {
  /** Pass-through to next/image — true for above-the-fold usage (header). */
  readonly preload?: boolean;
}

/**
 * Stacked gold lockup (diamond + Tesoro Global SAS) for navy chrome.
 * The source file is a padded square; the frame crops to the artwork so the
 * mark reads at header height without the typed wordmark beside it.
 */
export function BrandLockup({ preload = false }: BrandLockupProps): ReactElement {
  return (
    <span className="relative block h-16 w-32">
      <Image
        src={brandAssets.logoGoldNoLabel.src}
        alt={brandAssets.logoGoldNoLabel.alt}
        fill
        sizes="128px"
        className="object-cover object-center"
        preload={preload}
      />
    </span>
  );
}

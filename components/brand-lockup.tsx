import Image from "next/image";
import type { ReactElement } from "react";

import { brandAssets } from "@/assets/brand";

interface BrandLockupProps {
  /** Pass-through to next/image — true for above-the-fold usage (header). */
  readonly preload?: boolean;
}

/**
 * Diamond + typed wordmark, for navy (chrome) surfaces. No horizontal wordmark
 * asset exists, so the lockup is composed, matching the approved mocks.
 */
export function BrandLockup({ preload = false }: BrandLockupProps): ReactElement {
  return (
    <span className="flex items-center gap-3">
      <Image src={brandAssets.faviconGoldNoBackground.image} alt="" className="size-8" preload={preload} />
      <span className="flex flex-col">
        <span className="text-base leading-tight font-bold tracking-wide text-gold-200">
          TESORO <span className="font-light">GLOBAL</span>
        </span>
        <span className="text-xs leading-tight font-light tracking-widest">CONECTANDO AL MUNDO</span>
      </span>
    </span>
  );
}

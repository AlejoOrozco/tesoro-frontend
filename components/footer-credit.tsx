import Image from "next/image";
import type { ReactElement } from "react";

import { creditAssets } from "@/assets/credits";

const ZAZ_HREF = "https://www.zaz.agency";

const ZAZ_LINK_CLASSES =
  "relative inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-md " +
  "transition-opacity duration-micro hover:opacity-80 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Bottom-right maker credit on chrome. The logo is the link to Zaz. */
export function FooterCredit(): ReactElement {
  return (
    <p className="flex items-center justify-end gap-1 text-xs text-neutral-300">
      <span>Esta página fue creada por</span>
      <a
        href={ZAZ_HREF}
        className={ZAZ_LINK_CLASSES}
        target="_blank"
        rel="noreferrer"
      >
        <span className="relative block h-8 w-8">
          <Image src={creditAssets.zaz.src} alt={creditAssets.zaz.alt} fill sizes="2rem" className="object-contain" />
        </span>
      </a>
    </p>
  );
}

import Image from "next/image";
import type { ReactElement } from "react";

import { partnerAssets } from "@/assets/partners";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";

export function WompiCard(): ReactElement {
  const mark = partnerAssets.wompi;
  return (
    <article className={`${SOFT_RAIL_CARD_CLASSES} gold-rim h-60`}>
      <span className="flex h-full w-full flex-col gap-2 p-3">
        <span className="flex min-h-0 flex-1 items-center justify-center">
          <Image src={mark.src} alt={mark.alt} className="wompi-mark max-h-40 max-w-full object-contain" />
        </span>
        <span className="card-title line-clamp-2 text-center text-xs font-medium">Paga seguro con Wompi</span>
      </span>
    </article>
  );
}

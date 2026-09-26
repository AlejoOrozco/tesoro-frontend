import Image from "next/image";
import type { ReactElement } from "react";

import { partnerAssets } from "@/assets/partners";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";

export function WompiCard(): ReactElement {
  const mark = partnerAssets.wompi;
  return (
    <article className="flex flex-col gap-2">
      <span className={`${SOFT_RAIL_CARD_CLASSES} gold-rim flex h-44 items-center justify-center p-3`}>
        <Image src={mark.src} alt={mark.alt} className="wompi-mark max-h-32 max-w-full object-contain" />
      </span>
      <span className="card-title line-clamp-2 text-center text-xs font-medium">Paga seguro con Wompi</span>
    </article>
  );
}

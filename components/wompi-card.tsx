import Image from "next/image";
import type { ReactElement } from "react";

import { partnerAssets } from "@/assets/partners";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";

export function WompiCard(): ReactElement {
  const mark = partnerAssets.wompi;
  return (
    <article className="flex flex-col items-center gap-2">
      <span className={`${SOFT_RAIL_CARD_CLASSES} gold-rim inline-flex max-w-full items-center justify-center px-3 py-2`}>
        <Image src={mark.src} alt={mark.alt} sizes="128px" className="wompi-mark h-32 w-auto max-w-full object-contain" />
      </span>
      <span className="card-title line-clamp-2 text-center text-xs font-medium">Paga seguro con Wompi</span>
    </article>
  );
}

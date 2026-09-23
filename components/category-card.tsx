import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import type { DescribedImage } from "@/assets/described-image";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";
import type { NavItem } from "@/lib/navigation";

/** Frosted category tile. The object stays sharp on top of a plain backdrop blur. */
export function CategoryCard({
  item,
  image,
}: {
  readonly item: NavItem;
  readonly image: DescribedImage;
}): ReactElement {
  return (
    <Link
      href={item.href}
      className={`${SOFT_RAIL_CARD_CLASSES} gold-rim block h-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      <span className="flex h-full w-full flex-col gap-2 p-3">
        <span className="flex min-h-0 flex-1 items-center justify-center">
          <Image src={image.src} alt={image.alt} className="category-object max-h-40 w-auto object-contain" />
        </span>
        <span className="card-title line-clamp-2 text-center text-xs font-medium">{item.label}</span>
      </span>
    </Link>
  );
}

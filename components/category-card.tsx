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
      className="flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className={`${SOFT_RAIL_CARD_CLASSES} gold-rim flex h-44 items-center justify-center p-3`}>
        <Image src={image.src} alt={image.alt} className="category-object max-h-32 w-auto object-contain" />
      </span>
      <span className="card-title line-clamp-2 text-center text-xs font-medium">{item.label}</span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import type { DescribedImage } from "@/assets/described-image";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";
import { shouldPrefetch, type NavItem } from "@/lib/navigation";

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
      prefetch={shouldPrefetch(item.href) ? undefined : false}
      className="mx-auto flex w-fit max-w-full flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className={`${SOFT_RAIL_CARD_CLASSES} gold-rim inline-flex max-w-full items-center justify-center px-3 py-2`}>
        <Image src={image.src} alt={image.alt} sizes="128px" className="category-object h-32 w-auto max-w-full object-contain" />
      </span>
      <span className="card-title line-clamp-2 w-0 min-w-full text-center text-xs font-medium">{item.label}</span>
    </Link>
  );
}

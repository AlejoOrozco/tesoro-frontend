import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import type { DescribedImage } from "@/assets/described-image";
import { shouldPrefetch, type NavItem } from "@/lib/navigation";

/** Full-bleed photo. The product sits on the right and the name sits on the dark left. */
export function CategoryCard({
  item,
  image,
  labelInArt = false,
}: {
  readonly item: NavItem;
  readonly image: DescribedImage;
  /** The artwork already paints the category name, so the overlay label stays for screen readers only. */
  readonly labelInArt?: boolean;
}): ReactElement {
  return (
    <Link
      href={item.href}
      prefetch={shouldPrefetch(item.href) ? undefined : false}
      className="group gold-rim relative block aspect-[7/4] w-full overflow-hidden bg-black rounded-lg transition-transform duration-micro active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 15rem, (min-width: 640px) 42vw, 90vw"
        className="zoom-photo object-contain object-center"
      />
      <span
        className={
          labelInArt
            ? "sr-only"
            : "pointer-events-none absolute top-2 left-2 line-clamp-2 max-w-[48%] text-left text-xs font-medium leading-4 text-white drop-shadow-[0_2px_8px_rgb(0_0_0/0.85)]"
        }
      >
        {item.label}
      </span>
    </Link>
  );
}

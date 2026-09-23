import type { ReactElement } from "react";

import { categoryImages } from "@/assets/categories";
import type { DescribedImage } from "@/assets/described-image";
import { CategoryCard } from "@/components/category-card";
import { WompiCard } from "@/components/wompi-card";
import { CATEGORY_ITEMS } from "@/lib/navigation";

const CATEGORY_IMAGE_BY_HREF: Record<(typeof CATEGORY_ITEMS)[number]["href"], DescribedImage> = {
  "/category/phones": categoryImages.phones,
  "/category/audio": categoryImages.audio,
  "/category/power": categoryImages.power,
  "/category/cases": categoryImages.cases,
  "/category/wearables": categoryImages.wearables,
};

/** First row: one category tile per catalog group, then Wompi. */
export function HeroTrust(): ReactElement {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {CATEGORY_ITEMS.map((item) => (
        <li key={item.href}>
          <CategoryCard item={item} image={CATEGORY_IMAGE_BY_HREF[item.href]} />
        </li>
      ))}
      <li>
        <WompiCard />
      </li>
    </ul>
  );
}

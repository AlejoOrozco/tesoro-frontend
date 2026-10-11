import type { ReactElement } from "react";

import { categoryImages, type CategoryArt } from "@/assets/categories";
import { CategoryCard } from "@/components/category-card";
import { CATEGORY_ITEMS } from "@/lib/navigation";

const CATEGORY_IMAGE_BY_HREF: Record<(typeof CATEGORY_ITEMS)[number]["href"], CategoryArt> = {
  "/category/phones": categoryImages.phones,
  "/category/audio": categoryImages.audio,
  "/category/power": categoryImages.power,
  "/category/cases": categoryImages.cases,
  "/category/wearables": categoryImages.wearables,
};

/** First row: one category tile per catalog group. */
export function HeroTrust(): ReactElement {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {CATEGORY_ITEMS.map((item) => {
        const image = CATEGORY_IMAGE_BY_HREF[item.href];
        return (
          <li key={item.href}>
            <CategoryCard item={item} image={image} labelInArt={image.labelInArt} />
          </li>
        );
      })}
    </ul>
  );
}

import type { CatalogImage } from "@/lib/catalog-types";

/** General photos stay for every color. Color photos appear only for that color. */
export function imagesForColor(images: readonly CatalogImage[], variantId: string): readonly CatalogImage[] {
  return images
    .filter((image) => image.variantId === null || image.variantId === variantId)
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

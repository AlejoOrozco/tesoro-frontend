import type { ReactElement } from "react";

import { ProductSummary } from "@/components/product-summary";
import { SOFT_CARD_CLASSES } from "@/components/soft-card";
import type { Product } from "@/lib/products";

/** Hero promo tile — the small-card treatment stays on the hero row only. */
export function ProductCard({ product }: { readonly product: Product }): ReactElement {
  return (
    <article className={`${SOFT_CARD_CLASSES} flex h-full flex-col gap-2 p-3`}>
      <ProductSummary
        product={product}
        imageAlt=""
        imageSizes="(min-width: 1024px) 10rem, (min-width: 768px) 30vw, 50vw"
        imagePaddingClass="p-8"
      />
    </article>
  );
}

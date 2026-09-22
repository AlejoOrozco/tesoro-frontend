import type { ReactElement } from "react";

import { ProductSummary } from "@/components/product-summary";
import type { Product } from "@/lib/products";

/** Compact product in a rail — the collection panel is the card. */
export function ProductTile({ product }: { readonly product: Product }): ReactElement {
  return (
    <article className="flex h-full flex-col gap-2">
      <ProductSummary
        product={product}
        imageAlt={product.name}
        imageSizes="(min-width: 1024px) 8rem, (min-width: 640px) 22vw, 40vw"
        imagePaddingClass="p-4"
      />
    </article>
  );
}

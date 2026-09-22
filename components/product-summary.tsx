import Image from "next/image";
import type { ReactElement } from "react";

import { productAssets } from "@/assets/products";
import { ProductPrice } from "@/components/product-price";
import type { Product } from "@/lib/products";

const ARRIVAL_LABEL = "Llega en 3 días";

export function ProductSummary({
  product,
  imageAlt,
  imageSizes,
  imagePaddingClass,
}: {
  readonly product: Product;
  readonly imageAlt: string;
  readonly imageSizes: string;
  readonly imagePaddingClass: string;
}): ReactElement {
  const image = productAssets[product.imageId];
  return (
    <>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-background">
        <Image
          src={image}
          alt={imageAlt}
          sizes={imageSizes}
          className={`h-full w-full object-contain ${imagePaddingClass}`}
        />
      </div>
      <h3 className="line-clamp-2 text-xs font-medium">{product.name}</h3>
      <ProductPrice listPrice={product.listPrice} price={product.price} />
      <p className="text-xs font-bold text-success-400">{ARRIVAL_LABEL}</p>
    </>
  );
}

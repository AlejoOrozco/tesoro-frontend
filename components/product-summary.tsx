import Image from "next/image";
import type { ReactElement } from "react";

import { productAssets } from "@/assets/products";
import { DiscountDiamond } from "@/components/discount-diamond";
import { ProductPrice } from "@/components/product-price";
import { discountPercent } from "@/lib/money";
import type { Product } from "@/lib/products";

export function ProductSummary({
  product,
  imageSizes,
  imagePaddingClass,
}: {
  readonly product: Product;
  readonly imageSizes: string;
  readonly imagePaddingClass: string;
}): ReactElement {
  const image = productAssets[product.imageId];
  const percent = discountPercent(product.listPrice, product.price);
  return (
    <>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-background">
        <Image
          src={image.src}
          alt={image.alt}
          sizes={imageSizes}
          className={`h-full w-full object-contain ${imagePaddingClass}`}
        />
        <DiscountDiamond percent={percent} />
      </div>
      <h3 className="card-title line-clamp-2 text-xs font-medium">{product.name}</h3>
      <ProductPrice listPrice={product.listPrice} price={product.price} />
    </>
  );
}

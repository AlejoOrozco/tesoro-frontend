import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import { productAssets } from "@/assets/products";
import { DiscountDiamond } from "@/components/discount-diamond";
import { ProductPrice } from "@/components/product-price";
import { discountPercent } from "@/lib/money";
import type { CatalogCard } from "@/lib/catalog-types";

/** Landing photo stands in until catalog image URLs are shown. */
export function CatalogCardView({ product }: { readonly product: CatalogCard }): ReactElement {
  const listPrice = product.compareAtPrice ?? product.price;
  const percent = discountPercent(listPrice, product.price);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex h-full flex-col gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-background">
        <Image src={productAssets.powerBank.src} alt="" sizes="(min-width: 1024px) 16rem, 40vw" className="h-full w-full object-contain p-4" />
        <DiscountDiamond percent={percent} />
      </div>
      <h2 className="card-title line-clamp-2 text-xs font-medium">{product.name}</h2>
      <ProductPrice listPrice={listPrice} price={product.price} />
      {product.inStock ? null : <p className="text-xs text-muted">Agotado</p>}
    </Link>
  );
}

import Image from "next/image";
import type { ReactElement } from "react";

import { productAssets } from "@/assets/products";
import { SOFT_CARD_CLASSES } from "@/components/soft-card";
import { discountPercent, formatCop } from "@/lib/money";
import type { Product } from "@/lib/products";

function ProductPrice({ listPrice, price }: { readonly listPrice: number; readonly price: number }): ReactElement {
  const percent = discountPercent(listPrice, price);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted line-through">{formatCop(listPrice)}</p>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-2xl font-medium">{formatCop(price)}</p>
        {percent > 0 && <span className="text-sm font-bold text-success-700">{percent}% OFF</span>}
      </div>
    </div>
  );
}

export function ProductCard({ product }: { readonly product: Product }): ReactElement {
  const asset = productAssets[product.imageId];
  return (
    <article className={`${SOFT_CARD_CLASSES} flex flex-col gap-4`}>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-surface">
        <Image src={asset.image} alt="" sizes="(min-width: 1024px) 16rem, 50vw" className="h-full w-full object-contain p-4" />
      </div>
      <h3 className="text-base font-medium">{product.name}</h3>
      <ProductPrice listPrice={product.listPrice} price={product.price} />
      <p className="text-sm font-bold text-success-700">Llega en 3 días</p>
    </article>
  );
}

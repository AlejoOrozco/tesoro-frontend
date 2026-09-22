import Image from "next/image";
import type { ReactElement } from "react";

import { partnerAssets } from "@/assets/partners";
import { Button } from "@/components/button";
import { ProductCard } from "@/components/product-card";
import { SOFT_CARD_CLASSES } from "@/components/soft-card";
import { HERO_PRODUCTS } from "@/lib/products";

function WompiCard(): ReactElement {
  const mark = partnerAssets.wompi;
  return (
    <article className={`${SOFT_CARD_CLASSES} flex h-full flex-col items-center gap-2 px-3 py-4 text-center`}>
      <h3 className="text-lg font-medium">Paga seguro con Wompi</h3>
      <span className="flex flex-1 items-center justify-center py-2">
        <Image
          src={mark}
          alt=""
          sizes="10rem"
          className="wompi-mark h-24 w-auto max-w-full object-contain"
        />
      </span>
      <p className="text-xs leading-relaxed text-muted">Checkout encriptado con los medios de pago que ya usas.</p>
      <Button type="button" variant="secondary" size="sm">
        Conocer Wompi
      </Button>
    </article>
  );
}

export function HeroTrust(): ReactElement {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {HERO_PRODUCTS.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
      <li>
        <WompiCard />
      </li>
    </ul>
  );
}

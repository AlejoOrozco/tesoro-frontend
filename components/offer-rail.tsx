"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactElement, type Ref } from "react";
import audio from "@/assets/categories/audio.png";
import phoneCase from "@/assets/categories/cases.png";
import powerPack from "@/assets/categories/power.png";
import watch from "@/assets/categories/wearables.png";
import { productAssets } from "@/assets/products";
import type { DescribedImage } from "@/assets/described-image";
import { CartIcon } from "@/components/icons";
import { DiscountDiamond } from "@/components/discount-diamond";
import { ProductPrice } from "@/components/product-price";
import { RAIL_ITEM_CLASS, RailArrow, useRailScroll } from "@/components/rail-scroll";
import { discountPercent } from "@/lib/money";
import { getCollectionProducts, type Product, type ProductCollection } from "@/lib/products";

const IMAGE_SIZES = "(min-width: 1024px) 11rem, (min-width: 640px) 28vw, 42vw";

const OFFER_IMAGES: Readonly<Record<string, DescribedImage>> = {
  "power-bank-5000": productAssets.powerBank,
  "power-bank-10000": { src: powerPack, alt: "Batería portátil negra" },
  "earbuds-tws": { src: audio, alt: "Auriculares inalámbricos blancos" },
  "earbuds-anc": { src: audio, alt: "Auriculares inalámbricos blancos" },
  "watch-smart": { src: watch, alt: "Reloj inteligente gris" },
  "case-magsafe": { src: phoneCase, alt: "Funda lila para celular" },
};

function offerImage(product: Product): DescribedImage {
  return OFFER_IMAGES[product.id] ?? productAssets.powerBank;
}

function OfferCart({ name }: { readonly name: string }): ReactElement {
  return (
    <button
      type="button"
      aria-label={`Agregar ${name} al carrito`}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-micro hover:border-primary hover:text-primary active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <CartIcon className="size-4" />
    </button>
  );
}

function OfferCard({ product }: { readonly product: Product }): ReactElement {
  const image = offerImage(product);
  const percent = discountPercent(product.listPrice, product.price);
  return (
    <article className="group rail-frost gold-rim rail-card flex aspect-square w-full flex-col gap-2 rounded-lg p-3">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image src={image.src} alt={image.alt} fill sizes={IMAGE_SIZES} className="zoom-photo object-contain" />
        <DiscountDiamond percent={percent} />
      </div>
      <h3 className="card-title line-clamp-2 shrink-0 text-xs font-bold leading-4">{product.name}</h3>
      <div className="flex shrink-0 items-end justify-between gap-2">
        <ProductPrice listPrice={product.listPrice} price={product.price} />
        <OfferCart name={product.name} />
      </div>
    </article>
  );
}

function OfferHeading({ titleId, title }: { readonly titleId: string; readonly title: string }): ReactElement {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 id={titleId} className="card-title text-base font-bold tracking-tight sm:text-lg">
          {title}
        </h2>
        <span aria-hidden="true" className="title-fade mt-2" />
      </div>
      <Link
        href="/products"
        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground transition-colors duration-micro hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ver todas
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function OfferTrack({
  products,
  labelledBy,
  listRef,
}: {
  readonly products: readonly Product[];
  readonly labelledBy: string;
  readonly listRef: Ref<HTMLUListElement>;
}): ReactElement {
  return (
    <ul
      ref={listRef}
      aria-labelledby={labelledBy}
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {products.map((product) => (
        <li key={product.id} className={`${RAIL_ITEM_CLASS} flex`}>
          <OfferCard product={product} />
        </li>
      ))}
    </ul>
  );
}

/** Each product is its own glass card, with the row arrows half outside the track. */
export function OfferRail({ collection }: { readonly collection: ProductCollection }): ReactElement {
  const titleId = `${collection.id}-title`;
  const products = getCollectionProducts(collection.productIds);
  const { ends, listRef, scrollByPage } = useRailScroll();

  return (
    <section aria-labelledby={titleId}>
      <OfferHeading titleId={titleId} title={collection.title} />
      <div className="relative">
        <OfferTrack products={products} labelledBy={titleId} listRef={listRef} />
        <RailArrow
          direction="prev"
          disabled={!ends.canPrev}
          onClick={() => scrollByPage(-1)}
          className="left-0 -translate-x-1/2"
        />
        <RailArrow
          direction="next"
          disabled={!ends.canNext}
          onClick={() => scrollByPage(1)}
          className="right-0 translate-x-1/2"
        />
      </div>
    </section>
  );
}

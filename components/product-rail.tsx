"use client";

import { useState } from "react";
import type { ReactElement } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ProductTile } from "@/components/product-tile";
import { SOFT_RAIL_CARD_CLASSES } from "@/components/soft-card";
import { getRailPages, type Product, type ProductCollection } from "@/lib/products";

function RailArrow({
  direction,
  disabled,
  onClick,
}: {
  readonly direction: "prev" | "next";
  readonly disabled: boolean;
  readonly onClick: () => void;
}): ReactElement | null {
  if (disabled) return null;
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Ver productos anteriores" : "Ver más productos"}
      onClick={onClick}
      className={[
        "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-foreground shadow-sm ring-1 ring-neutral-200",
        "transition-transform duration-micro active:scale-[0.97] hover:bg-background",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isPrev ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
      ].join(" ")}
    >
      {isPrev ? <ChevronLeftIcon className="size-5" /> : <ChevronRightIcon className="size-5" />}
    </button>
  );
}

function RailStep({
  index,
  pageCount,
  isCurrent,
  onSelect,
}: {
  readonly index: number;
  readonly pageCount: number;
  readonly isCurrent: boolean;
  readonly onSelect: () => void;
}): ReactElement {
  return (
    <button
      type="button"
      aria-label={`Ver página ${index + 1} de ${pageCount}`}
      aria-current={isCurrent ? "true" : undefined}
      onClick={onSelect}
      className="relative flex size-3 items-center justify-center rounded-full transition-transform duration-micro before:absolute before:-inset-2 before:content-[''] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        className={
          isCurrent ? "block size-1.5 rounded-full bg-chrome" : "block size-1.5 rounded-full bg-neutral-300"
        }
      />
    </button>
  );
}

function RailStepper({
  page,
  pageCount,
  title,
  onSelect,
}: {
  readonly page: number;
  readonly pageCount: number;
  readonly title: string;
  readonly onSelect: (index: number) => void;
}): ReactElement | null {
  if (pageCount < 2) return null;
  return (
    <div role="group" aria-label={title} className="mt-4 flex items-center justify-center gap-1">
      {Array.from({ length: pageCount }, (_, index) => (
        <RailStep
          key={index}
          index={index}
          pageCount={pageCount}
          isCurrent={index === page}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

function RailPage({
  products,
  labelledBy,
  isActive,
}: {
  readonly products: readonly Product[];
  readonly labelledBy: string;
  readonly isActive: boolean;
}): ReactElement {
  return (
    <ul
      className="grid min-w-full shrink-0 basis-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      aria-labelledby={labelledBy}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      {products.map((product, index) => (
        <li key={`${product.id}-${index}`}>
          <ProductTile product={product} />
        </li>
      ))}
    </ul>
  );
}

export function ProductRail({ collection }: { readonly collection: ProductCollection }): ReactElement {
  const pages = getRailPages(collection.productIds);
  const [page, setPage] = useState(0);
  const lastPage = pages.length - 1;
  const titleId = `${collection.id}-title`;

  return (
    <article className={`${SOFT_RAIL_CARD_CLASSES} p-4 sm:p-6`}>
      <h2 id={titleId} className="mb-4 text-base font-bold tracking-tight sm:text-lg">
        {collection.title}
      </h2>
      <div className="relative">
        <div className="overflow-x-clip touch-pan-y">
          <div
            className="flex w-full transition-transform duration-standard motion-reduce:transition-none"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((products, pageIndex) => (
              <RailPage
                key={pageIndex}
                products={products}
                labelledBy={titleId}
                isActive={pageIndex === page}
              />
            ))}
          </div>
        </div>
        <RailArrow direction="prev" disabled={page === 0} onClick={() => setPage((current) => current - 1)} />
        <RailArrow direction="next" disabled={page === lastPage} onClick={() => setPage((current) => current + 1)} />
      </div>
      <RailStepper page={page} pageCount={pages.length} title={collection.title} onSelect={setPage} />
    </article>
  );
}

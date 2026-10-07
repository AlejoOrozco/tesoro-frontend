"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactElement } from "react";

import { productAssets } from "@/assets/products";
import { ProductPrice } from "@/components/product-price";
import { imagesForColor } from "@/lib/catalog-images";
import type { CatalogProduct, CatalogVariant } from "@/lib/catalog-types";
import { Heading, Text } from "@/components/typography";

const SWATCH_HEX = /^#[0-9A-Fa-f]{6}$/;

function defaultVariant(variants: readonly CatalogVariant[]): CatalogVariant | null {
  if (variants.length === 0) return null;
  return variants.find((variant) => variant.isDefault) ?? variants[0];
}

function stockLabel(stock: number): string {
  if (stock <= 0) return "Agotado";
  if (stock === 1) return "1 disponible";
  return `${stock} disponibles`;
}

function ColorPicker({
  variants,
  selectedId,
  onSelect,
}: {
  readonly variants: readonly CatalogVariant[];
  readonly selectedId: string;
  readonly onSelect: (variantId: string) => void;
}): ReactElement | null {
  if (variants.length < 2) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const selected = variant.id === selectedId;
        const swatch = SWATCH_HEX.test(variant.colorHex) ? variant.colorHex : undefined;
        return (
          <li key={variant.id}>
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(variant.id)}
              className={[
                "inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm",
                selected ? "border-primary" : "border-border",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              ].join(" ")}
            >
              <span aria-hidden="true" className="size-4 rounded-full border border-border" style={swatch === undefined ? undefined : { backgroundColor: swatch }} />
              {variant.colorName}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Landing photo stands in until catalog image URLs are shown. Color still changes price and stock. */
export function CatalogProductView({ product }: { readonly product: CatalogProduct }): ReactElement {
  const initial = defaultVariant(product.variants);
  const [selectedId, setSelectedId] = useState(initial?.id ?? "");
  const selected = product.variants.find((variant) => variant.id === selectedId) ?? initial ?? null;
  const price = selected?.price ?? product.price;
  const compareAt = selected?.compareAtPrice ?? product.compareAtPrice;
  const photos = selected === null ? product.images : imagesForColor(product.images, selected.id);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-background">
        <Image
          key={photos.map((photo) => photo.id).join("-") || "placeholder"}
          src={productAssets.powerBank.src}
          alt=""
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="h-full w-full object-contain p-8"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">{product.brand}</p>
        <Heading level={1}>{product.name}</Heading>
        <ProductPrice listPrice={compareAt ?? price} price={price} />
        <p className="text-sm">{selected === null ? null : stockLabel(selected.stock)}</p>
        {selected === null ? null : <ColorPicker variants={product.variants} selectedId={selected.id} onSelect={setSelectedId} />}
        <Text>{product.shortDescription}</Text>
        <Text>{product.description}</Text>
        <p className="text-sm text-muted">
          {product.weightGrams} g · {product.lengthCm} × {product.widthCm} × {product.heightCm} cm · {product.warrantyMonths} meses de garantía
        </p>
      </div>
    </div>
  );
}

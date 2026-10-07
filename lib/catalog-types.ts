export interface CatalogCategory {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}

export interface CatalogPhoto {
  readonly url: string;
  readonly altText: string;
}

export interface CatalogCard {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly brand: string;
  readonly category: CatalogCategory;
  readonly isFeatured: boolean;
  readonly price: number;
  readonly compareAtPrice: number | null;
  readonly inStock: boolean;
  readonly image: CatalogPhoto | null;
}

export interface CatalogVariant {
  readonly id: string;
  readonly colorName: string;
  readonly colorHex: string;
  readonly price: number;
  readonly compareAtPrice: number | null;
  readonly stock: number;
  readonly isDefault: boolean;
}

export interface CatalogImage extends CatalogPhoto {
  readonly id: string;
  readonly variantId: string | null;
  readonly sortOrder: number;
}

export interface CatalogProduct extends CatalogCard {
  readonly description: string;
  readonly weightGrams: number;
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
  readonly warrantyMonths: number;
  readonly variants: readonly CatalogVariant[];
  readonly images: readonly CatalogImage[];
}

export type CatalogLoad<T> = { readonly status: "ok"; readonly data: T } | { readonly status: "not-found" } | { readonly status: "error" };

import type { CatalogCard, CatalogCategory, CatalogImage, CatalogPhoto, CatalogProduct, CatalogVariant } from "@/lib/catalog-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0) return null;
  return value;
}

function readNumber(record: Record<string, unknown>, key: string): number | null {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function readBoolean(record: Record<string, unknown>, key: string): boolean | null {
  const value = record[key];
  if (typeof value !== "boolean") return null;
  return value;
}

/** `null` is an absent value. `undefined` means the field was the wrong type. */
function readNullableNumber(record: Record<string, unknown>, key: string): number | null | undefined {
  const value = record[key];
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return value;
}

function requireStrings(record: Record<string, unknown>, keys: readonly string[]): Record<string, string> | null {
  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = readString(record, key);
    if (value === null) return null;
    result[key] = value;
  }
  return result;
}

export function parseCategory(value: unknown): CatalogCategory | null {
  if (!isRecord(value)) return null;
  const fields = requireStrings(value, ["id", "name", "slug"]);
  if (fields === null) return null;
  return { id: fields.id, name: fields.name, slug: fields.slug };
}

export function parseCategories(value: unknown): readonly CatalogCategory[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const category = parseCategory(item);
    return category === null ? [] : [category];
  });
}

function parsePhoto(value: unknown): CatalogPhoto | null | undefined {
  if (value === null) return null;
  if (!isRecord(value)) return undefined;
  const url = readString(value, "url");
  const altText = readString(value, "altText");
  if (url === null || altText === null) return undefined;
  return { url, altText };
}

function parseCard(value: unknown): CatalogCard | null {
  if (!isRecord(value)) return null;
  const fields = requireStrings(value, ["id", "slug", "name", "shortDescription", "brand"]);
  const category = parseCategory(value.category);
  const price = readNumber(value, "price");
  const isFeatured = readBoolean(value, "isFeatured");
  const inStock = readBoolean(value, "inStock");
  const compareAtPrice = readNullableNumber(value, "compareAtPrice");
  const image = parsePhoto(value.image);
  if (fields === null || category === null || price === null || isFeatured === null || inStock === null) return null;
  if (compareAtPrice === undefined || image === undefined) return null;
  return {
    id: fields.id,
    slug: fields.slug,
    name: fields.name,
    shortDescription: fields.shortDescription,
    brand: fields.brand,
    category,
    isFeatured,
    price,
    compareAtPrice,
    inStock,
    image,
  };
}

export function parseCatalogCards(value: unknown): readonly CatalogCard[] | null {
  if (!Array.isArray(value)) return null;
  const cards: CatalogCard[] = [];
  for (const item of value) {
    const card = parseCard(item);
    if (card === null) return null;
    cards.push(card);
  }
  return cards;
}

function parseVariant(value: unknown): CatalogVariant | null {
  if (!isRecord(value)) return null;
  const fields = requireStrings(value, ["id", "colorName", "colorHex"]);
  const price = readNumber(value, "price");
  const stock = readNumber(value, "stock");
  const isDefault = readBoolean(value, "isDefault");
  const compareAtPrice = readNullableNumber(value, "compareAtPrice");
  if (fields === null || price === null || stock === null || isDefault === null || compareAtPrice === undefined) return null;
  return {
    id: fields.id,
    colorName: fields.colorName,
    colorHex: fields.colorHex,
    price,
    compareAtPrice,
    stock,
    isDefault,
  };
}

function parseImage(value: unknown): CatalogImage | null {
  if (!isRecord(value)) return null;
  const fields = requireStrings(value, ["id", "url", "altText"]);
  const sortOrder = readNumber(value, "sortOrder");
  const variantId = readNullableString(value, "variantId");
  if (fields === null || sortOrder === null || variantId === undefined) return null;
  return {
    id: fields.id,
    url: fields.url,
    altText: fields.altText,
    sortOrder,
    variantId,
  };
}

function readNullableString(record: Record<string, unknown>, key: string): string | null | undefined {
  const value = record[key];
  if (value === null) return null;
  if (typeof value !== "string" || value.length === 0) return undefined;
  return value;
}

function parseVariants(value: unknown): readonly CatalogVariant[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const variants: CatalogVariant[] = [];
  for (const item of value) {
    const variant = parseVariant(item);
    if (variant === null) return null;
    variants.push(variant);
  }
  return variants;
}

function parseImages(value: unknown): readonly CatalogImage[] | null {
  if (!Array.isArray(value)) return null;
  const images: CatalogImage[] = [];
  for (const item of value) {
    const image = parseImage(item);
    if (image === null) return null;
    images.push(image);
  }
  return images;
}

export function parseCatalogProduct(value: unknown): CatalogProduct | null {
  const card = parseCard(value);
  if (card === null || !isRecord(value)) return null;
  const fields = requireStrings(value, ["description"]);
  const weightGrams = readNumber(value, "weightGrams");
  const lengthCm = readNumber(value, "lengthCm");
  const widthCm = readNumber(value, "widthCm");
  const heightCm = readNumber(value, "heightCm");
  const warrantyMonths = readNumber(value, "warrantyMonths");
  const variants = parseVariants(value.variants);
  const images = parseImages(value.images);
  if (fields === null || weightGrams === null || lengthCm === null || widthCm === null) return null;
  if (heightCm === null || warrantyMonths === null || variants === null || images === null) return null;
  return { ...card, description: fields.description, weightGrams, lengthCm, widthCm, heightCm, warrantyMonths, variants, images };
}

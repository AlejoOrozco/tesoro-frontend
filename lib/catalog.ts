import { parseCatalogCards, parseCatalogProduct, parseCategories } from "@/lib/catalog-parse";
import type { CatalogCard, CatalogCategory, CatalogLoad, CatalogProduct } from "@/lib/catalog-types";
import { logger } from "@/lib/logger";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isCatalogSlug(value: string): boolean {
  return SLUG.test(value);
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (cause) {
    logger.error("Catalog response was not JSON", cause);
    return null;
  }
}

async function getCatalog(apiOrigin: string | null, path: string): Promise<Response | null> {
  if (apiOrigin === null) return null;
  try {
    return await fetch(`${apiOrigin}${path}`, { cache: "no-store" });
  } catch (cause) {
    logger.error(`GET ${path} failed`, cause);
    return null;
  }
}

export async function getCategories(apiOrigin: string | null): Promise<readonly CatalogCategory[]> {
  const response = await getCatalog(apiOrigin, "/categories");
  if (response === null || !response.ok) {
    if (response !== null) logger.error(`GET /categories failed with status ${response.status}`);
    return [];
  }
  return parseCategories(await readJson(response));
}

export async function getProducts(apiOrigin: string | null, category: string | null): Promise<CatalogLoad<readonly CatalogCard[]>> {
  const query = category === null ? "" : `?category=${encodeURIComponent(category)}`;
  const response = await getCatalog(apiOrigin, `/products${query}`);
  if (response === null || !response.ok) {
    if (response !== null) logger.error(`GET /products failed with status ${response.status}`);
    return { status: "error" };
  }
  const cards = parseCatalogCards(await readJson(response));
  if (cards === null) {
    logger.error("GET /products returned an unexpected body");
    return { status: "error" };
  }
  return { status: "ok", data: cards };
}

export async function getProduct(apiOrigin: string | null, slug: string): Promise<CatalogLoad<CatalogProduct>> {
  const response = await getCatalog(apiOrigin, `/products/${encodeURIComponent(slug)}`);
  if (response === null) return { status: "error" };
  if (response.status === 404) return { status: "not-found" };
  if (!response.ok) {
    logger.error(`GET /products/${slug} failed with status ${response.status}`);
    return { status: "error" };
  }
  const product = parseCatalogProduct(await readJson(response));
  if (product === null) {
    logger.error(`GET /products/${slug} returned an unexpected body`);
    return { status: "error" };
  }
  return { status: "ok", data: product };
}

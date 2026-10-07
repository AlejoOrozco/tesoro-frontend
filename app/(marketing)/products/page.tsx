import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";

import { ButtonLink } from "@/components/button";
import { CatalogCardView } from "@/components/catalog-card";
import { EmptyState } from "@/components/empty-state";
import { SearchIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Heading } from "@/components/typography";
import { getCategories, getProducts, isCatalogSlug } from "@/lib/catalog";
import type { CatalogCategory } from "@/lib/catalog-types";
import { readSiteOrigins } from "@/lib/origins";

export const metadata: Metadata = {
  title: "Catálogo",
};

interface ProductsPageProps {
  readonly searchParams: Promise<{
    readonly category?: string | string[];
  }>;
}

function categoryFromParams(raw: string | string[] | undefined): string | null {
  if (typeof raw !== "string" || !isCatalogSlug(raw)) return null;
  return raw;
}

function categoryName(categories: readonly CatalogCategory[], slug: string | null): string {
  if (slug === null) return "Catálogo";
  return categories.find((category) => category.slug === slug)?.name ?? "Catálogo";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps): Promise<ReactElement> {
  const origins = readSiteOrigins();
  const params = await searchParams;
  const category = categoryFromParams(params.category);
  const [categories, products] = await Promise.all([getCategories(origins.apiOrigin), getProducts(origins.apiOrigin, category)]);
  const title = categoryName(categories, category);

  const hasProducts = products.status === "ok" && products.data.length > 0;

  return (
    <Section className="flex flex-col gap-8">
      {hasProducts ? <Heading level={1}>{title}</Heading> : null}
      <CategoryFilters categories={categories} selected={category} />
      <ProductGrid products={products} category={category} />
    </Section>
  );
}

function CategoryFilters({
  categories,
  selected,
}: {
  readonly categories: readonly CatalogCategory[];
  readonly selected: string | null;
}): ReactElement | null {
  if (categories.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      <li>
        <FilterLink href="/products" label="Todos" selected={selected === null} />
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <FilterLink
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            label={category.name}
            selected={category.slug === selected}
          />
        </li>
      ))}
    </ul>
  );
}

function FilterLink({ href, label, selected }: { readonly href: string; readonly label: string; readonly selected: boolean }): ReactElement {
  return (
    <Link
      href={href}
      aria-current={selected ? "page" : undefined}
      className={[
        "inline-flex min-h-11 items-center rounded-md border px-3 text-sm",
        selected ? "border-primary" : "border-border",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function ProductGrid({
  products,
  category,
}: {
  readonly products: Awaited<ReturnType<typeof getProducts>>;
  readonly category: string | null;
}): ReactElement {
  if (products.status !== "ok") {
    const href = category === null ? "/products" : `/products?category=${encodeURIComponent(category)}`;
    return (
      <EmptyState
        icon={<SearchIcon />}
        title="No pudimos cargar el catálogo"
        description="La tienda no respondió. Inténtalo de nuevo en un momento."
        action={<ButtonLink href={href}>Reintentar</ButtonLink>}
      />
    );
  }
  if (products.data.length === 0) {
    return (
      <EmptyState
        icon={<SearchIcon />}
        title="Todavía no hay productos"
        description="Cuando el catálogo tenga productos, van a aparecer aquí."
        action={<ButtonLink href="/">Volver al inicio</ButtonLink>}
      />
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.data.map((product) => (
        <li key={product.id}>
          <CatalogCardView product={product} />
        </li>
      ))}
    </ul>
  );
}

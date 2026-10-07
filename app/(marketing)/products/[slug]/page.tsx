import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { ButtonLink } from "@/components/button";
import { CatalogProductView } from "@/components/catalog-product";
import { EmptyState } from "@/components/empty-state";
import { AlertTriangleIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { getProduct, isCatalogSlug } from "@/lib/catalog";
import { readSiteOrigins } from "@/lib/origins";

interface ProductPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCatalogSlug(slug)) return { title: "Producto" };
  const product = await getProduct(readSiteOrigins().apiOrigin, slug);
  if (product.status !== "ok") return { title: "Producto" };
  return { title: product.data.name, description: product.data.shortDescription };
}

export default async function ProductPage({ params }: ProductPageProps): Promise<ReactElement> {
  const { slug } = await params;
  if (!isCatalogSlug(slug)) notFound();
  const product = await getProduct(readSiteOrigins().apiOrigin, slug);
  if (product.status === "not-found") notFound();
  if (product.status === "error") {
    return (
      <Section className="flex min-h-[50vh] items-center">
        <EmptyState
          icon={<AlertTriangleIcon />}
          title="No pudimos abrir este producto"
          description="La tienda no respondió. Inténtalo de nuevo en un momento."
          action={<ButtonLink href={`/products/${slug}`}>Reintentar</ButtonLink>}
        />
      </Section>
    );
  }
  return (
    <Section>
      <CatalogProductView product={product.data} />
    </Section>
  );
}

import type { ReactElement } from "react";

import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { Heading, Text } from "@/components/typography";
import { PRODUCTS } from "@/lib/products";

export function ProductsSection(): ReactElement {
  return (
    <Section id="productos" className="scroll-mt-16">
      <Heading level={2}>Productos destacados</Heading>
      <Text tone="muted" className="mt-2 max-w-2xl">
        Tecnología y accesorios con envío a todo el país. Precios de referencia mientras cerramos el catálogo.
      </Text>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

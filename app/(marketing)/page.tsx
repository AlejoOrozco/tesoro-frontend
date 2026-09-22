import type { ReactElement } from "react";

import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <ProductsSection />
    </>
  );
}

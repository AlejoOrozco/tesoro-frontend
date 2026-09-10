import type { ReactElement } from "react";

import { Hero } from "@/components/hero";
import { ImportCallout } from "@/components/import-callout";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ProductsSection } from "@/components/products-section";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ImportCallout />
      <NewsletterSignup />
    </>
  );
}

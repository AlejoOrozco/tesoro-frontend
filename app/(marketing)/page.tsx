import type { ReactElement } from "react";

import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <ServicesSection />
    </>
  );
}

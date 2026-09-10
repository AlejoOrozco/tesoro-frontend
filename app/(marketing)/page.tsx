import type { ReactElement } from "react";

import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { SucursalesSection } from "@/components/sucursales-section";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SucursalesSection />
    </>
  );
}

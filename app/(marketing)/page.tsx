import type { ReactElement } from "react";

import { Hero } from "@/components/hero";
import { ImportCallout } from "@/components/import-callout";
import { ServicesSection } from "@/components/services-section";
import { SucursalesSection } from "@/components/sucursales-section";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <ImportCallout />
      <ServicesSection />
      <SucursalesSection />
    </>
  );
}

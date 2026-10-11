import { Fragment, type ReactElement } from "react";

import { ImportCallout } from "@/components/import-callout";
import { OfferRail } from "@/components/offer-rail";
import { Section } from "@/components/section";
import { PRODUCT_COLLECTIONS } from "@/lib/products";

export function ProductsSection(): ReactElement {
  return (
    <Section id="productos" className="scroll-mt-[var(--header-offset)]">
      <div className="flex flex-col gap-8">
        {PRODUCT_COLLECTIONS.map((collection) => (
          <Fragment key={collection.id}>
            <OfferRail collection={collection} />
            {collection.id === "power" ? <ImportCallout /> : null}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}

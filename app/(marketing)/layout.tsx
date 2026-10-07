import Image from "next/image";
import type { ReactElement } from "react";

import diamondGold from "@/assets/brand/diamond-gold.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";
import { getCategories } from "@/lib/catalog";
import { readSiteOrigins } from "@/lib/origins";

/** Artwork is 1672×941. Height is min(75vh, 56rem), so width is about 1.78× that. */
const DIAMOND_SIZES = "min(133vh, 100rem)";

export default async function MarketingLayout({ children }: LayoutProps<"/">): Promise<ReactElement> {
  const origins = readSiteOrigins();
  const categories = await getCategories(origins.apiOrigin);

  return (
    <div className="marketing-shell relative isolate flex min-h-dvh flex-col">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background">
        <Image src={diamondGold} alt="" sizes={DIAMOND_SIZES} loading="eager" className="page-diamond" />
      </div>
      <SiteHeader origins={origins} categories={categories} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="marketing-main relative z-0 flex-1 scroll-mt-[var(--header-offset)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

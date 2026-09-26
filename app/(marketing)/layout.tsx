import Image from "next/image";
import type { ReactElement } from "react";

import diamondGold from "@/assets/brand/diamond-gold.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";
import { readSiteOrigins } from "@/lib/origins";

export default function MarketingLayout({ children }: LayoutProps<"/">): ReactElement {
  const origins = readSiteOrigins();

  return (
    <div className="marketing-shell relative isolate flex min-h-dvh flex-col">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background">
        <Image src={diamondGold} alt="" className="page-diamond" />
      </div>
      <SiteHeader origins={origins} />
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

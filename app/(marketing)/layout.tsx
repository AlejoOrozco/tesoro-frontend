import type { ReactElement } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";

export default function MarketingLayout({ children }: LayoutProps<"/">): ReactElement {
  return (
    <div className="marketing-shell relative isolate flex min-h-dvh flex-col">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background" />
      <SiteHeader />
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

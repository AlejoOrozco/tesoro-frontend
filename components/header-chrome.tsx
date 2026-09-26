import Link from "next/link";
import type { ReactElement } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { Container } from "@/components/container";
import { HeaderAccountIcons } from "@/components/header-account";
import { HeaderDepartments } from "@/components/header-departments";
import { HeaderLocation } from "@/components/header-location";
import { SiteSearch } from "@/components/site-search";
import type { SiteOrigins } from "@/lib/origins";

/** Search stays 42rem; logo and icons inset a little toward it. */
export function HeaderChrome({
  isHidden,
  origins,
}: {
  readonly isHidden: boolean;
  readonly origins: SiteOrigins;
}): ReactElement {
  return (
    <Container className="relative pt-2">
      <div className="mx-auto grid w-full max-w-[74rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-6 lg:gap-x-8">
        <Link
          href="/"
          className="inline-flex justify-self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <BrandLockup preload />
        </Link>

        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <SiteSearch />
        </div>

        {/* Span both rows and the top padding so the links sit on the bar’s vertical midpoint. */}
        <div className="col-start-3 row-span-2 -mt-2 flex h-[calc(100%+0.5rem)] items-center justify-self-end">
          <HeaderAccountIcons origins={origins} />
        </div>

        <HeaderLocation />

        <HeaderDepartments isHidden={isHidden} />
      </div>
    </Container>
  );
}

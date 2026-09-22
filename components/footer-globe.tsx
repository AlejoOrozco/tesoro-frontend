import type { ReactElement } from "react";

import { Globe } from "@/components/ui/cobe-globe";
import { TRADE_ARCS, TRADE_MARKERS } from "@/lib/globe-routes";

/** Compact navy globe with gold import routes and the brand tagline. */
export function FooterGlobe(): ReactElement {
  return (
    <section
      aria-label="Rutas entre Estados Unidos, China y Colombia"
      className="mx-auto flex w-full flex-col items-center"
    >
      <div className="w-full max-w-md pt-4 sm:max-w-lg">
        <Globe markers={TRADE_MARKERS} arcs={TRADE_ARCS} />
      </div>
      <p className="mt-4 text-center text-2xl font-bold tracking-[0.08em] text-white uppercase sm:text-3xl">
        Conectando al mundo
      </p>
    </section>
  );
}

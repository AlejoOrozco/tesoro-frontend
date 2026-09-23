import type { ReactElement } from "react";

import { Globe } from "@/components/ui/cobe-globe";
import { TRADE_ARCS, TRADE_MARKERS } from "@/lib/globe-routes";

const TAGLINE = "CONECTANDO AL MUNDO";
const TAGLINE_ARC = "M 12 118 Q 260 22 508 118";

function GlobeTaglineGlyphs(): ReactElement {
  return (
    <text fontFamily="var(--font-sans)" fontSize="34" fontWeight="700" letterSpacing="1.5">
      <textPath href="#globe-tagline-arc" startOffset="50%" textAnchor="middle">
        {TAGLINE}
      </textPath>
    </text>
  );
}

function GlobeTagline(): ReactElement {
  return (
    <svg
      viewBox="0 0 520 148"
      role="img"
      aria-label="Conectando al mundo"
      className="globe-tagline pointer-events-none absolute top-1/2 left-1/2 z-10 w-[92%] -translate-x-1/2 -translate-y-[58%] overflow-visible"
    >
      <defs>
        <path id="globe-tagline-arc" d={TAGLINE_ARC} fill="none" />
      </defs>
      <g fill="#ffffff">
        <GlobeTaglineGlyphs />
      </g>
    </svg>
  );
}

/** Compact navy globe with the tagline centered on the sphere. */
export function FooterGlobe(): ReactElement {
  return (
    <section aria-label="Rutas entre Estados Unidos, China y Colombia" className="mx-auto w-full max-w-md pt-4 sm:max-w-lg">
      <div className="relative">
        <div className="relative z-0">
          <Globe markers={TRADE_MARKERS} arcs={TRADE_ARCS} />
        </div>
        <GlobeTagline />
      </div>
    </section>
  );
}

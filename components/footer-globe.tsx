"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement, RefObject } from "react";

import { TRADE_ARCS, TRADE_MARKERS } from "@/lib/globe-routes";

const TAGLINE = "CONECTANDO AL MUNDO";
const TAGLINE_ARC = "M 12 118 Q 260 22 508 118";
const GLOBE_ROOT_MARGIN = "240px";

type GlobeView = typeof import("@/components/ui/cobe-globe").Globe;

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
      className="globe-tagline pointer-events-none absolute top-0 left-1/2 z-10 w-[92%] -translate-x-1/2 -translate-y-[28%] overflow-visible"
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

function loadGlobe(): Promise<GlobeView> {
  return import("@/components/ui/cobe-globe").then((mod) => mod.Globe);
}

function useGlobeWhenNear(rootRef: RefObject<HTMLDivElement | null>): GlobeView | null {
  const [GlobeCanvas, setGlobeCanvas] = useState<GlobeView | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      void loadGlobe().then((View) => {
        setGlobeCanvas(() => View);
      });
    }, { rootMargin: GLOBE_ROOT_MARGIN });
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);

  return GlobeCanvas;
}

function GlobeCanvas({ view }: { readonly view: GlobeView | null }): ReactElement {
  if (view === null) return <div className="aspect-square w-full" />;
  const Canvas = view;
  return <Canvas markers={TRADE_MARKERS} arcs={TRADE_ARCS} />;
}

/** Compact navy globe with the tagline arched above the sphere. The WebGL chunk loads near the footer. */
export function FooterGlobe(): ReactElement {
  const slotRef = useRef<HTMLDivElement>(null);
  const GlobeView = useGlobeWhenNear(slotRef);

  return (
    <section aria-label="Rutas entre Estados Unidos, China y Colombia" className="mx-auto w-full max-w-md pt-4 sm:max-w-lg">
      <div className="relative">
        <div ref={slotRef} className="relative z-0">
          <GlobeCanvas view={GlobeView} />
        </div>
        <GlobeTagline />
      </div>
    </section>
  );
}

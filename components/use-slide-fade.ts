"use client";

import { useEffect, type RefObject } from "react";

import { sampleBackdropColor } from "@/lib/sample-backdrop-color";

function activeSlideImage(region: HTMLElement): HTMLImageElement | null {
  for (const image of region.querySelectorAll("img")) {
    if (image instanceof HTMLImageElement && image.alt.length > 0) return image;
  }
  return null;
}

function paintGlow(region: HTMLElement, color: string): void {
  const glow = region.closest("section")?.querySelector(".hero-ending-glow");
  if (!(glow instanceof HTMLElement)) return;
  glow.style.setProperty("--hero-fade", color);
}

/** Match the card-row wash to the backdrop color of the slide on screen. */
export function useSlideFade(regionRef: RefObject<HTMLElement | null>, index: number): void {
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const image = activeSlideImage(region);
    if (!image) return;

    const paint = (): void => {
      const color = sampleBackdropColor(image);
      if (color) paintGlow(region, color);
    };

    if (image.complete && image.naturalWidth > 0) {
      paint();
      return;
    }
    image.addEventListener("load", paint, { once: true });
    return () => image.removeEventListener("load", paint);
  }, [regionRef, index]);
}

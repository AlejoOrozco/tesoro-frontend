"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactElement } from "react";

import { HERO_SLIDES } from "@/assets/hero";
import { Container } from "@/components/container";
import { HeroBannerProgress } from "@/components/hero-banner-progress";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const ROTATE_MS = 5000;
const SLIDE_COUNT = HERO_SLIDES.length;
const SLIDE_LABELS = HERO_SLIDES.map((slide) => slide.alt);

function BannerArrow({
  direction,
  onClick,
}: {
  readonly direction: "prev" | "next";
  readonly onClick: () => void;
}): ReactElement {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Promoción anterior" : "Siguiente promoción"}
      onClick={onClick}
      className={[
        "absolute top-1/2 z-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-foreground shadow-sm ring-1 ring-neutral-200",
        "transition-colors duration-micro hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isPrev ? "left-4 sm:left-8" : "right-4 sm:right-8",
      ].join(" ")}
    >
      {isPrev ? <ChevronLeftIcon className="size-5" /> : <ChevronRightIcon className="size-5" />}
    </button>
  );
}

export function HeroBanner(): ReactElement {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  function goBy(delta: number): void {
    setIndex((current) => (current + delta + SLIDE_COUNT) % SLIDE_COUNT);
  }

  function handleElapsed(fromIndex: number): void {
    setIndex((current) => {
      if (current !== fromIndex) return current;
      return (current + 1) % SLIDE_COUNT;
    });
  }

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Promociones"
      className="relative w-full"
    >
      <div
        className="relative"
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          const nextFocus = event.relatedTarget;
          if (nextFocus instanceof Node && event.currentTarget.contains(nextFocus)) return;
          setIsPaused(false);
        }}
      >
        <Container>
          <div className="relative aspect-[96/25] w-full overflow-hidden">
            {HERO_SLIDES.map((slide, slideIndex) => {
              const isActive = slideIndex === index;
              return (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={isActive ? slide.alt : ""}
                  fill
                  preload={slideIndex === 0}
                  sizes="(min-width: 1344px) 80rem, calc(100vw - 2rem)"
                  aria-hidden={!isActive}
                  className={[
                    "object-contain object-center transition-opacity duration-standard motion-reduce:transition-none",
                    isActive ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </Container>
        <BannerArrow direction="prev" onClick={() => goBy(-1)} />
        <BannerArrow direction="next" onClick={() => goBy(1)} />
      </div>
      <Container>
        <div className="flex justify-center pt-2">
          <HeroBannerProgress
            index={index}
            labels={SLIDE_LABELS}
            durationMs={ROTATE_MS}
            isPaused={isPaused}
            onElapsed={handleElapsed}
            onSelect={setIndex}
          />
        </div>
      </Container>
    </div>
  );
}

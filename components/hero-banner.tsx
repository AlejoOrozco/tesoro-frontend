"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactElement, TransitionEvent } from "react";

import { HERO_SLIDES, type HeroSlide } from "@/assets/hero";
import { Container } from "@/components/container";
import { HeroBannerProgress } from "@/components/hero-banner-progress";
import { LineChevron } from "@/components/icons";

const ROTATE_MS = 5000;
const SLIDE_COUNT = HERO_SLIDES.length;
const SLIDE_LABELS = HERO_SLIDES.map((slide) => slide.alt);
const FIRST_VISUAL = 1;
const LAST_VISUAL = SLIDE_COUNT;
const FIRST_CLONE = SLIDE_COUNT + 1;
const LAST_CLONE = 0;

function loopSlides(slides: readonly HeroSlide[]): readonly HeroSlide[] {
  const first = slides[0];
  const last = slides[slides.length - 1];
  if (!first || !last) return slides;
  return [
    { id: `${last.id}-loop-start`, image: last.image, alt: last.alt },
    ...slides,
    { id: `${first.id}-loop-end`, image: first.image, alt: first.alt },
  ];
}

const HERO_TRACK = loopSlides(HERO_SLIDES);

function slideIndexFromVisual(visual: number): number {
  if (visual === LAST_CLONE) return SLIDE_COUNT - 1;
  if (visual === FIRST_CLONE) return 0;
  return visual - FIRST_VISUAL;
}

function restingVisual(visual: number): number {
  if (visual === FIRST_CLONE) return FIRST_VISUAL;
  if (visual === LAST_CLONE) return LAST_VISUAL;
  return visual;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => {
        onClick();
        event.currentTarget.blur();
      }}
      className={[
        "absolute top-1/2 z-10 -translate-y-1/2",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isPrev ? "left-4 sm:left-8" : "right-4 sm:right-8",
      ].join(" ")}
    >
      <span
        className={[
          "line-arrow inline-flex size-11 items-center justify-center text-chrome-foreground",
          "active:scale-[0.97]",
        ].join(" ")}
      >
        <LineChevron direction={direction} />
      </span>
    </button>
  );
}

function HeroFrame({
  slide,
  isActive,
  preload,
}: {
  readonly slide: HeroSlide;
  readonly isActive: boolean;
  readonly preload: boolean;
}): ReactElement {
  return (
    <div className="relative h-full min-w-full shrink-0 basis-full" aria-hidden={!isActive} inert={!isActive}>
      <Image
        src={slide.image}
        alt={isActive ? slide.alt : ""}
        fill
        preload={preload}
        sizes="(min-width: 1344px) 80rem, calc(100vw - 2rem)"
        className="object-contain object-center"
      />
    </div>
  );
}

function HeroTrack({
  visual,
  animate,
  onSettle,
}: {
  readonly visual: number;
  readonly animate: boolean;
  readonly onSettle: (event: TransitionEvent<HTMLDivElement>) => void;
}): ReactElement {
  const motion = animate ? "transition-transform duration-standard ease-out motion-reduce:transition-none" : "";
  return (
    <div className="relative aspect-[96/25] w-full overflow-hidden">
      <div className={["flex h-full w-full", motion].filter(Boolean).join(" ")} style={{ transform: `translateX(-${visual * 100}%)` }} onTransitionEnd={onSettle}>
        {HERO_TRACK.map((slide, trackIndex) => (
          <HeroFrame
            key={slide.id}
            slide={slide}
            isActive={trackIndex === visual}
            preload={slide.id === HERO_SLIDES[0]?.id}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroBanner(): ReactElement {
  const [visual, setVisual] = useState(FIRST_VISUAL);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const index = slideIndexFromVisual(visual);

  function moveTo(nextVisual: number): void {
    if (prefersReducedMotion()) {
      setAnimate(false);
      setVisual(restingVisual(nextVisual));
      return;
    }
    setAnimate(true);
    setVisual(nextVisual);
  }

  function goBy(delta: number): void {
    const current = restingVisual(visual);
    const currentIndex = slideIndexFromVisual(current);
    if (delta > 0 && currentIndex === SLIDE_COUNT - 1) {
      moveTo(FIRST_CLONE);
      return;
    }
    if (delta < 0 && currentIndex === 0) {
      moveTo(LAST_CLONE);
      return;
    }
    moveTo(current + delta);
  }

  function goToIndex(nextIndex: number): void {
    moveTo(nextIndex + FIRST_VISUAL);
  }

  function handleElapsed(fromIndex: number): void {
    if (index !== fromIndex) return;
    goBy(1);
  }

  function settleTrack(event: TransitionEvent<HTMLDivElement>): void {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (visual !== FIRST_CLONE && visual !== LAST_CLONE) return;
    setAnimate(false);
    setVisual(restingVisual(visual));
  }

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Promociones" className="relative w-full">
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
          <HeroTrack visual={visual} animate={animate} onSettle={settleTrack} />
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
            onSelect={goToIndex}
          />
        </div>
      </Container>
    </div>
  );
}

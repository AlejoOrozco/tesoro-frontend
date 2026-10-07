"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode, RefObject } from "react";

import { brandAssets } from "@/assets/brand";

const FADE_IN_MS = 800;
const HOLD_MS = 220;
const TRAVEL_MS = 900;
/** Share of the flight spent on the dark veil before it starts to lift. */
const VEIL_DELAY_MS = 500;
const EASE_IN = "cubic-bezier(0.45, 0.05, 0.55, 1)";
const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const COVER_ATTR = "data-page-intro";
const LOCKUP_SELECTOR = "header [data-brand-lockup]";

interface PageIntroProps {
  readonly children: ReactNode;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lockPageScroll(): () => void {
  const root = document.documentElement;
  const body = document.body;
  const previousRoot = root.style.overflow;
  const previousBody = body.style.overflow;
  root.style.overflow = "hidden";
  body.style.overflow = "hidden";
  return () => {
    root.style.overflow = previousRoot;
    body.style.overflow = previousBody;
  };
}

function releaseScroll(unlockRef: RefObject<(() => void) | null>): void {
  unlockRef.current?.();
  unlockRef.current = null;
}

function readLockupRect(): DOMRect | null {
  const lockup = document.querySelector(LOCKUP_SELECTOR);
  if (!(lockup instanceof HTMLElement)) return null;
  const rect = lockup.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return null;
  return rect;
}

function startScale(targetWidth: number): number {
  const capped = Math.min(targetWidth * 3.2, window.innerWidth * 0.72, 26 * 16);
  return Math.max(1, capped / targetWidth);
}

function flightFrom(rect: DOMRect, scale: number): string {
  const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
  const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${scale})`;
}

function parkOnLockup(mark: HTMLElement, rect: DOMRect): string {
  const from = flightFrom(rect, startScale(rect.width));
  mark.style.left = `${rect.left}px`;
  mark.style.top = `${rect.top}px`;
  mark.style.width = `${rect.width}px`;
  mark.style.height = `${rect.height}px`;
  mark.style.transform = from;
  return from;
}

function stopCssFallback(veil: HTMLElement, reveal: HTMLElement): void {
  veil.style.animation = "none";
  reveal.style.animation = "none";
}

function fadeMarkIn(mark: HTMLElement, from: string): Promise<void> {
  const duration = FADE_IN_MS + HOLD_MS;
  const fade = mark.animate(
    [
      { opacity: 0, transform: from, easing: EASE_IN },
      { opacity: 1, transform: from, offset: FADE_IN_MS / duration },
      { opacity: 1, transform: from },
    ],
    { duration, fill: "forwards" },
  );
  return fade.finished.then(() => {
    fade.cancel();
    mark.style.opacity = "1";
    mark.style.transform = from;
  });
}

function crossfadePage(veil: HTMLElement, reveal: HTMLElement, delay = 0): void {
  const duration = TRAVEL_MS - delay;
  veil.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration,
    delay,
    easing: EASE_OUT,
    fill: "forwards",
  });
  reveal.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration,
    delay,
    easing: EASE_OUT,
    fill: "forwards",
  });
}

function snapOntoLockup(mark: HTMLElement): void {
  const rect = readLockupRect();
  mark.style.transform = "none";
  if (!rect) return;
  mark.style.left = `${rect.left}px`;
  mark.style.top = `${rect.top}px`;
  mark.style.width = `${rect.width}px`;
  mark.style.height = `${rect.height}px`;
}

function flyToHeader(mark: HTMLElement, veil: HTMLElement, reveal: HTMLElement, from: string): Promise<void> {
  const flight = mark.animate(
    [
      { transform: from },
      { transform: "translate(0px, 0px) scale(1)" },
    ],
    { duration: TRAVEL_MS, easing: EASE_MOVE, fill: "forwards" },
  );
  crossfadePage(veil, reveal, VEIL_DELAY_MS);
  return flight.finished.then(() => {
    flight.cancel();
    snapOntoLockup(mark);
  });
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

async function runFlight(mark: HTMLElement, veil: HTMLElement, reveal: HTMLElement): Promise<void> {
  stopCssFallback(veil, reveal);
  const opening = readLockupRect();
  if (!opening) {
    crossfadePage(veil, reveal);
    reveal.style.opacity = "1";
    return;
  }
  document.documentElement.setAttribute(COVER_ATTR, "cover");
  await fadeMarkIn(mark, parkOnLockup(mark, opening));
  const landing = readLockupRect() ?? opening;
  await flyToHeader(mark, veil, reveal, parkOnLockup(mark, landing));
  reveal.style.opacity = "1";
  document.documentElement.removeAttribute(COVER_ATTR);
}

function useIntroFlight(
  markRef: RefObject<HTMLDivElement | null>,
  veilRef: RefObject<HTMLDivElement | null>,
  revealRef: RefObject<HTMLDivElement | null>,
  unlockRef: RefObject<(() => void) | null>,
): boolean {
  const [isFinished, setFinished] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const mark = markRef.current;
    const veil = veilRef.current;
    const reveal = revealRef.current;
    if (!mark || !veil || !reveal) return;

    unlockRef.current = lockPageScroll();
    let cancelled = false;
    void runFlight(mark, veil, reveal).then(
      () => {
        if (cancelled) return;
        void nextFrame().then(() => {
          if (cancelled) return;
          releaseScroll(unlockRef);
          setFinished(true);
        });
      },
      () => undefined,
    );

    return () => {
      cancelled = true;
      for (const node of [mark, veil, reveal]) {
        for (const animation of node.getAnimations()) animation.cancel();
      }
      reveal.style.opacity = "1";
      document.documentElement.removeAttribute(COVER_ATTR);
      releaseScroll(unlockRef);
    };
  }, [markRef, revealRef, unlockRef, veilRef]);

  return isFinished;
}

/**
 * Full-load brand beat. The mark fades in at center, then flies onto the
 * header lockup as the veil fades. Client navigations keep this mounted.
 */
export function PageIntro({ children }: PageIntroProps): ReactElement {
  const markRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const isFinished = useIntroFlight(markRef, veilRef, revealRef, unlockRef);

  return (
    <>
      {isFinished ? null : (
        <>
          <div ref={veilRef} className="page-intro" aria-hidden="true" />
          <div ref={markRef} className="page-intro-mark" aria-hidden="true">
            <Image
              src={brandAssets.logoGoldNoLabel.src}
              alt=""
              fill
              sizes="384px"
              preload
              className="object-cover object-center"
            />
          </div>
        </>
      )}
      <div ref={revealRef} className="page-intro-reveal">
        {children}
      </div>
    </>
  );
}

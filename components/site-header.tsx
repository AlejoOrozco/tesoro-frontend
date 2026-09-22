"use client";

import { useEffect, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";

import { HeaderChrome } from "@/components/header-chrome";

const HIDE_ARM_PX = 96;
const HIDE_DOWN_PX = 72;
const SHOW_UP_PX = 56;
const JITTER_PX = 2;

interface HideTravel {
  readonly accumulated: number;
  readonly hidden: boolean | undefined;
}

function nextHideTravel(y: number, delta: number, accumulated: number): HideTravel {
  if (y < HIDE_ARM_PX) return { accumulated: 0, hidden: false };
  if (Math.abs(delta) < JITTER_PX) return { accumulated, hidden: undefined };
  const reversed = accumulated !== 0 && Math.sign(delta) !== Math.sign(accumulated);
  const travel = reversed ? delta : accumulated + delta;
  if (travel > HIDE_DOWN_PX) return { accumulated: 0, hidden: true };
  if (travel < -SHOW_UP_PX) return { accumulated: 0, hidden: false };
  return { accumulated: travel, hidden: undefined };
}

function latchBoolean(setter: Dispatch<SetStateAction<boolean>>, next: boolean): void {
  setter((prev) => (prev === next ? prev : next));
}

function attachHeaderScroll(setHidden: Dispatch<SetStateAction<boolean>>): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = { lastY: window.scrollY, accumulated: 0, ticking: false };

  function syncFromScroll(): void {
    state.ticking = false;
    const y = window.scrollY;
    const delta = y - state.lastY;
    state.lastY = y;
    if (motion.matches) {
      latchBoolean(setHidden, false);
      return;
    }
    const next = nextHideTravel(y, delta, state.accumulated);
    state.accumulated = next.accumulated;
    if (next.hidden !== undefined) latchBoolean(setHidden, next.hidden);
  }

  function onScroll(): void {
    if (state.ticking) return;
    state.ticking = true;
    window.requestAnimationFrame(syncFromScroll);
  }

  function onMotionChange(): void {
    if (motion.matches) latchBoolean(setHidden, false);
  }

  if (window.scrollY < HIDE_ARM_PX || motion.matches) latchBoolean(setHidden, false);
  window.addEventListener("scroll", onScroll, { passive: true });
  motion.addEventListener("change", onMotionChange);
  return () => {
    window.removeEventListener("scroll", onScroll);
    motion.removeEventListener("change", onMotionChange);
  };
}

function useHeaderHideOnScroll(): boolean {
  const [isHidden, setHidden] = useState(false);

  useEffect(() => attachHeaderScroll(setHidden), []);

  return isHidden;
}

/**
 * Frozen navy glass on every route. Hide-on-scroll is the only scroll state.
 * Frost lives in CSS (`backdrop-blur-[14px]` + chrome mix) so the hue never swaps.
 */
export function SiteHeader(): ReactElement {
  const isHidden = useHeaderHideOnScroll();

  return (
    <header
      inert={isHidden}
      className={[
        "header-bar backdrop-blur-[14px] [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none",
        isHidden ? "header-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative z-10">
        <HeaderChrome isHidden={isHidden} />
      </div>
    </header>
  );
}

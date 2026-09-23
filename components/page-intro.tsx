"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { AnimationEvent, ReactElement, ReactNode, RefObject } from "react";

import { brandAssets } from "@/assets/brand";

/** Keep aligned with `--page-intro-duration` in page-intro.css. */
const INTRO_MS = 2100;
const VEIL_ANIMATION = "page-intro-veil";

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

function readAnimationName(animation: Animation): string | null {
  if (!("animationName" in animation)) return null;
  const name = animation.animationName;
  return typeof name === "string" ? name : null;
}

function isVeilAlreadyFinished(): boolean {
  const veil = document.querySelector(".page-intro");
  if (!(veil instanceof HTMLElement)) return false;
  return veil.getAnimations().some((animation) => {
    return readAnimationName(animation) === VEIL_ANIMATION && animation.playState === "finished";
  });
}

function releaseScroll(unlockRef: RefObject<(() => void) | null>): void {
  unlockRef.current?.();
  unlockRef.current = null;
}

function useIntroFinished(
  unlockRef: RefObject<(() => void) | null>,
): readonly [boolean, (event: AnimationEvent<HTMLDivElement>) => void] {
  const [isFinished, setFinished] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || isVeilAlreadyFinished()) return;
    unlockRef.current = lockPageScroll();
    const backup = window.setTimeout(() => {
      releaseScroll(unlockRef);
      setFinished(true);
    }, INTRO_MS + 80);
    return () => {
      window.clearTimeout(backup);
      releaseScroll(unlockRef);
    };
  }, [unlockRef]);

  function onVeilAnimationEnd(event: AnimationEvent<HTMLDivElement>): void {
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== VEIL_ANIMATION) return;
    releaseScroll(unlockRef);
    setFinished(true);
  }

  return [isFinished, onVeilAnimationEnd];
}

/**
 * Full-viewport brand beat on a full load. Client navigations keep this
 * mounted, so the sequence plays again only on refresh.
 */
export function PageIntro({ children }: PageIntroProps): ReactElement {
  const unlockRef = useRef<(() => void) | null>(null);
  const [isFinished, onVeilAnimationEnd] = useIntroFinished(unlockRef);

  return (
    <>
      {isFinished ? null : (
        <div className="page-intro" aria-hidden="true" onAnimationEnd={onVeilAnimationEnd}>
          <Image
            src={brandAssets.logoGoldNoLabel.src}
            alt=""
            width={176}
            height={176}
            preload
            className="page-intro-mark"
          />
        </div>
      )}
      <div className="page-intro-reveal">{children}</div>
    </>
  );
}

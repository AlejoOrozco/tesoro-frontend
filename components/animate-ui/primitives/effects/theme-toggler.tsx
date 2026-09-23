"use client";

import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import type { ReactElement, ReactNode } from "react";

export type ThemeSelection = "light" | "dark";
export type Resolved = "light" | "dark";
export type Direction = "btt" | "ttb" | "ltr" | "rtl";

const THEME_WIPE_MS = 700;

type ThemeState = {
  readonly effective: ThemeSelection;
  readonly resolved: Resolved;
};

type ThemeTogglerProps = {
  readonly theme: ThemeSelection;
  readonly resolvedTheme: Resolved;
  readonly setTheme: (theme: ThemeSelection) => void;
  readonly direction?: Direction;
  readonly children?: (state: ThemeState & { readonly toggleTheme: (theme: ThemeSelection) => void }) => ReactNode;
};

function getClipKeyframes(direction: Direction): readonly [string, string] {
  if (direction === "rtl") return ["inset(0 0 0 100%)", "inset(0 0 0 0)"];
  if (direction === "ttb") return ["inset(0 0 100% 0)", "inset(0 0 0 0)"];
  if (direction === "btt") return ["inset(100% 0 0 0)", "inset(0 0 0 0)"];
  return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
}

function applyResolvedTheme(resolved: Resolved): void {
  document.documentElement.dataset.theme = resolved;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canViewTransition(): boolean {
  return typeof document.startViewTransition === "function";
}

function ThemeToggler({
  theme,
  resolvedTheme,
  setTheme,
  direction = "ltr",
  children,
}: ThemeTogglerProps): ReactElement {
  const [current, setCurrent] = useState<ThemeState>({ effective: theme, resolved: resolvedTheme });

  useEffect(() => {
    setCurrent({ effective: theme, resolved: resolvedTheme });
  }, [theme, resolvedTheme]);

  const toggleTheme = useCallback(
    (next: ThemeSelection): void => {
      const paint = (): void => {
        setCurrent({ effective: next, resolved: next });
        applyResolvedTheme(next);
      };
      if (!canViewTransition() || prefersReducedMotion()) {
        flushSync(paint);
        setTheme(next);
        return;
      }
      const transition = document.startViewTransition(() => {
        flushSync(paint);
      });
      const [fromClip, toClip] = getClipKeyframes(direction);
      void transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            { clipPath: [fromClip, toClip] },
            {
              duration: THEME_WIPE_MS,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
          return animation.finished;
        })
        .finally(() => {
          setTheme(next);
        });
    },
    [direction, setTheme],
  );

  return (
    <>
      {children?.({ ...current, toggleTheme })}
    </>
  );
}

export { ThemeToggler };

"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";

export type ThemeSelection = "light" | "dark";
export type Resolved = "light" | "dark";

type ThemeState = {
  readonly effective: ThemeSelection;
  readonly resolved: Resolved;
};

type ThemeTogglerProps = {
  readonly theme: ThemeSelection;
  readonly resolvedTheme: Resolved;
  readonly setTheme: (theme: ThemeSelection) => void;
  readonly children?: (state: ThemeState & { readonly toggleTheme: (theme: ThemeSelection) => void }) => ReactNode;
};

function applyResolvedTheme(resolved: Resolved): void {
  document.documentElement.dataset.theme = resolved;
}

function ThemeToggler({ theme, resolvedTheme, setTheme, children }: ThemeTogglerProps): ReactElement {
  const [current, setCurrent] = useState<ThemeState>({ effective: theme, resolved: resolvedTheme });

  useEffect(() => {
    setCurrent({ effective: theme, resolved: resolvedTheme });
  }, [theme, resolvedTheme]);

  const toggleTheme = useCallback(
    (next: ThemeSelection): void => {
      setCurrent({ effective: next, resolved: next });
      applyResolvedTheme(next);
      setTheme(next);
    },
    [setTheme],
  );

  return <>{children?.({ ...current, toggleTheme })}</>;
}

export { ThemeToggler };

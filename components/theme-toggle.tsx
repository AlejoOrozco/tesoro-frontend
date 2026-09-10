"use client";

import { useSyncExternalStore } from "react";
import type { ReactElement } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";
import { getEffectiveTheme, setTheme, subscribeToTheme, type Theme } from "@/lib/theme";

/**
 * Header theme switch. The effective theme lives outside React (DOM attribute,
 * localStorage, OS preference), so it's read via useSyncExternalStore. The
 * server snapshot assumes light (the default theme); React reconciles to the
 * real value on the client.
 */
const getServerTheme = (): Theme => "light";

export function ThemeToggle(): ReactElement {
  const theme = useSyncExternalStore(subscribeToTheme, getEffectiveTheme, getServerTheme);
  const isDark = theme === "dark";

  function handleToggle(): void {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="inline-flex size-11 items-center justify-center rounded-md text-chrome-foreground transition-colors duration-micro hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}

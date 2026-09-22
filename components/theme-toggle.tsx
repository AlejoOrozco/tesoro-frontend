"use client";

import { useSyncExternalStore } from "react";
import type { ReactElement } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";
import { getEffectiveTheme, setTheme, subscribeToTheme, type Theme } from "@/lib/theme";

const getServerTheme = (): Theme => "light";

/** Header switch. Shows the sun while dark is on, the moon while light is on. */
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
      className="header-icon inline-flex size-11 shrink-0 items-center justify-center rounded-md transition-colors duration-micro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
    </button>
  );
}

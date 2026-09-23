"use client";

import type { ReactElement } from "react";

import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import type { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";

const THEME_MODES = ["light", "dark"] as const satisfies readonly ThemeSelection[];

/** Header control. Wipes from the bottom upward between light and dark. */
export function ThemeToggle(): ReactElement {
  return (
    <ThemeTogglerButton
      direction="btt"
      modes={THEME_MODES}
      className="header-icon text-chrome-foreground"
    />
  );
}

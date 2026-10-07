"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ComponentProps, ReactElement } from "react";

import {
  ThemeToggler,
  type Resolved,
  type ThemeSelection,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const BUTTON_CLASSES =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-md outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0";

const NEXT_THEME_LABEL: Record<ThemeSelection, string> = {
  light: "Cambiar a tema claro",
  dark: "Cambiar a tema oscuro",
};

function isThemeSelection(value: string | undefined): value is ThemeSelection {
  return value === "light" || value === "dark";
}

function getNextTheme(effective: ThemeSelection, modes: readonly ThemeSelection[]): ThemeSelection {
  const index = modes.indexOf(effective);
  if (index === -1) return modes[0] ?? "light";
  return modes[(index + 1) % modes.length] ?? "light";
}

function ThemeIcon({ name }: { readonly name: Resolved }): ReactElement {
  if (name === "dark") return <MoonIcon className="size-6" />;
  return <SunIcon className="size-6" />;
}

type ThemeTogglerButtonProps = ComponentProps<"button"> & {
  readonly modes?: readonly ThemeSelection[];
};

function ThemeTogglerButton({
  modes = ["light", "dark"],
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps): ReactElement {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const effective: ThemeSelection = isReady && isThemeSelection(theme) ? theme : "dark";
  const resolved: Resolved = isReady && resolvedTheme === "light" ? "light" : "dark";

  return (
    <ThemeToggler theme={effective} resolvedTheme={resolved} setTheme={setTheme}>
      {({ effective: current, toggleTheme }) => {
        const next = getNextTheme(current, modes);
        return (
          <button
            type="button"
            {...props}
            className={cn(BUTTON_CLASSES, className)}
            aria-label={NEXT_THEME_LABEL[next]}
            onClick={(event) => {
              onClick?.(event);
              if (event.defaultPrevented) return;
              toggleTheme(next);
            }}
          >
            <ThemeIcon name={resolved} />
          </button>
        );
      }}
    </ThemeToggler>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/** next-themes on `data-theme`, so the existing palette tokens keep working. */
export function ThemeProvider({ children }: { readonly children: ReactNode }): ReactElement {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  );
}

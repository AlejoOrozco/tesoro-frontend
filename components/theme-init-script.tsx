import Script from "next/script";
import type { ReactElement } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Applies a stored light or dark theme before first paint. Anything else,
 * including a previous "system" value, becomes light.
 */
const themeInitCode = `(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var theme = stored === "light" || stored === "dark" ? stored : "light";
    if (stored === "system") localStorage.setItem(key, theme);
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();`;

export function ThemeInitScript(): ReactElement {
  return (
    <Script id="tesoro-theme-init" strategy="beforeInteractive">
      {themeInitCode}
    </Script>
  );
}

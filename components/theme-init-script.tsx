import type { ReactElement } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Applies a stored theme before first paint. With nothing stored, the CSS
 * `prefers-color-scheme` fallback stays in charge.
 */
const themeInitCode = `(function () {
  try {
    var theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (error) {
    /* storage unavailable: OS preference applies */
  }
})();`;

export function ThemeInitScript(): ReactElement {
  return <script dangerouslySetInnerHTML={{ __html: themeInitCode }} />;
}

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Inline, render-blocking script that applies the persisted theme before the
 * first paint — without it, a stored choice that differs from the OS
 * preference would flash the wrong theme on every load. Must be the first
 * child of <body>. When nothing (or junk) is stored it does nothing and the
 * CSS `prefers-color-scheme` fallback stays in charge.
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

export function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitCode }} />;
}

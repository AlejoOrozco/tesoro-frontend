export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "tesoro-theme";

/**
 * Client-only. Applies and persists a manual theme choice; the header toggle
 * (Stage 3.1) is its consumer. While no choice is stored, CSS falls back to
 * the OS preference (see app/styles/tokens.css).
 */
export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (e.g. blocked/private mode) is an expected runtime
    // condition, not an error: the theme still applies for this page view and
    // simply won't survive a reload.
  }
}

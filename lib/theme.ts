export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "tesoro-theme";

type ThemeListener = () => void;

const themeListeners = new Set<ThemeListener>();

/**
 * Client-only. Notifies on any effective-theme change: manual `setTheme`
 * calls and OS preference flips. Shaped for React's `useSyncExternalStore`.
 */
export function subscribeToTheme(listener: ThemeListener): () => void {
  themeListeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => {
    themeListeners.delete(listener);
    media.removeEventListener("change", listener);
  };
}

/**
 * Client-only. Applies and persists a manual theme choice; the header toggle
 * (Stage 3.1) is its consumer. While no choice is stored, CSS falls back to
 * the OS preference (see app/styles/tokens.css).
 */
/** Client-only. The theme currently in effect: explicit choice first, else the OS preference. */
export function getEffectiveTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (e.g. blocked/private mode) is an expected runtime
    // condition, not an error: the theme still applies for this page view and
    // simply won't survive a reload.
  }
  for (const listener of themeListeners) listener();
}

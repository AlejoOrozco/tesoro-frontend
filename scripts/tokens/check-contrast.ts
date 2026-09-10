import type { TokenScales } from "./build-scales";
import { CONTRAST_TEXT, CONTRAST_UI } from "./scale-config";
import { contrastOf, type ResolvedThemes, type RoleMap, type RoleName, type ThemeName } from "./resolve-roles";

export interface ContrastResult {
  readonly theme: ThemeName;
  readonly fg: RoleName;
  readonly bg: RoleName;
  readonly fgRef: string;
  readonly bgRef: string;
  readonly ratio: number;
  readonly min: number;
  readonly pass: boolean;
  /** Non-gating rows are informative only (see note). */
  readonly gate: boolean;
  readonly note?: string;
}

interface PairSpec {
  readonly fg: RoleName;
  readonly bg: RoleName;
  readonly min: number;
  readonly gate?: boolean;
  readonly note?: string;
}

/**
 * Required pairings (accessibility.md thresholds: 4.5:1 text, 3:1 UI).
 *
 * DOCUMENTED EXEMPTION — light `text-primary` on `chrome`: light-mode body
 * text is dark-on-light while chrome is the brand navy in both themes, so
 * this pairing is structurally unsatisfiable. Text on chrome must always use
 * `chrome-text` (that is the token's reason to exist); the `chrome-text` on
 * `chrome` gate below covers it. The ratio is still computed and reported.
 */
function pairsFor(theme: ThemeName): readonly PairSpec[] {
  const textPrimaryOnChrome: PairSpec =
    theme === "light"
      ? {
          fg: "text-primary",
          bg: "chrome",
          min: CONTRAST_TEXT,
          gate: false,
          note: "Sobre chrome se usa chrome-text, no text-primary",
        }
      : { fg: "text-primary", bg: "chrome", min: CONTRAST_TEXT };

  return [
    { fg: "text-primary", bg: "background", min: CONTRAST_TEXT },
    { fg: "text-primary", bg: "surface", min: CONTRAST_TEXT },
    { fg: "text-primary", bg: "secondary-surface", min: CONTRAST_TEXT },
    textPrimaryOnChrome,
    { fg: "text-muted", bg: "background", min: CONTRAST_TEXT },
    { fg: "text-muted", bg: "surface", min: CONTRAST_TEXT },
    { fg: "action-primary-text", bg: "action-primary", min: CONTRAST_TEXT },
    { fg: "action-primary-text", bg: "action-primary-hover", min: CONTRAST_TEXT },
    { fg: "action-primary-text", bg: "action-primary-active", min: CONTRAST_TEXT },
    { fg: "chrome-text", bg: "chrome", min: CONTRAST_TEXT },
    { fg: "border", bg: "background", min: CONTRAST_UI },
    { fg: "action-primary", bg: "background", min: CONTRAST_UI },
    { fg: "action-primary", bg: "surface", min: CONTRAST_UI },
  ];
}

function checkTheme(scales: TokenScales["scales"], theme: ThemeName, roles: RoleMap): ContrastResult[] {
  return pairsFor(theme).map((pair) => {
    const fgRef = roles[pair.fg];
    const bgRef = roles[pair.bg];
    const ratio = Math.round(contrastOf(scales, fgRef, bgRef) * 100) / 100;
    return {
      theme,
      fg: pair.fg,
      bg: pair.bg,
      fgRef: `${fgRef.scale}-${fgRef.step}`,
      bgRef: `${bgRef.scale}-${bgRef.step}`,
      ratio,
      min: pair.min,
      pass: ratio >= pair.min,
      gate: pair.gate ?? true,
      ...(pair.note !== undefined && { note: pair.note }),
    };
  });
}

export function runContrastChecks(scales: TokenScales["scales"], resolved: ResolvedThemes): ContrastResult[] {
  return [
    ...checkTheme(scales, "light", resolved.themes.light),
    ...checkTheme(scales, "dark", resolved.themes.dark),
  ];
}

export function gateFailures(results: readonly ContrastResult[]): ContrastResult[] {
  return results.filter((result) => result.gate && !result.pass);
}

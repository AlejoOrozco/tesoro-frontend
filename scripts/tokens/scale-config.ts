/**
 * Single source of truth for the token generator inputs.
 * Recipe: docs/design/color-palette.md — everything below is that document's
 * tables and seeds, not new design decisions.
 */

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type Step = (typeof STEPS)[number];

/** §2 — Lightness per step (L, 0–1). */
export const LIGHTNESS = [0.97, 0.93, 0.86, 0.76, 0.64, 0.53, 0.45, 0.37, 0.29, 0.21, 0.14] as const;

/** §2 — Chroma factor per step (× seed chroma). */
export const CHROMA_FACTOR = [0.15, 0.25, 0.45, 0.7, 0.9, 1.0, 0.95, 0.85, 0.7, 0.55, 0.4] as const;

/**
 * Brand seeds, in priority order (extracted from the brand lockups).
 * Navy is the ink of logo-navy.jpg / the field of logo-gold.jpg.
 * Gold is the field of logo-navy.jpg.
 */
export const SEEDS = {
  navy: "#0B1838",
  gold: "#F0CC70",
} as const;

/** §3 — neutral scale chroma: same hue as priority-1 seed, near-achromatic. */
export const NEUTRAL_CHROMA = 0.015;

/** §4 — conventional hues for semantic scales (chroma matched to the accent). */
export const SEMANTIC_HUES = {
  success: 145,
  warning: 85,
  error: 27,
  info: 240,
} as const;

export type SemanticName = keyof typeof SEMANTIC_HUES;

export type ScaleName = "neutral" | "navy" | "gold" | SemanticName;

/** docs/README.md — shared token scales (px / ms). */
export const SPACING_PX = [4, 8, 12, 16, 24, 32, 48, 64] as const;

export const RADIUS = { sm: 4, md: 8, lg: 16, full: 9999 } as const;

export const MOTION_MS = { micro: 150, standard: 250, confirm: 300 } as const;

/** accessibility.md thresholds. */
export const CONTRAST_TEXT = 4.5;
export const CONTRAST_UI = 3;

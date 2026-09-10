import { clampChroma, converter, formatCss, formatHex } from "culori";
import type { Oklch } from "culori";

import {
  CHROMA_FACTOR,
  LIGHTNESS,
  NEUTRAL_CHROMA,
  SEEDS,
  SEMANTIC_HUES,
  STEPS,
  type ScaleName,
  type SemanticName,
  type Step,
} from "./scale-config";

const toOklch = converter("oklch");

export interface ScaleStep {
  readonly l: number;
  readonly c: number;
  readonly h: number;
  /** Canonical CSS value (runtime). */
  readonly css: string;
  /** In-gamut hex fallback (review/reporting only). */
  readonly hex: string;
}

export type Scale = Readonly<Record<Step, ScaleStep>>;

export interface SeedInfo {
  readonly hex: string;
  readonly oklch: string;
  readonly anchorStep: Step;
}

export interface TokenScales {
  readonly scales: Readonly<Record<ScaleName, Scale>>;
  readonly seeds: Readonly<Record<"navy" | "gold", SeedInfo>>;
}

const round = (value: number, digits: number): number => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

function makeStep(l: number, c: number, h: number): ScaleStep {
  // Clamp chroma so the emitted value (and its hex fallback) stays inside the
  // sRGB gamut instead of silently shifting hue on conversion (§2, Gamut).
  const clamped = clampChroma({ mode: "oklch", l, c, h }, "oklch");
  const color: Oklch = {
    mode: "oklch",
    l: round(clamped.l, 4),
    c: round(clamped.c, 4),
    h: round(clamped.h ?? h, 2),
  };
  return {
    l: color.l,
    c: color.c,
    h: color.h ?? h,
    css: formatCss(color),
    hex: formatHex(color),
  };
}

function parseSeed(hex: string): Oklch {
  const seed = toOklch(hex);
  if (!seed) throw new Error(`Seed "${hex}" is not a parseable color`);
  return seed;
}

function nearestStepIndex(l: number): number {
  let best = 0;
  for (let i = 1; i < LIGHTNESS.length; i += 1) {
    if (Math.abs(LIGHTNESS[i] - l) < Math.abs(LIGHTNESS[best] - l)) best = i;
  }
  return best;
}

function buildSteps(makeOne: (index: number) => ScaleStep): Scale {
  const entries = STEPS.map((step, i) => [step, makeOne(i)] as const);
  return Object.fromEntries(entries) as Record<Step, ScaleStep>;
}

/**
 * Full-chroma brand scale (§2). The seed is NOT forced to step 500: the step
 * whose table lightness is closest to the seed's own L becomes the anchor and
 * *is* the seed color. The remaining steps are generated outward from it —
 * the chroma taper is normalized by the anchor's factor so the curve passes
 * through the seed smoothly instead of leaving a chroma discontinuity.
 */
export function buildBrandScale(seedHex: string): { scale: Scale; seed: SeedInfo } {
  const seed = parseSeed(seedHex);
  const hue = seed.h ?? 0;
  const anchorIndex = nearestStepIndex(seed.l);
  const effectiveChroma = seed.c / CHROMA_FACTOR[anchorIndex];

  const scale = buildSteps((i) => {
    if (i === anchorIndex) return makeStep(seed.l, seed.c, hue);
    return makeStep(LIGHTNESS[i], effectiveChroma * CHROMA_FACTOR[i], hue);
  });

  return {
    scale,
    seed: {
      hex: seedHex,
      oklch: formatCss({ mode: "oklch", l: round(seed.l, 4), c: round(seed.c, 4), h: round(hue, 2) }),
      anchorStep: STEPS[anchorIndex],
    },
  };
}

/** Near-achromatic scale at the priority-1 hue (§3, dominant → neutrals). */
export function buildNeutralScale(hue: number): Scale {
  return buildSteps((i) => makeStep(LIGHTNESS[i], NEUTRAL_CHROMA * CHROMA_FACTOR[i], hue));
}

/** Semantic scale at a conventional hue, chroma matched to the accent (§4). */
export function buildSemanticScale(hue: number, accentChroma: number): Scale {
  return buildSteps((i) => makeStep(LIGHTNESS[i], accentChroma * CHROMA_FACTOR[i], hue));
}

export function buildAllScales(): TokenScales {
  const navy = buildBrandScale(SEEDS.navy);
  const gold = buildBrandScale(SEEDS.gold);
  const navyHue = parseSeed(SEEDS.navy).h ?? 0;
  // "Accent's own chroma level" = the gold scale's mid-step chroma after
  // gamut clamping, so semantics sit at the same perceived saturation.
  const accentChroma = gold.scale[500].c;

  const semantics = Object.fromEntries(
    (Object.keys(SEMANTIC_HUES) as SemanticName[]).map((name) => [
      name,
      buildSemanticScale(SEMANTIC_HUES[name], accentChroma),
    ]),
  ) as Record<SemanticName, Scale>;

  return {
    scales: {
      neutral: buildNeutralScale(navyHue),
      navy: navy.scale,
      gold: gold.scale,
      ...semantics,
    },
    seeds: { navy: navy.seed, gold: gold.seed },
  };
}

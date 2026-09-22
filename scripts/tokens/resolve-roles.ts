import { wcagContrast } from "culori";

import type { TokenScales } from "./build-scales";
import { CONTRAST_TEXT, CONTRAST_UI, type Step } from "./scale-config";

export type RoleScale = "neutral" | "navy" | "gold";

export interface Ref {
  readonly scale: RoleScale;
  readonly step: Step;
}

export const ROLE_NAMES = [
  "background",
  "surface",
  "border",
  "text-muted",
  "text-primary",
  "secondary-surface",
  "secondary-border",
  "action-primary",
  "action-primary-hover",
  "action-primary-active",
  "action-primary-text",
  "chrome",
  "chrome-text",
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

export type RoleMap = Record<RoleName, Ref>;

export type ThemeName = "light" | "dark";

export interface ResolvedThemes {
  readonly themes: Record<ThemeName, RoleMap>;
  readonly deviations: readonly string[];
}

type Scales = TokenScales["scales"];

function hexOf(scales: Scales, ref: Ref): string {
  return scales[ref.scale][ref.step].hex;
}

export function contrastOf(scales: Scales, fg: Ref, bg: Ref): number {
  return wcagContrast(hexOf(scales, fg), hexOf(scales, bg));
}

const refName = (ref: Ref): string => `${ref.scale}-${ref.step}`;

interface WalkArgs {
  readonly documented: Step;
  readonly candidates: readonly Step[];
  readonly scale: RoleScale;
  readonly passes: (ref: Ref) => boolean;
  readonly label: string;
  readonly deviations: string[];
}

/**
 * Walk candidate steps (documented mapping first) and return the first that
 * passes its contrast predicate. Deviations from the documented step are
 * recorded, never eyeballed (color-palette.md §5).
 */
function pickStep(args: WalkArgs): Ref {
  for (const step of args.candidates) {
    const ref: Ref = { scale: args.scale, step };
    if (!args.passes(ref)) continue;
    if (step !== args.documented) {
      args.deviations.push(
        `${args.label}: documented ${args.scale}-${args.documented} fails contrast; using ${refName(ref)}`,
      );
    }
    return ref;
  }
  throw new Error(`${args.label}: no candidate step passes contrast (tried ${args.candidates.join(", ")})`);
}

interface TrioArgs {
  readonly theme: ThemeName;
  readonly scales: Scales;
  readonly documented: readonly [Step, Step, Step];
  readonly trios: ReadonlyArray<readonly [Step, Step, Step]>;
  /** §3: action-primary-text is whichever of these passes — doc order first. */
  readonly textCandidates: readonly Ref[];
  /** Tried only if no documented candidate passes; selecting one is a deviation. */
  readonly textFallbacks: readonly Ref[];
  readonly background: Ref;
  readonly surface: Ref;
  readonly deviations: string[];
}

interface TrioResult {
  readonly primary: Ref;
  readonly hover: Ref;
  readonly active: Ref;
  readonly text: Ref;
}

function pickTextFor(scales: Scales, fills: readonly Ref[], candidates: readonly Ref[]): Ref | null {
  let best: { ref: Ref; min: number } | null = null;
  for (const candidate of candidates) {
    const min = Math.min(...fills.map((fill) => contrastOf(scales, candidate, fill)));
    if (min < CONTRAST_TEXT) continue;
    if (!best || min > best.min) best = { ref: candidate, min };
  }
  return best?.ref ?? null;
}

/**
 * Resolve the action-primary trio + its text token. A trio is accepted when
 * some neutral text passes 4.5:1 on all three fills. Saturated fills also
 * need 3:1 against background and surface; tint fills (documented ≤ 200)
 * skip that page-contrast check so they can match secondary hover.
 */
function pickActionTrio(args: TrioArgs): TrioResult {
  for (const [primary, hover, active] of args.trios) {
    const fills: Ref[] = [
      { scale: "gold", step: primary },
      { scale: "gold", step: hover },
      { scale: "gold", step: active },
    ];
    const skipFillVsPage = args.documented[0] <= 200;
    const fillOk =
      skipFillVsPage ||
      (contrastOf(args.scales, fills[0], args.background) >= CONTRAST_UI &&
        contrastOf(args.scales, fills[0], args.surface) >= CONTRAST_UI);
    if (!fillOk) continue;
    let text = pickTextFor(args.scales, fills, args.textCandidates);
    if (!text) {
      text = pickTextFor(args.scales, fills, args.textFallbacks);
      if (text) {
        args.deviations.push(
          `${args.theme} action-primary-text: neither documented neutral passes; using ${refName(text)}`,
        );
      }
    }
    if (!text) continue;
    if (primary !== args.documented[0]) {
      args.deviations.push(
        `${args.theme} action-primary: documented gold-${args.documented[0]} trio fails contrast; using gold-${primary}/${hover}/${active}`,
      );
    }
    return { primary: fills[0], hover: fills[1], active: fills[2], text };
  }
  throw new Error(`${args.theme} action-primary: no candidate trio passes contrast`);
}

interface ThemeSpec {
  readonly theme: ThemeName;
  readonly fixed: Pick<RoleMap, "background" | "surface" | "text-primary" | "secondary-border">;
  readonly textMuted: { documented: Step; candidates: readonly Step[] };
  readonly border: { documented: Step; candidates: readonly Step[] };
  readonly secondarySurface: { documented: Step; candidates: readonly Step[] };
  readonly action: Pick<TrioArgs, "documented" | "trios" | "textCandidates" | "textFallbacks">;
}

function resolveTheme(scales: Scales, chrome: Ref, spec: ThemeSpec, deviations: string[]): RoleMap {
  const { background, surface } = spec.fixed;
  const textPrimary = spec.fixed["text-primary"];

  const textMuted = pickStep({
    ...spec.textMuted,
    scale: "neutral",
    label: `${spec.theme} text-muted`,
    deviations,
    passes: (ref) =>
      contrastOf(scales, ref, background) >= CONTRAST_TEXT && contrastOf(scales, ref, surface) >= CONTRAST_TEXT,
  });

  const border = pickStep({
    ...spec.border,
    scale: "neutral",
    label: `${spec.theme} border`,
    deviations,
    passes: (ref) => contrastOf(scales, ref, background) >= CONTRAST_UI,
  });

  const secondarySurface = pickStep({
    ...spec.secondarySurface,
    scale: "gold",
    label: `${spec.theme} secondary-surface`,
    deviations,
    passes: (ref) => contrastOf(scales, textPrimary, ref) >= CONTRAST_TEXT,
  });

  const chromeText = pickStep({
    documented: 50,
    candidates: [50, 100],
    scale: "neutral",
    label: `${spec.theme} chrome-text`,
    deviations,
    passes: (ref) => contrastOf(scales, ref, chrome) >= CONTRAST_TEXT,
  });

  const action = pickActionTrio({ theme: spec.theme, scales, background, surface, deviations, ...spec.action });

  return {
    ...spec.fixed,
    border,
    "text-muted": textMuted,
    "secondary-surface": secondarySurface,
    "action-primary": action.primary,
    "action-primary-hover": action.hover,
    "action-primary-active": action.active,
    "action-primary-text": action.text,
    chrome,
    "chrome-text": chromeText,
  };
}

/**
 * Role mapping per color-palette.md §3 (light) and §6 (dark), with light
 * canvas/surface swapped so white cards lift off a very light gray page.
 * `chrome` is the brand navy itself (the scale's anchor step) in both themes —
 * the approved mocks use a navy header/footer that neutrals cannot paint.
 */
export function resolveThemes(all: TokenScales): ResolvedThemes {
  const { scales, seeds } = all;
  const deviations: string[] = [];
  const chrome: Ref = { scale: "navy", step: seeds.navy.anchorStep };

  const light = resolveTheme(
    scales,
    chrome,
    {
      theme: "light",
      fixed: {
        background: { scale: "neutral", step: 100 },
        surface: { scale: "neutral", step: 50 },
        "text-primary": { scale: "neutral", step: 900 },
        "secondary-border": { scale: "gold", step: 300 },
      },
      textMuted: { documented: 500, candidates: [500, 600, 700] },
      border: { documented: 200, candidates: [200, 300, 400, 500, 600] },
      secondarySurface: { documented: 100, candidates: [100, 50] },
      action: {
        documented: [100, 200, 300],
        trios: [
          [100, 200, 300],
          [200, 300, 400],
        ],
        textCandidates: [
          { scale: "neutral", step: 900 },
          { scale: "neutral", step: 50 },
        ],
        textFallbacks: [{ scale: "neutral", step: 950 }],
      },
    },
    deviations,
  );

  const dark = resolveTheme(
    scales,
    chrome,
    {
      theme: "dark",
      fixed: {
        background: { scale: "neutral", step: 900 },
        surface: { scale: "neutral", step: 800 },
        "text-primary": { scale: "neutral", step: 50 },
        "secondary-border": { scale: "gold", step: 700 },
      },
      textMuted: { documented: 400, candidates: [400, 300, 200] },
      border: { documented: 700, candidates: [700, 600, 500, 400, 300] },
      secondarySurface: { documented: 800, candidates: [800, 900, 950] },
      action: {
        documented: [100, 200, 300],
        trios: [
          [100, 200, 300],
          [200, 300, 400],
        ],
        textCandidates: [
          { scale: "neutral", step: 900 },
          { scale: "neutral", step: 50 },
        ],
        textFallbacks: [{ scale: "neutral", step: 950 }],
      },
    },
    deviations,
  );

  return { themes: { light, dark }, deviations };
}

import type { Scale, TokenScales } from "./build-scales";
import { MOTION_MS, RADIUS, SPACING_PX, STEPS, type ScaleName } from "./scale-config";
import { ROLE_NAMES, type Ref, type ResolvedThemes, type RoleMap } from "./resolve-roles";

const SCALE_ORDER = ["neutral", "navy", "gold", "success", "warning", "error", "info"] as const satisfies readonly ScaleName[];

const HEADER = `/*
 * GENERATED FILE — DO NOT EDIT BY HAND.
 * Regenerate with \`pnpm tokens\` (scripts/generate-tokens.ts).
 * Recipe: docs/design/color-palette.md + docs/README.md shared tokens.
 *
 * Components use ROLE utilities, never raw steps or ad hoc values:
 *   bg-background · bg-surface · bg-secondary · bg-primary · bg-chrome
 *   text-foreground · text-muted · text-primary-foreground · text-chrome-foreground
 *   border-border · border-secondary-border
 *   hover:bg-primary-hover · active:bg-primary-active
 *   rounded-sm (4px) · rounded-md (8px) · rounded-lg (16px) · rounded-full (pill)
 *   duration-micro (150ms) · duration-standard (250ms) · duration-confirm (300ms)
 * Scale steps (bg-neutral-500, text-error-700, …) exist for the token review
 * page and rare chrome-adjacent cases only.
 *
 * Spacing keeps Tailwind's default --spacing (0.25rem). Allowed steps only:
 *   p-1=4px p-2=8px p-3=12px p-4=16px p-6=24px p-8=32px p-12=48px p-16=64px
 * Non-utility CSS uses var(--space-4) … var(--space-64).
 *
 * Theming: :root = light, [data-theme="dark"] = dark; when data-theme is
 * unset the OS preference applies. Nested [data-theme] panels re-theme their
 * subtree (used by /dev/tokens).
 */`;

const varName = (scale: ScaleName, step: number): string => `--${scale}-${step}`;

const refVar = (ref: Ref): string => `var(${varName(ref.scale, ref.step)})`;

function scaleLines(name: ScaleName, scale: Scale): string[] {
  return STEPS.map((step) => `  ${varName(name, step)}: ${scale[step].css};`);
}

function roleLines(roles: RoleMap): string[] {
  return ROLE_NAMES.map((role) => `  --${role}: ${refVar(roles[role])};`);
}

function rootBlock(scales: TokenScales["scales"]): string {
  const lines: string[] = [":root {"];
  for (const name of SCALE_ORDER) {
    lines.push(`  /* ${name} scale */`, ...scaleLines(name, scales[name]));
  }
  lines.push("  /* spacing (px) — docs/README.md shared tokens */");
  lines.push(...SPACING_PX.map((px) => `  --space-${px}: ${px}px;`));
  lines.push("  /* motion */");
  lines.push(...Object.entries(MOTION_MS).map(([name, ms]) => `  --motion-${name}: ${ms}ms;`));
  lines.push("}");
  return lines.join("\n");
}

function themeBlocks(resolved: ResolvedThemes): string {
  const light = roleLines(resolved.themes.light).join("\n");
  const dark = roleLines(resolved.themes.dark).join("\n");
  return [
    `/* Role tokens — light (default) */`,
    `:root,\n[data-theme="light"] {\n${light}\n}`,
    ``,
    `/* Role tokens — dark */`,
    `[data-theme="dark"] {\n${dark}\n}`,
    ``,
    `/* OS preference applies only while data-theme is unset (toggle lands in 1.4) */`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme]) {\n${dark
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n")}\n  }\n}`,
  ].join("\n");
}

function staticTheme(): string {
  const radius = Object.entries(RADIUS)
    .map(([name, px]) => `  --radius-${name}: ${px}px;`)
    .join("\n");
  return [
    "/* Tailwind theme — wipe the default palette and radius so only tokens exist */",
    "@theme {",
    "  --color-*: initial;",
    "  --radius-*: initial;",
    radius,
    "}",
  ].join("\n");
}

const ROLE_COLOR_MAP: ReadonlyArray<readonly [string, string]> = [
  ["--color-background", "--background"],
  ["--color-surface", "--surface"],
  ["--color-border", "--border"],
  ["--color-muted", "--text-muted"],
  ["--color-foreground", "--text-primary"],
  ["--color-secondary", "--secondary-surface"],
  ["--color-secondary-border", "--secondary-border"],
  ["--color-primary", "--action-primary"],
  ["--color-primary-hover", "--action-primary-hover"],
  ["--color-primary-active", "--action-primary-active"],
  ["--color-primary-foreground", "--action-primary-text"],
  ["--color-chrome", "--chrome"],
  ["--color-chrome-foreground", "--chrome-text"],
];

function inlineTheme(): string {
  const lines: string[] = [
    "/* Utilities reference the role/scale variables — one source of truth */",
    "@theme inline {",
    "  --font-sans: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;",
    ...Object.keys(MOTION_MS).map((name) => `  --transition-duration-${name}: var(--motion-${name});`),
    ...ROLE_COLOR_MAP.map(([token, role]) => `  ${token}: var(${role});`),
  ];
  for (const name of SCALE_ORDER) {
    lines.push(...STEPS.map((step) => `  --color-${name}-${step}: var(${varName(name, step)});`));
  }
  lines.push("}");
  return lines.join("\n");
}

export function buildTokensCss(scales: TokenScales["scales"], resolved: ResolvedThemes): string {
  return [HEADER, "", rootBlock(scales), "", themeBlocks(resolved), "", staticTheme(), "", inlineTheme(), ""].join(
    "\n",
  );
}

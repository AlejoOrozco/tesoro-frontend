/**
 * Design-token generator + WCAG contrast gate (Stage 1.2).
 *
 * Reads the seed colors and recipe tables (docs/design/color-palette.md),
 * builds the OKLCH scales, resolves role mappings for light/dark, verifies
 * every required contrast pairing, and only then writes
 * app/styles/tokens.css (runtime CSS + @theme).
 *
 * Run: pnpm tokens
 * Exits 1 without writing anything when a gated pairing fails.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { buildAllScales } from "./tokens/build-scales";
import { gateFailures, runContrastChecks } from "./tokens/check-contrast";
import { buildTokensCss } from "./tokens/emit";
import { resolveThemes } from "./tokens/resolve-roles";

const CSS_PATH = path.join(process.cwd(), "app", "styles", "tokens.css");

function main(): void {
  const all = buildAllScales();
  const resolved = resolveThemes(all);
  const results = runContrastChecks(all.scales, resolved);

  const failures = gateFailures(results);
  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(
        `CONTRAST FAIL [${failure.theme}] ${failure.fg} (${failure.fgRef}) on ${failure.bg} (${failure.bgRef}): ` +
          `${failure.ratio}:1 < ${failure.min}:1`,
      );
    }
    process.exit(1);
  }

  mkdirSync(path.dirname(CSS_PATH), { recursive: true });
  writeFileSync(CSS_PATH, buildTokensCss(all.scales, resolved));

  const gated = results.filter((result) => result.gate).length;
  console.log(`tokens: ${gated} contrast gates passed (light + dark)`);
  console.log(`  navy seed ${all.seeds.navy.oklch} → anchor step ${all.seeds.navy.anchorStep}`);
  console.log(`  gold seed ${all.seeds.gold.oklch} → anchor step ${all.seeds.gold.anchorStep}`);
  for (const deviation of resolved.deviations) console.log(`  deviation: ${deviation}`);
  console.log(`  wrote ${path.relative(process.cwd(), CSS_PATH)}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

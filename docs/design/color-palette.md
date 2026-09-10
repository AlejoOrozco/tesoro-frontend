# Color Palette — Generating a Full System from Seed Colors

This is written as a mechanical recipe, not a set of taste-based suggestions. Given 1–3 seed brand colors and a priority order, everything below is deterministic — an agent following it shouldn't need to hand-pick a single additional hex.

## The only input this needs

- **1–3 seed hex colors, in priority order** (dominant / secondary / accent — see §3 for what priority actually controls). This is the one open item from `PROJECT_PLAN.md` — once these are supplied, the rest of this document is mechanical.

## 1. Color space: OKLCH, not HSL

Build every scale in **OKLCH**, not HSL. HSL's hue visibly drifts as lightness changes (a blue shifts toward purple as you lighten it) and equal HSL lightness steps don't look like equal perceptual steps. OKLCH fixes both: hue stays stable across the whole lightness range, and equal `L` steps produce equal *perceived* brightness differences — which is what makes a scale generatable by formula instead of by eye. `oklch()` has been supported natively in CSS in all major browsers since 2023–24, so it can be used directly — no runtime library needed in the browser, only at build time to generate the values.

## 2. Build an 11-step scale per color

| Step | Lightness (L) | Chroma factor (× seed chroma) | Typical use |
|---|---|---|---|
| 50 | 97% | 0.15 | Subtle backgrounds |
| 100 | 93% | 0.25 | Hover states on light surfaces |
| 200 | 86% | 0.45 | Borders, dividers |
| 300 | 76% | 0.70 | Disabled states |
| 400 | 64% | 0.90 | Placeholder text, muted icons |
| 500 | 53% | 1.00 | Anchor — closest to the seed color itself |
| 600 | 45% | 0.95 | Hover on the anchor |
| 700 | 37% | 0.85 | Active/pressed states |
| 800 | 29% | 0.70 | Headings, strong emphasis |
| 900 | 21% | 0.55 | Body text |
| 950 | 14% | 0.40 | Highest-contrast text |

**Hue** stays constant at the seed's own hue across every step — that's the whole point of using OKLCH.

**Chroma tapers** toward the light and dark ends (multiply the seed's own chroma by the factor in the table) — holding chroma constant at every step pushes the lightest and darkest steps out of the sRGB gamut and makes them look muddy or artificially neon.

**Anchor placement**: don't force the seed color to *be* step 500 — convert the seed to OKLCH, find which step's lightness it's actually closest to, and treat that as the anchor, then generate the rest of the scale outward from there. A seed that's naturally quite light or dark will anchor at a different step than 500, and that's correct.

**Gamut**: OKLCH can express colors outside sRGB. Browsers gamut-map `oklch()` automatically at render time, but if generating hex fallbacks at build time, clamp chroma to stay in-gamut rather than letting a color silently shift hue when converted.

## 3. What to generate, and what "60/30/10" actually controls

Priority order determines **role**, not literally "60% of the UI is painted in the dominant hex." A UI that's 60% saturated brand color is unusable — so:

- **Dominant (priority 1)** → almost always becomes the **neutral scale**: regenerate an 11-step scale at the *same hue* as the priority-1 seed, but at very low chroma (≈ 0.01–0.02) instead of its full chroma. This keeps the neutrals subtly "on-brand" instead of generic gray, while staying near-achromatic enough to occupy 60% of the screen (backgrounds, surfaces, body text) without fatiguing the eye.
- **Secondary (priority 2)** → its own full scale at full chroma, used for supporting UI: secondary buttons, cards, tags — the ~30% portion.
- **Accent (priority 3, or priority 1 if only one seed is given)** → its own full scale, but only the mid-saturated steps (500–700) actually get used in the UI, reserved for primary actions and key highlights — the ~10% portion. Spending it everywhere dilutes it back into "just another color."

If only **one** seed color is supplied: generate its neutral scale (as above) for the 60/30 dominant+secondary roles, and reserve the seed's own full-chroma scale exclusively for the 10% accent role.

### Token mapping (light mode)

| Token | Source |
|---|---|
| `background` | neutral-50 |
| `surface` (cards, panels) | neutral-100 |
| `border` | neutral-200 |
| `text-muted` | neutral-500 |
| `text-primary` | neutral-900 |
| `secondary-surface` | secondary-100 |
| `secondary-border` | secondary-300 |
| `action-primary` | accent-500 |
| `action-primary-hover` | accent-600 |
| `action-primary-active` | accent-700 |
| `action-primary-text` | whichever of neutral-50 / neutral-900 passes contrast against `action-primary` — check, don't assume white |

## 4. Semantic colors (success / warning / error / info)

Generate these the **same way** — an 11-step OKLCH scale each — using conventional hues (success ≈ green 140–150°, warning ≈ amber 80–90°, error ≈ red 25–30°, info ≈ blue 230–250°), but set each one's chroma to roughly match the brand accent's own chroma level. Matching chroma is what keeps status colors feeling like they belong to the same system instead of looking like they were pasted in from a default framework theme.

## 5. Contrast — verify, don't eyeball

Thresholds are the same ones defined in `accessibility.md`: **4.5:1** for normal text, **3:1** for large text/UI components. Check every text-token-on-background-token pairing programmatically before considering a palette finished — e.g. via `culori`'s `wcagContrast()`, or the `wcag-contrast` npm package. Don't hand-verify by eye; check it in code and let a failing pairing block the palette from being marked done.

## 6. Dark mode — flip the mapping, don't regenerate

The scales themselves don't change; only which step each token points to does:

| Token | Light mode | Dark mode |
|---|---|---|
| `background` | neutral-50 | neutral-900 |
| `surface` | neutral-100 | neutral-800 |
| `border` | neutral-200 | neutral-700 |
| `text-muted` | neutral-500 | neutral-400 |
| `text-primary` | neutral-900 | neutral-50 |
| `action-primary` | accent-500 | accent-400 (one step lighter — a fully saturated mid-tone accent tends to read as muddy against a dark background; check contrast either way) |

This flip is genuinely close to free *because* tokens were named by role in the first place (§3 of the original design system principle) — components reference `background`/`text-primary`/etc., never a raw scale step, so swapping the mapping object is the entire dark-mode implementation.

## 7. Output format

**CSS custom properties** as the canonical output — works regardless of framework:
```css
:root {
  --neutral-50: oklch(97% 0.02 250);
  --neutral-900: oklch(21% 0.03 250);
  --accent-500: oklch(53% 0.18 250);
  /* ...all steps, all three scales... */
  --background: var(--neutral-50);
  --text-primary: var(--neutral-900);
  --action-primary: var(--accent-500);
}
[data-theme="dark"] {
  --background: var(--neutral-900);
  --text-primary: var(--neutral-50);
  --action-primary: var(--accent-400);
}
```
If the project uses Tailwind, map these same custom properties into the Tailwind theme config rather than generating a second, parallel set of values — one source of truth.

## Generation script (illustrative)

Using `culori` (`npm install culori`) to generate a scale and check contrast — this is the build-time step that produces the CSS above:

```js
import { oklch, formatCss, parse, wcagContrast } from "culori";

const LIGHTNESS = [97, 93, 86, 76, 64, 53, 45, 37, 29, 21, 14];
const CHROMA_FACTOR = [0.15, 0.25, 0.45, 0.70, 0.90, 1.00, 0.95, 0.85, 0.70, 0.55, 0.40];
const STEP_NAMES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function buildScale(seedHex, { neutral = false } = {}) {
  const seed = oklch(parse(seedHex));
  const chroma = neutral ? 0.015 : seed.c;

  return Object.fromEntries(
    STEP_NAMES.map((step, i) => [
      step,
      formatCss({ mode: "oklch", l: LIGHTNESS[i] / 100, c: chroma * CHROMA_FACTOR[i], h: seed.h }),
    ])
  );
}

// contrast check — fails loudly instead of shipping a bad pairing
function checkContrast(fg, bg, minRatio = 4.5) {
  const ratio = wcagContrast(fg, bg);
  if (ratio < minRatio) throw new Error(`${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${minRatio}:1`);
  return ratio;
}
```

## Open item — resolved

This was previously an open `TBD` waiting on brand colors. It no longer is: the ask is now narrow — **1 to 3 hex codes, in priority order** — and everything from that point on is this document's recipe, not a new decision each time.

# Glass / Frosted Panel Effect

Plain `backdrop-filter: blur()` averages the pixels behind a panel — it looks like a flat gray rectangle, not glass. Real glass *bends* what's behind it. This doc covers the real technique, tuned to a subtle result (per the reference screenshot — a gentle bend and soft blur, not an exaggerated liquid-glass warp), plus when it's actually worth using.

## Why blur alone isn't glass

`backdrop-filter: blur()` softens and averages the background — it removes detail but doesn't distort it. The reference image shows the background's diagonal line pattern still clearly *readable* through the panel, just gently bent near the panel's texture — that displacement is what reads as "glass" rather than "frosted plastic."

## The technique: SVG displacement + backdrop blur

1. An SVG `<filter>` generates a noise texture with `feTurbulence`, then uses `feDisplacementMap` to shift each backdrop pixel sideways based on that noise.
2. That filter is applied to the panel (via `backdrop-filter: url(#glass-filter) blur(...)`), combining the displacement with a standard blur.
3. A thin, low-opacity white inset border on the top/lit edge gives the panel a sense of physical thickness rather than looking like a flat, semi-transparent div.

**Tuned subtle** (matching the reference, not an exaggerated warp):
- Low `baseFrequency` on the turbulence (fine, gentle noise — not large blobby distortion)
- A small `scale` on the displacement map (a few pixels of shift, not a visible "melting" warp)
- A moderate blur radius (soft, not opaque)
- One thin (1px), low-opacity white inset highlight — not a bright rim

### Illustrative starting point

```html
<svg style="position:absolute; width:0; height:0;">
  <filter id="glass-distort">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: url(#glass-distort) blur(14px);
  -webkit-backdrop-filter: blur(14px); /* Safari fallback: filter reference isn't supported, blur alone still applies */
  border-radius: 16px; /* `large`, from borders-and-radius.md */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15); /* the lit-edge highlight */
}
```

Treat the `scale` (displacement strength) and `baseFrequency` (noise fineness) as the two knobs to tune — small values stay subtle, large values start looking like melting glass rather than a gentle bend.

## Performance & compatibility — use this deliberately, not everywhere

- Combining an SVG filter reference with `backdrop-filter` is meaningfully more expensive to render than a plain blur, especially on lower-end Android devices — test on real mid-range hardware, not just a desktop browser.
- Safari has historically not supported referencing an SVG filter inside `backdrop-filter` the same way Chromium does — the CSS above falls back to a plain blur there (no displacement), which is an acceptable degradation, not a broken state.
- Because of the above, use this on a small number of deliberate surfaces — a modal, a nav bar, a notification-style card (as in the reference) — not as a default treatment applied broadly across the app. It's a polish detail, not load-bearing for MVP conversion.

# Design Documentation

One file per UI pattern. These are written to survive past this project — a coding agent should follow `PROJECT_PLAN.md` for what to build, and reach into these files for how to build the interface details. A human (including future-you, on a different project) should be able to read any one of these on its own and understand both the rule and the reasoning behind it.

## Shared tokens

Everything below assumes these four scales exist once, as design tokens (CSS custom properties, a Tailwind config, or equivalent) — never hardcoded per component:

**Spacing scale** — 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 (px). Pick from this list; don't invent one-off values.

**Radius scale** — see `borders-and-radius.md` for the full system, but the short version:
| Name | Value | Use |
|---|---|---|
| small | 4px | inner elements nested inside padded containers |
| medium | 8px | default — buttons, inputs, small cards |
| large | 16px | cards, modals, sheets |
| full | 9999px (pill) | single-line elements only: chips, avatars, toggles |

**Motion timing**
| Interaction | Duration |
|---|---|
| Micro-interaction (hover, focus, button press feedback) | 100–150ms |
| Standard transition (panel open, page section fade) | 200–300ms |
| Deliberate confirmation (hold-to-delete) | 300ms |

**Contrast minimum (WCAG AA)** — 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥19px bold) and for UI component boundaries/icons. See `color-palette.md` for how the color scales are built to satisfy this by construction, not by manual checking every time.

## Index

| File | Covers |
|---|---|
| `loading-states.md` | Skeletons vs. spinners, button lock, layout reservation, progress indicators, progressive rendering, timeouts |
| `forms.md` | Floating labels, touch targets, inline validation, motion in form flow |
| `borders-and-radius.md` | The concentric-corner math, radius scale, pills vs. cards, sheets, selection rings |
| `dropdowns.md` | Searchable long lists, sensible defaults, multi-select, collision/flip, disabled-option messaging, when *not* to use a dropdown |
| `color-palette.md` | Generating an 11-step OKLCH scale per seed color, role-based naming, 60/30/10 balance, contrast verification, dark mode — includes a runnable generation script |
| `dangerous-actions.md` | Hold-to-confirm, action-named buttons, spatial separation, red as a budget, danger zones, soft-delete cooldowns |
| `glass-effect.md` | The real (SVG displacement) technique vs. plain blur, tuned subtle, performance/compatibility notes |
| `accessibility.md` | Alt text, focus states, keyboard navigation, semantic markup for custom components |
| `empty-and-error-states.md` | 404, empty cart/orders/search results, and the shared error-state pattern |

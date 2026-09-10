# Borders & Corner Radius

Rounding every corner without a system is why an interface can look "off" even when nothing is technically wrong. Corners are a system, not a per-element decision.

## The one scale

| Name | Value | Use |
|---|---|---|
| small | 4px | inner elements nested inside a padded container |
| medium | 8px | default — buttons, inputs, small cards |
| large | 16px | cards, modals, sheets |
| full | 9999px (pill) | single-line elements only — chips, avatars, toggles |

Every rounded element in the app picks one of these four values. No one-off radii.

## Concentric corners (nested elements)

When an element sits inside a padded container, its own corner radius should make it look like it shares the same center-point as the container's corner — this is what makes nested shapes look "on purpose" rather than arbitrary.

**Formula:** `inner radius = outer radius − padding`

Example: a card with a 12px outer radius and 8px of internal padding needs its inner content (e.g. an image or inner panel) to use a 4px radius (`12 − 8 = 4`) to stay concentric.

## Pills are for single-line content only

A "full" pill radius fits a chip, an avatar, or a toggle — anything that's one line and roughly capsule-shaped. Apply a full pill radius to a multi-line card and the corners visually swallow the content inside; multi-line containers always get a real number from the scale (`medium` or `large`), never `full`.

## Bottom sheets

A sheet docked to the bottom of the screen rounds only its top two corners; the bottom corners — which touch the screen edge — get zero radius. General rule: **a corner implies there's space beyond it.** An edge that touches the boundary of its container gets no corner at all.

## Selection/focus rings

A focus or selection ring is drawn as its **own box**, offset a couple of pixels outside the element it's highlighting (not baked into the element's own border) — this is also what keeps it visible regardless of the underlying element's own border/shadow. Its radius follows the inverse of the concentric formula:

**Formula:** `outer radius (ring) = inner radius (element) + gap`

Example: an element with an 8px radius and a 2px ring gap needs the ring drawn at 10px radius to stay concentric around it.

## Images inside rounded cards

An edge-to-edge image inside a rounded card will show its own square corners poking through the card's rounded corners unless the card clips it — set `overflow: hidden` on the card container. For an *inset* image (one with padding around it inside the card), subtract that padding from the card's radius using the same concentric formula as above to get the image's own radius.

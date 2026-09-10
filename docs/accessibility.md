# Accessibility

A handful of concrete practices, cross-referencing the numeric rules already defined elsewhere rather than repeating them.

## Alt text on every image

- Product images: describe the product succinctly (e.g. "Blue ceramic mug with wooden handle"), not the filename.
- Decorative images (background textures, purely visual flourishes): `alt=""` (empty, not missing) so screen readers skip them instead of reading a meaningless description.
- Never leave `alt` attributes off entirely — an empty string is a deliberate, valid choice; a missing attribute is not.

## Contrast

Follow the minimums defined in `color-palette.md` (4.5:1 normal text, 3:1 large text/UI components) — every text/background and icon/background pairing in the app, not just the primary brand color.

## Touch targets

Follow the sizing defined in `forms.md` (56px for primary form inputs/buttons, 44px general minimum) — applies to any tappable element, not just form fields: icon buttons, menu items, checkboxes.

## Focus states are never removed

Every interactive element needs a visible focus indicator for keyboard users — never `outline: none` without a replacement. Use the selection-ring pattern from `borders-and-radius.md` (a separate box, offset outside the element) as the standard focus ring across the app, so keyboard focus and any custom "selected" states look consistent.

## Keyboard navigation

Every interactive flow — especially checkout — needs to be fully operable via keyboard alone: tab order should follow visual/logical order, custom components (dropdowns, modals) need to trap and return focus correctly, and nothing should be reachable only by mouse.

## Semantic markup for custom components

Custom-built dropdowns, modals, and toggles need the ARIA roles/attributes that make them behave like their native counterparts for assistive technology — e.g. a custom dropdown needs `role="listbox"`/`role="option"` and arrow-key handling; a modal needs to trap focus and be announced when it opens. Don't build a `<div>` that only *looks* like a select/dialog.

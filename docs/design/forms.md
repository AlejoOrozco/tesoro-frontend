# Forms

Long forms with stacked labels and cramped inputs raise the perceived effort to complete them, which is a big part of why checkout abandonment happens. Three principles, plus one accessibility caveat that matters for this app specifically since it handles real purchases.

## 1. Floating labels, not stacked labels

Instead of a separate `<label>` sitting above the input (which adds visual clutter and vertical space), the label starts inside the input as placeholder-like text and animates up into a small caption above the field once it's focused or filled. This keeps context (the user still knows what the field is for) while reducing the amount of "stuff on screen" at any moment.

**Accessibility caveat**: floating labels have a known trade-off — the label shrinks and moves, which can hurt legibility for people with low vision or who rely on larger zoom levels, and if implemented as placeholder-only (no real `<label>` element), screen readers lose the field's name entirely once text is entered. Implement it as a real `<label>` element that's *visually* animated via CSS transform, not a placeholder standing in for a label. Keep the floated (small) label text at a legible size and contrast — don't shrink it to the point it fails the 4.5:1 text contrast minimum (`color-palette.md`).

## 2. Generous touch targets

Small tap targets are a common source of mis-taps and frustration on mobile. Revolut's form redesign increased their input touch target height to **56px** — treat that as a reasonable floor for primary form inputs and buttons on this app, especially for anything in the checkout flow. The general accessibility minimum is 44px; 56px is comfortably above it.

## 3. Rounded corners, consistently

Rounded input corners read as "safe" and approachable at a subconscious level — but the radius value should come from the app's shared radius scale (`borders-and-radius.md`), not be invented per form. Inputs typically use the `medium` (8px) radius.

## Motion as part of the flow, not an afterthought

Validation feedback should appear inline and in real time (as the user types or on blur), not only revealed as a wall of errors after they hit submit. Auto-focus the first field on page load. Use the standard transition timing (`README.md` — 200–300ms) for label floats and focus-state changes so they feel responsive rather than either instant/jarring or sluggish.

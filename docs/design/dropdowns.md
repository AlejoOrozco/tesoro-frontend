# Dropdowns & Selection Menus

A dropdown is where a form goes to die if it's the wrong tool, or built without a few specific defenses. Six rules.

## 1. Long lists need search

Any list long enough to require scrolling more than a screen or two (countries, cities, a large product category list) needs a type-to-filter search box, not just a scrollbar. Let the user type a few letters instead of hunting.

## 2. Default view should match the likely value — not always "today"/"now"

The instinct "never open a date picker on today" is right for a field where the realistic value is far from the present (a birthdate field shouldn't force scrolling back 30+ years) — but wrong for a field where today genuinely is the likely answer. In this app specifically: a delivery-date or scheduling picker should default to today/the near future, since that's what's actually relevant. Match the default to the field's real-world distribution of likely values, not a blanket rule either way.

## 3. Multi-select stays open

Closing the menu after every single selection forces the user to reopen it repeatedly to pick several items. Keep a multi-select menu open across picks, and show a running count or the selected items as chips so progress is visible without closing it.

## 4. Flip before it clips

A menu that opens off the bottom (or side) of the visible viewport/card is a usability dead end — the user can't see or reach what they need. Use collision detection so the menu flips direction (opens upward instead of downward, or left instead of right) automatically when there isn't room. This is a solved problem in most modern UI libraries (e.g. Radix UI's or Floating UI's "flip" middleware) — don't hand-roll positioning logic.

## 5. Explain disabled options

A grayed-out option with no explanation is a dead end for the user — they don't know if it's temporarily unavailable, permanently irrelevant, or a bug. Say why it's disabled (a tooltip or inline note), and if there's a way to unlock it (e.g. "select a size to see color options"), say that too.

## 6. Don't use a menu for 2–3 options

If there are only two or three mutually exclusive choices, showing them all at once (a segmented control or a set of radio buttons) lets the user pick in one tap and see every option up front — hiding them behind a dropdown just adds an extra click and hides information that would've fit on screen anyway.

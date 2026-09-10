# Empty & Error States

404 is really one instance of a broader pattern: a screen with nothing useful to show, that still needs to feel intentional rather than broken. Treat all of these — 404, empty cart, no orders yet, no search results, a failed request — as one shared component pattern, not one-off screens.

## The shared pattern

Every empty/error state gets three things:
1. A simple icon or illustration (consistent style across all instances — don't design a new one per screen)
2. A short, human sentence describing the situation in plain language, in the app's own voice — not a generic system message
3. One clear action the user can actually take next

## Specific instances

- **404 (page not found)**: brand voice, not a bare "Error 404." Give a way forward — a link back to the homepage/catalog, and if feasible, a search box or a few popular products, so the dead end doesn't feel like one.
- **Empty cart**: "Your cart is empty" + a clear "Browse products" action, not just a blank space.
- **No orders yet**: reassuring, not alarming — a new customer with zero orders isn't an error state, just an early one. "You haven't placed an order yet" + a link to the catalog.
- **No search results**: acknowledge the query, suggest a next step (broaden the search, browse categories) rather than a flat "no results."
- **Failed request** (network error, server error): reuses the timeout/failure/retry pattern from `loading-states.md` rule 6 — say what happened in plain terms and give a retry action, don't leave a spinner or a blank section.

## Why this is worth a shared component

Building one configurable `EmptyState` (icon/illustration, headline, body text, action button as props) and reusing it everywhere is both less work than designing each screen individually and produces a more coherent app — the user learns the pattern once ("oh, this is the 'nothing here yet' screen") instead of parsing a new layout every time they hit a dead end.

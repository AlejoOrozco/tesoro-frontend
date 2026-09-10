# Loading States

Waiting is a design moment, not a gap between screens. Six rules, each fixing a specific way loading states quietly drive people away.

## 1. Skeletons over spinners

A spinner tells the user nothing except "wait." A **skeleton** — gray placeholder blocks shaped like the content that's coming (a product card's image box, title line, price line) — tells them the layout, so the page doesn't feel like it's rebuilding itself when data arrives. Use skeletons anywhere the shape of the incoming content is known ahead of time: product grids, order lists, the cart. Reserve a plain spinner for the rare case where you genuinely don't know what's coming (e.g. a generic full-page initial load).

## 2. Lock the button, fast

A button that does nothing after a click gets clicked again. Give feedback (a spinner inside the button, a disabled state) **within 100ms** of the click, then lock the button so a second click can't fire a second request. This matters most on checkout/payment actions — it's the UI half of the idempotency work already in the plan (`PROJECT_PLAN.md` §3): the backend should be safe against duplicate submissions regardless, but the frontend shouldn't invite the problem in the first place.

## 3. Reserve the space

If content loads in late and pushes everything below it down the page, a click aimed at a button can land on whatever slid into its place instead. Reserve the exact final space (skeleton at full size, or a fixed-height container) before the real content arrives, so nothing shifts once it's there.

## 4. Make progress bars actually show progress

A bar that fills with no number next to it isn't progress, it's decoration. Where the total is knowable (a multi-step checkout, a file upload), show the percentage, the step (e.g. "Step 2 of 3"), and — if it's meaningful — an estimated time remaining. Reserve indeterminate (looping) animations for the cases where the duration genuinely can't be estimated.

## 5. Render the shell, fill the regions

One slow API call shouldn't freeze the whole page. Render the page's static shell (header, nav, layout) immediately, then let each data-dependent region (React Suspense boundary, or an equivalent per-section loading state) resolve independently. A slow "related products" section shouldn't block the product detail above it from showing.

## 6. Every spinner needs an ending

An indefinite spinner with no timeout is a dead end. Every async operation needs: a timeout, a clear message about what went wrong if it fails, and a retry action. Never leave the user staring at something that might never resolve.

# Dangerous Actions

Deleting a product, cancelling an order, removing a user — these need a design language of their own, not just a confirmation dialog bolted on. "Are you sure?" dialogs get clicked through on autopilot; nobody reads them. The alternatives below actually work.

## Hold-to-confirm instead of a dialog

For destructive actions, replace the "Are you sure? Yes/No" dialog with a **hold-to-confirm** interaction: the user presses and holds the action (e.g. a delete button), a ring or bar fills over roughly 300ms of sustained pressure, and releasing early cancels the action — nothing happens unless the hold completes. The filling ring *is* the confirmation UI; there's no separate dialog to skim past.

## Name the action, not "Yes/No"

When a dialog is unavoidable (e.g. on desktop where press-and-hold is less natural), the buttons should name the actual action — **"Delete project"** / **"Keep project"** — instead of a generic "Yes" / "No" that requires the user to remember what they're confirming. The verb itself is the warning.

## Keep destructive actions away from confirm/primary positions

Muscle memory clicks the spot where a "Confirm" or "Save" button usually lives — without reading it. Never place a destructive action in that position. Put delete somewhere that requires a deliberate, conscious reach, not a reflexive click.

## Red is a budget — spend it only on destruction

If red is used for logout, warnings, and various neutral actions, it stops meaning "this destroys something" and the destructive action stops standing out. Reserve red exclusively for genuinely destructive actions in this app.

## The "danger zone" pattern

Group destructive settings-page actions (delete product, deactivate account, etc.) into a clearly bordered, explicitly labeled section, placed last on the page — the way GitHub does with repository deletion. Making the user scroll to a labeled danger zone is intentional friction, not bad UX.

## Time as the actual last line of defense

Where the action allows it, prefer a **soft delete with a cooldown window** over instant, permanent deletion — e.g. "Product deleted — restorable for 14 days" before it's actually purged. This is already the backend pattern the plan uses for locations/products (`is_active`/`deleted_at` flags instead of hard deletes, in `PROJECT_PLAN.md`) — this doc is the UI-facing half of that same decision: surface the undo window to the user instead of hiding it.

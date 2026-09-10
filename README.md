# Tesoro Global SAS — Public site (`www`)

Next.js frontend for **www.tesoroglobalsas.com**: marketing/landing now, storefront later.

This repository never talks to the database. Business data goes through the NestJS API (`api.tesoroglobalsas.com`) once those endpoints exist. The authenticated app (`app.tesoroglobalsas.com`) is a **separate** Next.js project and is not in this repo.

User-visible copy is **Spanish**. Routes, files, identifiers, and commits are **English**.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm tokens   # regenerate design tokens + WCAG contrast gate (fails on a bad pairing)
```

Copy `.env.example` to `.env.local` for local public config. Never commit `.env*`.

## Folder conventions

```
app/
├── layout.tsx              Root document (html/body) + Montserrat (500/700) via next/font.
├── globals.css             Imports Tailwind and the generated tokens.
├── styles/tokens.css       GENERATED design tokens — never edit; run `pnpm tokens`.
├── icon.png                Favicon (navy, no background).
├── (marketing)/            Public marketing routes — URL is not affected by the group name
│   ├── layout.tsx          Skip-link target (`#main-content`). Header/footer land in Stage 3.
│   └── page.tsx            /  (landing)
└── (shop)/                 Reserved. Catalog/cart land here later without a rewrite.
assets/brand/               Logo and favicon source files. Import via `assets/brand.ts`.
assets/hero/                Hero cut-outs the app imports (`assets/hero.ts`).
assets/products/            Product photos the app imports (`assets/products.ts`).
media/                      Drop folder for new imagery — left in place; files are copied into assets/.
lib/                        Shared non-UI code (contact constants, landmarks, theme, later API clients).
components/                 Shared UI: button, container/section, typography, empty-state, icons, skip-to-content, theme init script.
scripts/                    Build-time tooling: generate-tokens.ts (OKLCH scales + WCAG gate).
docs/                       Product plan, infrastructure, and UI pattern docs.
```

Route groups (`(marketing)`, `(shop)`) organize layouts without changing URLs. Adding `/products` later means `app/(shop)/products/page.tsx`, not moving the landing page.

## Brand assets

Import from `@/assets/brand`. Pass `asset.image` to `next/image` so Next.js can compress to WebP and set width/height.

Logos whose `hasBakedBackground` is `true` (`logo-gold.jpg`, `logo-navy.jpg`) must **not** sit on theme-dependent surfaces (hero, header). Use the `*-no-background.png` variants there. Baked-background files are for surfaces we fully control (for example Open Graph images).

## Contact

Phone, WhatsApp, and email live in **one** place: `lib/contact.ts`, fed by `NEXT_PUBLIC_*` values in `.env.local`. Do not hardcode them in components.

## Theming

Light is default; dark maps the same role tokens to other scale steps (`app/styles/tokens.css`). With no stored choice, the OS preference applies. A manual choice is persisted under the `tesoro-theme` localStorage key and applied pre-paint by `components/theme-init-script.tsx`; the header toggle (Stage 3) calls `setTheme` from `lib/theme.ts`. Content imagery must be background-free so it sits on either theme.

## Design

Visual values (spacing, radius, motion, color) come from `docs/design/`. Do not invent one-off numbers in components.

## Related docs

- `docs/PROJECT_PLAN.md` — scope, architecture, phase plan
- `docs/INFRASTRUCTURE.md` — hosting, domains, environments
- `docs/design/` — UI patterns and token scales

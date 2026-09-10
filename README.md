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
├── layout.tsx              Root document (html/body) + Outfit via next/font.
├── globals.css             Imports Tailwind and the generated tokens.
├── styles/tokens.css       GENERATED design tokens — never edit; run `pnpm tokens`.
├── icon.png                Favicon (navy, no background).
├── (marketing)/            Public marketing routes — URL is not affected by the group name
│   └── page.tsx            /  (landing)
└── (shop)/                 Reserved. Catalog/cart land here later without a rewrite.
assets/brand/               Logo and favicon source files. Import via `assets/brand.ts`.
lib/                        Shared non-UI code (contact constants, later API clients).
components/                 Shared UI. Created when the first primitive lands (Stage 2).
scripts/                    Build-time tooling: generate-tokens.ts (OKLCH scales + WCAG gate).
docs/                       Product plan, infrastructure, and UI pattern docs.
```

Route groups (`(marketing)`, `(shop)`) organize layouts without changing URLs. Adding `/products` later means `app/(shop)/products/page.tsx`, not moving the landing page.

## Brand assets

Import from `@/assets/brand`. Pass `asset.image` to `next/image` so Next.js can compress to WebP and set width/height.

Logos whose `hasBakedBackground` is `true` (`logo-gold.jpg`, `logo-navy.jpg`) must **not** sit on theme-dependent surfaces (hero, header). Use the `*-no-background.png` variants there. Baked-background files are for surfaces we fully control (for example Open Graph images).

## Contact

Phone, WhatsApp, and email live in **one** place: `lib/contact.ts`, fed by `NEXT_PUBLIC_*` values in `.env.local`. Do not hardcode them in components.

## Design

Visual values (spacing, radius, motion, color) come from `docs/design/`. Do not invent one-off numbers in components.

## Related docs

- `docs/PROJECT_PLAN.md` — scope, architecture, phase plan
- `docs/INFRASTRUCTURE.md` — hosting, domains, environments
- `docs/design/` — UI patterns and token scales

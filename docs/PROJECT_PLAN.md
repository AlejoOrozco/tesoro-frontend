# Tesoro Global SAS — E-commerce Platform — Project Plan

This document is the single source of truth for scope, architecture, and phasing. It's written to be read by both humans and an AI coding agent (Cursor) — decisions are explicit, and open items are marked `TBD` rather than assumed.

**Related documents** (kept separate to avoid repeating content):
- `INFRASTRUCTURE.md` — hosting, domains/DNS, environments, secrets, CI/CD, backups, monitoring
- `design/` — one file per UI pattern (loading states, forms, color palette, etc.), reusable beyond this project

---

## 1. Overview

Web application for Tesoro Global SAS to sell products online, with role-based staff management, bodega (warehouse) inventory, in-app payments (Wompi), and delivery handled through HEKA (which aggregates Servientrega, Coordinadora, TCC, etc.).

**Out of scope for MVP:** Excel process automation, automated refunds, electronic invoicing (DIAN) / accountant role, per-location/multi-warehouse inventory tracking (single bodega inventory only), loyalty programs, native mobile app.

---

## 2. Confirmed Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript |
| Backend | NestJS, TypeScript — modular monolith (not microservices) |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth. NestJS guards are the primary authorization boundary; backend connects with the `service_role` key. RLS is enabled on all tables as a defense-in-depth layer, not the primary boundary. |
| Payments | Wompi |
| Shipping | HEKA |
| Email | Resend, sent from a dedicated subdomain (e.g. `mail.tesoroglobalsas.com`) so it never touches the root domain's existing Google Workspace MX records |
| Image storage | Supabase Storage, images compressed to WebP |
| Hosting | Vercel (frontend), Railway (backend, + Redis when needed) |
| ORM | Prisma (recommended — pairs well with NestJS + TypeScript, has built-in migration tooling) — `TBD: confirm` |

### Domains
Four subdomains (`www`, `app`, `api`, root redirect) — full DNS/domain setup in `INFRASTRUCTURE.md`.

---

## 3. Architecture Principles

- **Backend-centric.** The frontend never talks to Supabase directly for business data — everything goes through the NestJS API.
- **Service/Controller pattern by default.** Pipeline/orchestration pattern for multi-step flows that cross external systems (order → payment → shipment).
- **Adapter pattern for external integrations** — e.g. `ShippingService` calls a `HekaAdapter`, business logic never calls HEKA-specific methods directly. Same pattern for `PaymentService` → `WompiAdapter`, so swapping/adding a provider later doesn't touch business logic.
- **Idempotency keys required on:** create payment, create order, create shipment, and all inbound webhook processing.
- **Saga/orchestration pattern is included** (deprioritized relative to idempotency, but not dropped) for the order fulfillment flow. It doesn't need AWS — state is driven by the `order_status` / `payment_status` / `shipping_status` columns, with retries handled via Redis + BullMQ once that's set up.
- **Order status is three independent fields**, not one enum: `order_status`, `payment_status`, `shipping_status`. Every transition is also logged to `order_status_history`.
- **Audit log is scoped**, not exhaustive — only state-changing actions on sensitive entities (roles, orders, products, users, locations).
- **Webhook security:** HMAC signature verification + timestamp replay window + idempotency check. No JWT on webhook endpoints.

---

## 4. Data Model (core entities — high level, refine during Phase 2)

```
User            (id, email, role: client | colaborador | admin, ...)
Product         (fields TBD — pending client input; includes `stock` — single bodega/warehouse inventory, no per-location tracking)
Order           (id, customer_id, order_status, payment_status, shipping_status, total, created_at)
OrderItem       (order_id, product_id, quantity, unit_price [snapshot at purchase time], subtotal)
OrderStatusHistory (order_id, from_status, to_status, changed_by, changed_at, reason)
Payment         (order_id, provider, status, amount, provider_reference)
Shipment        (order_id, heka_reference, status, tracking_info)
AuditLog        (id, user_id, action, entity_type, entity_id, metadata, created_at)
ProcessedWebhookEvent (event_id, source, processed_at)  -- idempotency guard for inbound webhooks
```

`unit_price` on `OrderItem` is a snapshot — never recompute from the current `Product.price`.

---

## 5. Role Permission Matrix (draft — refine as business rules firm up)

| Action | Client | Colaborador | Admin |
|---|:---:|:---:|:---:|
| Browse product catalog | ✅ (public, no auth) | ✅ | ✅ |
| Add to cart / place order | ✅ | — | — |
| View own orders / tracking | ✅ | — | — |
| Cancel own order (rules TBD) | ✅ | — | — |
| View all orders | — | ✅ | ✅ |
| Update order status | — | ✅ | ✅ |
| Manage bodega stock/inventory | — | ✅ | ✅ |
| Create/edit/delete products | — | `TBD` | ✅ |
| View all users | — | — | ✅ |
| Change user roles | — | — | ✅ |
| View audit log | — | — | ✅ |
| Configure payment/shipping settings | — | — | ✅ |

`TBD`: whether colaboradores can edit product data (price especially) or only stock counts.

---

## 6. Security Requirements (MVP)

- HTTPS everywhere; CORS explicitly restricted to `app.` / `www.` origins.
- JWT + role guard + resource-ownership checks on every endpoint **except** `/auth/login`, `/auth/register` (public, rate-limited, reCAPTCHA v3).
- Rate limiting globally; stricter limits on auth endpoints.
- DTO validation on every input (`class-validator`).
- Centralized exception handling — never leak stack traces to clients.
- Security headers (`helmet`).
- Secrets only in backend env vars — never `NEXT_PUBLIC_`-prefixed. Frontend gets public client config only.
- RLS enabled on all Supabase tables (defense-in-depth; backend uses `service_role` and bypasses it by design).
- **Session token**: NestJS issues its own `httpOnly`, `Secure`, `SameSite=Lax` cookie after validating against Supabase — the raw Supabase JWT never sits in `localStorage`/`sessionStorage` or any JS-readable storage (XSS would otherwise be able to steal it). Add CSRF protection on state-changing requests as a second layer.
- **Password policy**: configure Supabase Auth's minimum length + required character classes (digits, upper/lowercase, symbols). Leaked-password checking (HaveIBeenPwned) requires Supabase's Pro plan — dropped for MVP.

---

## 7. Phase Plan

| Phase | Deliverable |
|---|---|
| 0 | Requirements (mostly done via planning — needs final write-up once client answers land) |
| 1 | **Public site shell** (`www.`) — landing page. Next.js + TypeScript, App Router. No auth, no DB writes yet. Structured so a `(shop)` route group can be added later for catalog/cart without a rewrite. Design owned by the user — this phase only defines code conventions (see §8). |
| 2 | Architecture — finalize schema, module boundaries, conventions |
| 3 | Infrastructure — see `INFRASTRUCTURE.md` |
| 4 | Backend foundation — NestJS + Supabase connection, auth guards, roles, validation, logging, rate limiting, health check |
| 5 | Product & inventory system — CRUD, bodega stock, admin views |
| 6 | Orders — cart, order/order-item, price snapshot, status + history |
| 7 | Payments — Wompi integration, webhooks, idempotency |
| 8 | HEKA integration — shipment creation, tracking, webhooks/polling, retries |
| 9 | Remaining frontend — auth flows, cart/checkout, colaborador/admin dashboards |
| 10 | Security hardening |
| 11 | Production readiness — see `INFRASTRUCTURE.md` |

---

## 8. Folder Structure Conventions

### Backend (NestJS)
```
src/
├── auth/
├── users/
├── products/
├── orders/
├── payments/
├── shipping/
├── webhooks/
├── audit/
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   └── pipes/
└── app.module.ts
```
Each domain module internally:
```
products/
├── products.controller.ts
├── products.service.ts
├── products.repository.ts
├── dto/
└── entities/
```

### Frontend — `app.` (authenticated application)
```
app/
├── (auth)/          login, register
└── (dashboard)/     products, orders, deliveries, admin views
```

### Frontend — `www.` (public site, Phase 1 target)
```
app/
├── (marketing)/     /, /about, /contact   ← Phase 1 scope
└── (shop)/          /products, /cart      ← added later, calls public API endpoints
```
Keep this a separate Next.js project/deployment from `app.`, since it has no auth dependency and shouldn't share build/runtime context with the authenticated app.

**Non-negotiable regardless of design:** frontend route protection (e.g. hiding `/admin`) is not security — the real boundary is always the backend endpoint's JWT + role + permission checks.

---

## 9. Open / TBD Items

**Business** (needs client input)
- Exact product fields
- Full order lifecycle failure-branch rules (payment fails, HEKA fails, cancellations, etc.)
- ~~Inventory source of truth~~ — **Resolved**: the app is the system of record for bodega (warehouse) stock. That's the point of tracking it — it prevents the site from continuing to show products that are actually sold out.
- Exact colaborador permissions on products

**External services**
- HEKA API access + webhook capabilities — pending their onboarding process
- Wompi account — set up when ready
- Resend domain — quick setup, pending go-ahead

**Technical**
- ORM confirmation (Prisma recommended)
- Redis/BullMQ setup timing — needed once webhook retries / saga steps are built
- Testing scope — recommend critical-path only for MVP: checkout end-to-end, payment webhook processing, stock decrement logic
- Infra-specific open items (CI/CD detail, backup tier, staging strategy, monitoring tool) — see `INFRASTRUCTURE.md`

---

## 10. MVP Feature Summary (client-facing)

- Customers can browse the catalog, add products to a cart, and check out securely by card or PSE through Wompi.
- Customers can create an account; anything in their cart before logging in carries over automatically.
- Customers can see their order history and delivery tracking status.
- Staff (colaboradores) can view and manage orders, and update bodega (warehouse) stock levels.
- Admins can manage products, users and their roles, and see a record of who changed what in the system.
- Orders automatically get a shipment created and tracked through HEKA, covering Servientrega, Coordinadora, TCC, and other carriers HEKA works with.
- The site shows the services the company offers, with a way to contact the team directly about them.
- The site shows the company's physical store locations (sucursales) so customers know where to find them.
- The system is secured with role-based access control, encrypted connections (HTTPS), rate limiting against abuse, bot protection on public forms, and required legal pages (terms & conditions, privacy policy, habeas data compliance).
- Deployed on professional infrastructure (Vercel, Railway, Supabase) under the company's own domain, with automated backups and error monitoring.
- Google Analytics and Meta Pixel set up to track traffic and conversions, plus basic SEO (sitemap, search engine indexing) so the site is discoverable.
- **Not included yet, planned for a later phase:** automated refunds (customers are directed to contact the company directly for now) and Excel-based process automation.

---

## 11. Design Reminders (frontend content — no backend logic needed for MVP)

Flagged here so these aren't lost during design/build, kept separate from code decisions per your call:

- **Services section** — list the services the company offers, each with a "contact us" call-to-action (phone/WhatsApp). No purchase flow, no `Service` database entity needed for MVP — this can be static content. Tip: keep the contact number in one place (a constant or env var) rather than hardcoded in multiple spots, so updating it later is a one-line change.
- **Sucursales section** — a page/section showing the company's physical locations so customers know where to find them. Purely informational for MVP — no relationship to inventory or delivery (this is *not* the old per-location inventory concept, just a "where to find us" page). Static content is fine given the small number of locations; if the list changes often, a lightweight admin-editable table is a cheap addition later, not needed now.

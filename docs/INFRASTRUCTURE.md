# Infrastructure — Tesoro Global SAS E-commerce Platform

Hosting, domains, environments, and operational setup. Kept separate from `PROJECT_PLAN.md` so architecture/business decisions and deployment mechanics don't get tangled together.

---

## 1. Hosting per layer

| Layer | Provider | Notes |
|---|---|---|
| Frontend (`www.`, `app.`) | Vercel | Two separate Vercel projects — `www` has no auth dependency, deploy independently from `app` |
| Backend (NestJS) | Railway | Also hosts Redis once BullMQ is needed (Phase 7-8) |
| Database + Auth + Storage | Supabase | Postgres, Auth, and file storage (product images, compressed to WebP) |
| Email | Resend | Sent from a dedicated subdomain — see §2 |

## 2. Domains & DNS

| Subdomain | Points to | Purpose |
|---|---|---|
| `tesoroglobalsas.com` | redirect | → `www.tesoroglobalsas.com` |
| `www.tesoroglobalsas.com` | Vercel (project: web) | Public site — landing now, storefront/catalog later |
| `app.tesoroglobalsas.com` | Vercel (project: app) | Authenticated application — customer account, colaborador/admin dashboards |
| `api.tesoroglobalsas.com` | Railway | NestJS backend |
| `mail.tesoroglobalsas.com` (or similar) | Resend | Transactional email sending — dedicated subdomain so its SPF/DKIM records never touch the root domain's existing Google Workspace MX records |

**CORS**: restrict the NestJS backend to only accept requests from `app.tesoroglobalsas.com` and `www.tesoroglobalsas.com`.

**Session cookie domain**: set to `.tesoroglobalsas.com` (not just `app.`) so the guest-cart-to-login handoff between `www.` and `app.` works — see `PROJECT_PLAN.md` §6 for the cookie security requirements themselves.

## 3. Environments

| Environment | Purpose | Notes |
|---|---|---|
| Local/development | Day-to-day coding | `.env.local` files, never committed — add to `.gitignore` |
| Staging | Verify a change before it reaches real customers | Can start simple: a second Railway service + a second Supabase project (or a separate schema) + a Vercel preview deployment. Doesn't need to be elaborate for MVP, but should exist before go-live |
| Production | Live site | Real customer data, real payments |

`TBD`: exact staging setup — a full separate Supabase project is cleaner (fully isolated data) but costs more; a separate schema in the same project is cheaper but riskier if a migration touches the wrong schema. Decide once you're closer to Phase 3.

## 4. Secrets management

- Never commit secrets to Git — `.env*` (except `.env.example`) stays in `.gitignore` from the first commit.
- Local dev: `.env.local`.
- Staging/production: set directly in Vercel's and Railway's environment variable UI, scoped per environment (don't reuse the same values across staging and production).
- What lives where:
  - **Frontend** gets only public, non-secret config (`NEXT_PUBLIC_*` — Supabase anon key, public API base URL). Never the `service_role` key.
  - **Backend** holds everything sensitive: `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `HEKA_API_KEY`, Wompi keys, JWT/cookie signing secret.

## 5. CI/CD

Minimal pipeline is enough for MVP — a small, real pipeline beats an elaborate one that never gets built:
- GitHub Actions on every push: lint + run the critical-path tests (see `PROJECT_PLAN.md` §9 testing scope).
- On merge to `main`: auto-deploy to staging.
- Promotion to production: manual trigger to start (a deliberate "yes, ship it" step), can automate later once you trust the pipeline.

`TBD`: exact GitHub Actions workflow file — write this during Phase 3.

## 6. Backups

- Confirm the Supabase plan tier actually includes automated daily backups with a retention window you're comfortable with — this is not guaranteed on the free tier. Verify before go-live, not after an incident.
- Keep a manual "how to restore" note once confirmed (which dashboard screen, how far back you can go) so it's not tribal knowledge.

## 7. Monitoring, health checks & rollback

- **Health check**: `GET /health` on the NestJS backend — confirms the app is alive. A `GET /health/ready` (checks DB connectivity) can follow later.
- **Error tracking**: Sentry (or similar) — catch and surface backend/frontend errors instead of finding out from a customer complaint.
- **Uptime**: a simple external ping/monitoring service against `/health` so downtime is caught immediately, not hours later.
- **Rollback**: both Vercel and Railway support redeploying a previous build with a couple of clicks — know where that button is *before* you need it under pressure, not during an incident.

## 8. Third-party account ownership

Per the signed contract: all hosting/service accounts (Vercel, Railway, Supabase, Wompi, domain registrar, Resend) are created and owned under **Kevin's** email/business identity, with **Alejandro** added as collaborator/admin. This keeps the client owning their own infrastructure long-term rather than depending on the developer's personal accounts.

---

## Open Items (infrastructure-specific)

- Staging strategy: separate Supabase project vs. separate schema (§3)
- Exact CI/CD workflow file (§5)
- Confirm Supabase plan tier for backups (§6)
- Monitoring tool choice — Sentry vs. alternative
- Uptime-monitoring service choice

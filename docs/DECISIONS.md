# Decision Log

ADR-lite. Append a dated entry per significant decision: context → choice → rationale. Newest first.

---

## 2026-07-13 — Homepage restructure (spec `docs/specs/homepage-restructure.md`)

### D8 — Reposition from "Technical Product Manager" → "Product Manager — Container Shipping & Logistics Systems" (global)
**Context:** The homepage argued Product-Owner (delivery pipeline); Karl targets Senior PM roles. "Technical" in the headline read as implementation-flavored.
**Choice:** Replace the role label everywhere — `layout.tsx` metadata/OG/Twitter, `personJsonLd.jobTitle`, Hero tagline, **blog post byline**, `scripts/generate-feeds.mjs` (llms.txt), README. Technical depth stays as *evidence* in body copy, not as a label.
**Rationale:** One consistent identity across page, meta, structured data, and blog. Author chose global scope over homepage-only (a stale byline on /blog would read as sloppy).

### D9 — PO→PM reframe: 6 end-to-end stages + flagship live artifact
**Context:** "How I Work" was 8 delivery-only steps (Ideas→…→Release); no strategy/discovery/launch.
**Choice:** Compress to 6 stages (Strategy & Bets → Discovery → Definition → Specs & Edge Cases → Design & Build → Launch & Learn). Add the shipped **AI-Ready Product Workflow v2** as the flagship case study — bold-accent full-width card (sky→fuchsia gradient ring, "Live · Open Source" badge) with the `PM Strategy → PO Pipeline → Design → Code → Validate` chain *inside the card* (author-selected placement) and two links (live + GitHub, no star counts).
**Rationale:** The reframe needs *evidence*, not a relabel. A shipped, inspectable artifact + a strategy-to-launch process is the argument.

### D10 — Remove the ghost/cursor hero effect entirely (not just soften)
**Context:** Hero loaded a Three.js/WebGL cursor-trail via `dynamic({ssr:false})`; a prior commit had *softened* it. Spec asked to remove.
**Choice:** Delete `GhostCursor.tsx` + its import. Kept the static dot-grid + entrance fade. `three` is now an unused dependency (was lazy-loaded, never in the main bundle) — optional `npm uninstall three`.
**Rationale:** Author chose full removal for a lighter, calmer hero. Note: Hero keeps `"use client"` (entrance fade uses state) — removal did not make it fully server-renderable.

### D11 — Delete dead placeholder markup; sharpen carrier focus
**Context:** "Open to Opportunities" banner + hero relocation badge were `class="hidden"` — invisible on-page but present in served HTML (crawler-visible placeholder text: `[Month, Year]`, "updating soon", "Last updated: March 2026").
**Choice:** Delete from the DOM (removed `OpportunitiesBanner.tsx`; replaced the hidden badge with a factual `📍 Boston, MA` pill using an **SVG map-pin, not an emoji**). Demote SME/eCommerce work: two case studies → subordinate "Side Projects" strip; dropped two SME domain bullets; genericized "Currently Building" and the vxsolutions link text (hrefs kept, footer "My Work" removed). Single-figure metrics (no `X–Y%` ranges).
**Rationale:** Hiding ≠ removing for SEO/crawler hygiene. Carrier-side shipping is the moat; SME work dilutes it and is demoted, not deleted.

### Spec correction — "How I Work renders twice" was NOT a bug
`WorkFlow.tsx` renders the steps once for desktop (`hidden lg:block`) and once for mobile (`lg:hidden`) — responsive variants, only one visible per breakpoint. The crawled HTML showed both because both are in the DOM. No de-dup needed.

---

## 2026-07-11 — Blog restructure (spec v4)

### D5 — Collapse blog taxonomy to 3 domain-coherent categories
**Context:** Old categories (Product / Management / AI Adoption / Container Shipping) mixed a function axis with a domain axis — incoherent for positioning Karl as a shipping-domain expert who builds product.
**Choice:** Three categories — `shipping-logistics`, `product-systems`, `ai-in-operations`. Each post gets exactly one; old topic labels stay as `tags`. Spec + mapping saved at `docs/specs/blog-restructure.md` §4.
**Rationale:** Domain-first taxonomy; `ai-in-operations` is the bridge category shared by both reader paths.

### D6 — Single-select category filter (crawler-safe); Start Here above the filter
**Context:** The spec asked for multi-select, but on review the author found it broken/unwanted and chose a simple single-select filter (2026-07-11). Also: the Start Here module belongs at the very top, above the header/filter — not between filter and grid.
**Choice:** Single-select chips (All + 3 categories, one active at a time). Filter defaults to "all" so the full list prerenders into static HTML; parse `?category=` from `window.location` on mount + `popstate`; sync URL via `history.pushState`. Never `useSearchParams`. Start Here renders first in `<main>`; its per-card "See all" links were removed.
**Rationale:** Keeps the crawler fix intact and the breadcrumb deep-link working, without the multi-select complexity. Editorial "Start Here" onboarding leads the page.

### D7 — Compute read-time at build (220 wpm), ignore frontmatter number
**Context:** Frontmatter `readTime` values over-reported badly (e.g. 9–10 min on ~900–1000-word posts).
**Choice:** `computeReadTime()` in `lib/posts.ts` strips markdown/code and rounds words/220; frontmatter `readTime` is now ignored (left inert in files).
**Rationale:** Honest, auto-maintaining for future posts — matches the spec's metadata-driven bias.

---

## 2026-07-09 — v2 foundational decisions

### D1 — Migrate hosting from GitHub Pages to Vercel
**Context:** Site is a Next.js static export on GitHub Pages, which can never run a backend. v2 needs subscribe + interaction.
**Choice:** Migrate to Vercel, drop `output: 'export'`, re-point `karl-nguyen.com` DNS. Same repo/domain.
**Rationale:** Native Next.js, API routes + serverless, dynamic OG images, generous free tier. GitHub Pages is a dead-end for the interactive goal. Considered "stay static + third-party services" and "hybrid separate API" — rejected as more fragmented / more ops for less control.

### D2 — Sequence: SEO/homepage first, backend second
**Context:** SEO/LLM discoverability needs no backend; subscribe/interaction does.
**Choice:** Ship SEO + homepage on the current static stack first (M1–M2), then migrate + build backend (M3–M6).
**Rationale:** SEO indexing takes weeks to compound, so start it immediately; avoids blocking quick wins behind the heavier migration.

### D3 — Interaction scope for v2
**Context:** "Readers can interact" needed concrete scope.
**Choice:** All four — comments, reactions/claps, view counts, social share.
**Rationale:** User selected all; covers the full engagement surface. Implementation split: Giscus (comments, no DB), Upstash counters (reactions/views), static share buttons.

### D4 — Subscribe via managed newsletter service
**Context:** Subscribe needs storage, opt-in, unsubscribe, compliance, deliverability.
**Choice:** Managed provider (recommended **Buttondown**; alt Kit / Resend Broadcasts) over self-owned DB + Resend.
**Rationale:** Provider handles double opt-in, unsubscribe, GDPR/CAN-SPAM, deliverability, and RSS-to-email. Least work, best deliverability. Revisit self-hosting only if list ownership demands it.

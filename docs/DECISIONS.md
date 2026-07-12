# Decision Log

ADR-lite. Append a dated entry per significant decision: context → choice → rationale. Newest first.

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

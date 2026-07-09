# Decision Log

ADR-lite. Append a dated entry per significant decision: context → choice → rationale. Newest first.

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

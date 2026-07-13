# Homepage Restructure — Implementation Spec (v1)

> Saved into the repo 2026-07-13. Source spec was reverse-engineered from the live crawled HTML, so some positional assumptions were off — corrections are captured in `docs/DECISIONS.md` (D8–D11) and were applied on branch `homepage-v2`.

**Target:** `karl-nguyen.com` homepage (`/`) + global footer only. **Out of scope:** `/blog` index and `/blog/[slug]` (separate spec) — except the shared positioning byline, which the author chose to change globally (D8).

---

## 0. Strategic intent

The homepage argued **Product Owner** (delivery pipeline: Ideas → PRD → Backlog → UAT → Release). Karl targets **Senior Product Manager** roles in freight visibility / TMS. This pass, in priority order:
1. Remove credibility defects (placeholder text, stale status markers, fuzzy metrics).
2. Reframe PO → PM — show ownership of the full arc: strategy → discovery → definition → design → build → launch, evidenced by a live shipped project (ADD-1).
3. Sharpen focus — carrier-side container shipping is the moat; demote secondary SME/eCommerce work.

Bias: understated and factual over promotional. No "hire me" / availability language anywhere.

---

## FIX tasks

- **FIX-1** — DELETE the "Open to Opportunities" section from the DOM (it was `class="hidden"` — invisible on-page but present in served HTML with `[Month, Year]`, "updating soon", "Last updated: March 2026"). Hiding ≠ removing. Verify `curl` grep returns zero.
- **FIX-2** — Hero: replace the relocation badge with a neutral location line `📍 Boston, MA` (subtle pill). No availability/relocation/work-auth copy. (Applied with an SVG map-pin, not the literal emoji.)
- **FIX-3** — Replace all "Technical Product Manager" with **"Product Manager — Container Shipping & Logistics Systems"**. Page `<title>`: `Karl Nguyen | Product Manager — Container Shipping & Logistics`. Update meta description, OG, Twitter, JSON-LD, llms.txt. (Author chose global scope incl. blog byline + README.)
- **FIX-4** — Replace tilde-range metrics with single figures matching the résumé:
  - Express Booking Flow: `~15–20%` → `Increased booking auto-confirmation conversion by ~20%`
  - Shipment Overview Dashboard: `~20–30%` → `Drove ~30% adoption increase following platform UX redesign`; `~25–35%` → `Reduced manual checks and email coordination by ~40% through system integration`
  - Document Management System: `hours → seconds` → `Cut document retrieval from a multi-hour email and folder hunt to a single keyword search`
  - Rule: one figure per claim, never a range; no invented numbers.
- **FIX-5** — Rebuild "How I Work": 8 delivery steps → **6 end-to-end stages**: Strategy & Bets · Discovery · Definition · Specs & Edge Cases · Design & Build · Launch & Learn. Keep the "AI compresses busywork" pull-quote. Subtitle reframed to strategy→outcome.
- **FIX-6** — Workflow CTA → label `View the AI-Ready Product Workflow →`, href `https://karlng279.github.io/ai-ready-product-workflow-v2/` (new tab).
- **FIX-7** — Reported "renders twice": **NOT a bug** — `WorkFlow.tsx` renders desktop (`hidden lg:block`) + mobile (`lg:hidden`) variants; only one visible per breakpoint.
- **FIX-8** — Remove the hero ghost/cursor-follow effect entirely (Three.js/WebGL, loaded via `dynamic({ssr:false})`). Keep the static dot-grid + entrance fade. (Hero keeps `"use client"` — the fade uses state.)
- **FIX-9** — After FIX-1, grep the codebase for any remaining stale status strings; remove.
- **FIX-10** — Genericize outbound project branding (keep `vxsolutions.tech` hrefs): remove the footer "My Work" link; case-study link text/aria/title → generic (`View case study →`); no visible "VX Solutions" text.
- **FIX-11** — Genericize the "Currently Building" block (drop "smaller businesses in Vietnam" / consultancy framing).
- **FIX-12** — Trim "Applied Product Domains": remove `eCommerce Profitability & Cost Tracking` and `Workflow Automation for SMEs`. Keep the carrier-side items (incl. `eCommerce Platforms for Carriers`).
- **FIX-13** — Demote `Smart Profit & Expense Tracker` + `Smart Inventory Management` from the primary grid to a subordinate "Side Projects" strip (links preserved). `Document Management System` + `Smart Compliance Hub` stay in the main grid.

## ADD tasks

- **ADD-1** — Add **AI-Ready Product Workflow v2** as the flagship case study, most prominent in "Product Work". Badge `Live · Open Source`; problem/solution/impact per spec; two links (`View live →` github.io, `View on GitHub →` github.com/karlng279/ai-ready-product-workflow-v2); no star/fork counts. Optional pipeline chain `PM Strategy → PO Pipeline → Design → Code → Validate` — implemented **inside the card** (author-selected), bold-accent gradient-ring treatment.
- **ADD-2** — Add a "Writing" section (between Product Work and How I Work): heading `Writing`, one line, the **3 most recent** blog posts auto-pulled from post metadata (not hardcoded), and a `Read all posts →` link to `/blog`.

## Out of scope
`/blog` layout; rewriting post prose; deleting the vxsolutions hrefs; GitHub star counts; new/restored metric ranges; any "open to opportunities"/availability copy. (Blog *byline* string is the one deliberate cross-scope edit, per author.)

## Appendix — repo hygiene (author action, separate repo)
The homepage now links `github.com/karlng279/ai-ready-product-workflow-v2`. Before relying on it: (1) fix the README license contradiction (MIT badge vs "Proprietary — All Rights Reserved"); (2) remove committed `.DS_Store` and gitignore it.

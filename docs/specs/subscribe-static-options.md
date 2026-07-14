# Subscribe on the static stack — options & brainstorm (OPEN, not decided)

> Status: **brainstorming**, not a locked decision. Nothing here is committed. When Karl settles the approach, promote the chosen path to `docs/DECISIONS.md` and a `tasks/` milestone.

## The question

Can readers subscribe to get new blog posts by email **without a backend** — staying on the current Next.js static export + GitHub Pages, integrating only a 3rd-party service?

## Short answer: yes

Every managed newsletter provider offers a **hosted embed form** — a plain HTML `<form>` (or a small client-side `fetch()`) that POSTs the email **directly from the visitor's browser to the provider**. No API route, no server, no secret to leak. The provider owns the hard parts:

- double opt-in, unsubscribe, GDPR / CAN-SPAM compliance
- deliverability (SPF/DKIM, reputation)
- **RSS-to-email**: point the provider at the existing `public/rss.xml` (already generated at build by `scripts/generate-feeds.mjs`) and new posts auto-send — no extra code.

This means subscribe does **not** require the Vercel migration (roadmap M3). Only view-counts / reactions genuinely need a backend; comments (Giscus) are also static-friendly.

## Integration patterns (no backend)

1. **Plain HTML form** → `<form action="https://<provider-endpoint>" method="post">`. Zero JS; on submit the browser navigates to (or the provider redirects back from) the provider. Simplest, most robust, but the UX is a page transition.
2. **Client component + `fetch()`** → a small `"use client"` component POSTs to the provider's public endpoint and shows an inline "check your inbox" state. Works in a static export (it's just client JS). Nicer UX; still no server.

Either way the endpoint is public by design (no API key in the client). Spam is handled by the provider (honeypot / optional CAPTCHA).

## Provider options

| Provider | Free tier | Notes |
|---|---|---|
| **Buttondown** (leaning pick) | ~100 subs free | Dev-friendly, clean minimal embed, native RSS-to-email, markdown, low-noise. Best fit for a personal writing site. |
| **Kit (ConvertKit)** | ~10k subs free | Creator-focused, strong automations + landing pages, RSS broadcasts. Heavier than needed but very generous free tier. |
| **Mailchimp** | large-ish free tier | Most mainstream, embed forms, but heavier markup + Mailchimp branding on free plan. |
| Beehiiv / Substack | varies | Blog-as-newsletter platforms; more than an embed, may overlap with the existing blog. |

## Tradeoffs vs. a server-backed form (the parked M4 `app/api/subscribe/route.ts`)

- ➖ No server-side honeypot / custom validation / hidden endpoint (mitigated: provider spam protection; endpoint is meant to be public).
- ➖ Provider branding on some free tiers.
- ➕ Zero infra, no migration, ships today on GitHub Pages; provider handles compliance + deliverability.

## Placement ideas (for when built)

- **Leaning:** a CTA in the homepage **"Writing" section** (`components/WritingList.tsx` area) + the bottom of **/blog** — where readers are most primed to subscribe.
- Alternatives: a compact field in the global Connect footer (site-wide), or a dedicated block only on /blog.
- Reuse existing tokens: `.btn-primary`, `.section-container`, the `Section` wrapper, and the sky `primary` accent for consistency.

## Open questions (resolve before building)

1. Provider — Buttondown vs Kit (subscriber-count ceiling vs simplicity)?
2. Plain form vs JS-enhanced inline success UX?
3. Placement — Writing-section + /blog, footer, or both?
4. Turn on RSS-to-email immediately, or manual sends first?
5. Any double-opt-in / welcome-email copy to prepare?

## References in this repo
- `public/rss.xml` — generated at build (`scripts/generate-feeds.mjs`); the RSS-to-email source.
- Roadmap M4 (`docs/ROADMAP.md`) — the server-backed version; now known to be optional for subscribe.

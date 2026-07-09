# karl-nguyen.com v2 — Roadmap

Living roadmap for the v2 of karl-nguyen.com. Active work lives in [../tasks/todo.md](../tasks/todo.md); decisions in [DECISIONS.md](DECISIONS.md).

## Goal
Turn the personal site + blog into a discoverable, interactive presence for Karl Nguyen as a **Technical PM in Shipping & Logistics**.

Success criteria:
1. **SEO-focused & discoverable** — rank/appear for "Technical PM shipping & logistics" and related.
2. **LLM-crawlable** — ClaudeBot, GPTBot, Gemini, Perplexity can ingest and cite the site.
3. **Subscribe** — readers get new blog posts by email.
4. **Interactive** — comments, reactions/claps, view counts, social share.

## Architecture direction
- **Migrate hosting GitHub Pages → Vercel** (drop `output: 'export'`). Same repo + domain; DNS re-point. Static export cannot run any backend; Vercel gives API routes, DB, dynamic OG.
- **Static-safe work ships first** (SEO/LLM) on the current stack while the migration is built.
- **Managed newsletter** for subscribe (no hand-rolled email infra).

## Phases
| Milestone | What | Stack |
|---|---|---|
| M0 | Memory scaffolding | — |
| M1 | SEO/LLM infra (sitemap, robots, JSON-LD, RSS, llms.txt, OG, metadataBase) | Static (current) |
| M2 | Homepage content & structure revision | Static (current) |
| M3 | Vercel migration + DNS | Migrate |
| M4 | Subscribe (managed newsletter) | Vercel |
| M5 | Interaction (Giscus comments, reactions, views, share) | Vercel |
| M6 | Polish (dynamic OG images, "most read") | Vercel |

## Recommended tech (confirm at execution)
Host: **Vercel** · Newsletter: **Buttondown** (RSS-to-email) · Comments: **Giscus** · Reactions/views: **Upstash Redis / Vercel KV** · Email (if self-send later): **Resend**.

# karl-nguyen.com — Active Work (todo)

Single source of "what's in flight." Update at the end of each session: check off done, add new items. Durable decisions go in [docs/DECISIONS.md](../docs/DECISIONS.md); the full plan is in [docs/ROADMAP.md](../docs/ROADMAP.md).

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## M0 — Memory scaffolding
- [x] Create `tasks/todo.md` (this file)
- [x] Create `tasks/lessons.md`
- [x] Create `docs/ROADMAP.md`
- [x] Create `docs/DECISIONS.md`
- [x] Point `AGENTS.md` at the memory files
- [ ] Commit + push M0 to origin

## M1 — SEO / LLM discoverability (static stack — no backend needed)
- [ ] Fix `metadataBase` in `app/layout.tsx` → `https://karl-nguyen.com` (real bug: OG/canonical URLs resolve relative today)
- [ ] Add canonical URLs (`alternates.canonical`) to `/`, `/blog`, and each post
- [ ] Add a default OG share image (`public/images/og-default.*`) at root
- [ ] Add `app/sitemap.ts` (uses `getAllSlugs` / `getAllPosts` from `lib/posts.ts`)
- [ ] Add `app/robots.ts` — allow all + sitemap + welcome GPTBot / ClaudeBot / Google-Extended / PerplexityBot / CCBot
- [ ] Add JSON-LD: `Person` + `WebSite` on home; `BlogPosting` + `BreadcrumbList` on posts
- [ ] Add build-time RSS generator → `public/rss.xml`, linked in `<head>`
- [ ] Add `public/llms.txt` (curated bio + positioning + key posts)
- [ ] Verify: build → inspect `out/` for sitemap/robots/rss/llms.txt; validate JSON-LD; check OG resolves absolute
- [ ] Deploy on current GitHub Pages pipeline; submit sitemap to Search Console

## M2 — Homepage content & structure revision (static stack)
- [ ] Gather Karl's specific content/positioning direction (collaborative)
- [ ] Ensure single strong H1 with target positioning
- [ ] Tighten section order/copy in `app/page.tsx`
- [ ] Add subscribe placeholder + CTA (wired for real in M4)
- [ ] Deploy on current pipeline

## M3 — Vercel migration (foundation for backend)
- [ ] Remove `output: 'export'` (and reconsider `images.unoptimized`) in `next.config.js`
- [ ] Create Vercel project; set env vars/secrets
- [ ] Re-point `karl-nguyen.com` DNS → Vercel; retire `.github/workflows/deploy.yml`
- [ ] Verify parity (all pages + blog render)

## M4 — Subscribe (managed newsletter)
- [ ] Confirm provider (recommended: Buttondown)
- [ ] `app/api/subscribe/route.ts` (server-side API key, validation, honeypot)
- [ ] Wire subscribe form component
- [ ] Point provider RSS-to-email at `public/rss.xml`

## M5 — Reader interaction
- [ ] Comments via Giscus (confirm vs custom DB)
- [ ] Reactions/claps + view counts via Upstash Redis (Vercel KV): `app/api/reactions/[slug]`, `app/api/views/[slug]`
- [ ] Social share buttons (static)
- [ ] "Most read" surface on `/blog`

## M6 — Polish
- [ ] Dynamic per-post OG images (`opengraph-image.tsx`)
- [ ] Analytics review

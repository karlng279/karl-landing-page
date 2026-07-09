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
- [x] Commit + push M0 to origin

## Bugfix — /blog was empty to non-JS crawlers (Claude/LLMs) ✅ SHIPPED
- [x] Root cause: `useSearchParams()` in `BlogClientPage` blanked the post list from static HTML (posts only in JS payload)
- [x] Fix: default filter to "all" + read `?category=` in a post-mount `useEffect`; remove `<Suspense>` wrapper
- [x] Verify: `out/blog.html` now has 11 post links in the DOM (was 0); titles in visible HTML
- [x] Deployed to main (2026-07-09); confirmed live: `curl https://karl-nguyen.com/blog` shows 11 post links in raw HTML

## M1 — SEO / LLM discoverability (static stack — no backend needed) ✅ SHIPPED
- [x] Fix `metadataBase` in `app/layout.tsx` → `https://karl-nguyen.com` (OG/canonical now absolute)
- [x] Add canonical URLs (`alternates.canonical`) to `/`, `/blog`, and each post
- [x] Add a default OG share image (`public/images/og-default.png`, 1200x630) at root
- [x] Add `app/sitemap.ts` (uses `getAllPosts` from `lib/posts.ts`)
- [x] Add `app/robots.ts` — allow all + sitemap + welcome GPTBot / ClaudeBot / Google-Extended / PerplexityBot / CCBot
- [x] Add JSON-LD: `Person` + `WebSite` on home; `BlogPosting` + `BreadcrumbList` on posts (`components/JsonLd.tsx`)
- [x] Add build-time RSS + llms.txt generator (`scripts/generate-feeds.mjs`, wired via `prebuild`) → `public/rss.xml`, `public/llms.txt` (gitignored, built in CI)
- [x] Verify: build → `out/` has sitemap/robots/rss/llms.txt; JSON-LD + absolute OG confirmed in HTML
- [x] Deployed to main (2026-07-09); live-verified robots.txt (GPTBot/ClaudeBot), sitemap.xml (13 URLs), llms.txt
- [ ] Submit sitemap to Google Search Console (manual, external)
- [ ] Validate JSON-LD in Google Rich Results Test; test share preview (LinkedIn/X) (manual, external)

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

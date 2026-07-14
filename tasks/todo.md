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

## Blog Restructure (spec: docs/specs/blog-restructure.md) ✅ SHIPPED (merged to main 2026-07-12)
- [x] Category taxonomy → 3 (shipping-logistics ×5, product-systems ×2, ai-in-operations ×4); old topics kept as tags
- [x] FIX-1 pinned/hero = shipment-visibility-gap (pm-using-ai-daily unpinned); not duplicated in grid
- [x] FIX-3 category filter: single-select chips + `?category=` deep-link (crawler-safe). (Multi-select removed per author feedback 2026-07-11.)
- [x] ADD-1 Start Here two-path module (server component). Placed ABOVE the header/filter; "See all" removed; typography matched to blog tokens; "Start Here" eyebrow removed
- [x] Start Here posts curated by explicit slug per path (author-picked, not auto-derived): A = shipment-visibility-gap / kpi-success-metrics / ai-adoption-shipping-ops; B = product-dev-lifecycle-logistics / document-management-ai-era / mvp-communication-gap
- [x] FIX-4 read-time computed at build (220 wpm) in lib/posts.ts; frontmatter numbers now ignored
- [x] FIX-7 end-of-post CTA → single peer-to-peer "/#connect" (LinkedIn author link removed)
- [x] FIX-5 per-post OG + FIX-6 sitemap — already shipped in M1; re-verified
- [x] Build + static-HTML verification passed (11 crawlable links, chips, module, honest read-times)
- [x] Author reviewed in browser + gave design feedback (single-select, typography, placement, curation) — all applied
- [x] Merged test/v2-foundation → main (2026-07-12); branch deleted local + origin
- [ ] Post-deploy: confirm live /blog + Search Console (manual)

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

## M2 — Homepage restructure (spec: docs/specs/homepage-restructure.md) — PO→PM reframe (branch: homepage-v2)
- [x] FIX-1/9 Delete "Open to Opportunities" banner (was `class="hidden"` → crawler-visible placeholder text) + all stale strings; removed `OpportunitiesBanner.tsx`
- [x] FIX-2 Hero: replaced hidden relocation badge with factual `📍 Boston, MA` pill (SVG map-pin, not emoji)
- [x] FIX-3 Global positioning "Technical Product Manager" → "Product Manager — Container Shipping & Logistics Systems" (layout meta/OG/Twitter, JSON-LD, Hero, blog byline, llms.txt generator, README)
- [x] FIX-4 Case-study metrics → single figures (no `X–Y%` ranges), per spec table
- [x] FIX-5 "How I Work" 8 → 6 stages (Strategy & Bets → … → Launch & Learn); subtitle reframed
- [x] FIX-6 Workflow CTA → live AI-Ready Product Workflow v2 (github.io)
- [x] FIX-7 "renders twice" — confirmed NOT a bug (desktop `hidden lg:block` + mobile `lg:hidden` responsive variants)
- [x] FIX-8 Removed ghost/cursor Three.js effect entirely (`GhostCursor.tsx` deleted); kept dot-grid + entrance fade. `three` now unused dep (optional uninstall)
- [x] FIX-10 Footer "My Work" (vxsolutions) link removed; case-study hrefs kept, link text/aria generic ("View case study →")
- [x] FIX-11/12 "Currently Building" genericized; dropped 2 SME domain bullets
- [x] FIX-13 Smart Profit + Smart Inventory demoted to subordinate "Side Projects" strip
- [x] ADD-1 Flagship "AI-Ready Product Workflow v2" card — bold-accent gradient ring + "Live · Open Source" badge + `PM Strategy → PO Pipeline → Design → Code → Validate` chain inside card + 2 links (no star counts). New `components/FlagshipProject.tsx`
- [x] ADD-2 "Writing" section auto-pulls 3 newest posts via `getAllPosts().slice(0,3)` (server component). New `components/WritingList.tsx`, matched to blog card tokens
- [x] Build + static-HTML verification passed (0 stale strings, 0 metric ranges, 6 stages, flagship links, 3 recent posts, llms.txt rebuilt)
- [x] Feedback (2026-07-13): Writing post cards + "Read all posts" open in a new tab (don't disrupt readers)
- [x] Feedback (2026-07-13): typography consistency pass across homepage + blog (see D12) — 190-usage audit; converged eyebrow recipe, card-title weight, blog heading scale tokens, body step, body color, `.btn-secondary`, footer scale; unified headings → bold(700) + accent → sky(primary); kept category colors + prose + Outfit family
- [ ] Author visual review in browser (design sign-off) — pending
- [ ] Merge homepage-v2 → main + deploy (per author direction)
- [ ] Post-deploy: `curl` grep for "Month, Year"/"Technical Product Manager" = 0 on live; re-check share preview

## M2b — subscribe placeholder (deferred to M4 when backend lands)
- [ ] Add subscribe placeholder + CTA (wired for real in M4)

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

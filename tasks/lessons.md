# Lessons & Patterns

Corrections received and recurring patterns, so the same mistake isn't repeated. Append a dated entry whenever the user corrects course or a non-obvious pattern emerges.

Format: `### YYYY-MM-DD — <short title>` then **Context**, **Lesson**, **How to apply**.

---

### 2026-07-11 — Match existing design tokens; don't over-build; respect requested placement
**Context:** New `/blog` "Start Here" module was flagged: (1) fonts didn't match the existing blog, (2) it was placed between the filter and the grid (poor UX — author wanted it at the top), (3) the multi-select filter I built (per spec) was unwanted/broken → reverted to single-select.
**Lesson:** (a) For new UI in an existing page, reuse the page's actual type scale/token classes (this blog overrides global headings with explicit sizes: `text-[28px]` h1, `text-[11px]` uppercase eyebrows, `text-base font-bold` card titles, `text-sm lg:text-base text-slate-500` body) instead of ad-hoc sizes. (b) Place new sections where the user says, even if a spec says otherwise — the live author overrides the spec. (c) Don't over-engineer (multi-select when single-select suffices); confirm scope before building complex interactions.
**How to apply:** Before styling new components, read `globals.css` + the neighboring components for the real tokens and match them. When a spec and later user feedback conflict, follow the feedback. Prefer the simplest interaction that meets the need.

### 2026-07-09 — `useSearchParams()` blanks static-export HTML for crawlers
**Context:** `/blog` appeared empty when shared with Claude / fetched without JS. Root cause: `BlogClientPage` used `useSearchParams()` (for `?category=` filters), which in `output: 'export'` excludes the whole subtree down to the nearest `<Suspense>` from the prerendered HTML. Posts existed only in the client-only `self.__next_f` RSC payload — invisible to LLMs/non-JS crawlers.
**Lesson:** In a static export, `useSearchParams()` (unlike `useRouter`/`usePathname`) makes content JS-only. Any content that must be crawlable has to render without depending on search params at prerender time.
**How to apply:** Default client-side filters to a full "all" view so the server render includes everything; read deep-link params from `window.location` in a `useEffect` after mount. Verify by grepping the built HTML for real `<a>`/content outside `<script>` (and load with JS disabled).

### 2026-07-09 — Backend requires abandoning GitHub Pages
**Context:** Site was a Next.js static export (`output: 'export'`) on GitHub Pages. User asked to "add a backend."
**Lesson:** GitHub Pages serves static files only — no API routes, DB, or email, ever. "Add a backend" is a hosting-architecture decision, not a bolt-on. SEO/LLM discoverability, however, is fully doable on the static stack.
**How to apply:** Separate work into "static-safe" (SEO, sitemap, JSON-LD, RSS, llms.txt) vs "needs-server" (subscribe, reactions, comments). Ship the static-safe bucket first; migrate hosting (→ Vercel) only for the server bucket.

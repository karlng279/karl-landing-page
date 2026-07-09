# Lessons & Patterns

Corrections received and recurring patterns, so the same mistake isn't repeated. Append a dated entry whenever the user corrects course or a non-obvious pattern emerges.

Format: `### YYYY-MM-DD — <short title>` then **Context**, **Lesson**, **How to apply**.

---

### 2026-07-09 — `useSearchParams()` blanks static-export HTML for crawlers
**Context:** `/blog` appeared empty when shared with Claude / fetched without JS. Root cause: `BlogClientPage` used `useSearchParams()` (for `?category=` filters), which in `output: 'export'` excludes the whole subtree down to the nearest `<Suspense>` from the prerendered HTML. Posts existed only in the client-only `self.__next_f` RSC payload — invisible to LLMs/non-JS crawlers.
**Lesson:** In a static export, `useSearchParams()` (unlike `useRouter`/`usePathname`) makes content JS-only. Any content that must be crawlable has to render without depending on search params at prerender time.
**How to apply:** Default client-side filters to a full "all" view so the server render includes everything; read deep-link params from `window.location` in a `useEffect` after mount. Verify by grepping the built HTML for real `<a>`/content outside `<script>` (and load with JS disabled).

### 2026-07-09 — Backend requires abandoning GitHub Pages
**Context:** Site was a Next.js static export (`output: 'export'`) on GitHub Pages. User asked to "add a backend."
**Lesson:** GitHub Pages serves static files only — no API routes, DB, or email, ever. "Add a backend" is a hosting-architecture decision, not a bolt-on. SEO/LLM discoverability, however, is fully doable on the static stack.
**How to apply:** Separate work into "static-safe" (SEO, sitemap, JSON-LD, RSS, llms.txt) vs "needs-server" (subscribe, reactions, comments). Ship the static-safe bucket first; migrate hosting (→ Vercel) only for the server bucket.

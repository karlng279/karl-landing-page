# Lessons & Patterns

Corrections received and recurring patterns, so the same mistake isn't repeated. Append a dated entry whenever the user corrects course or a non-obvious pattern emerges.

Format: `### YYYY-MM-DD — <short title>` then **Context**, **Lesson**, **How to apply**.

---

### 2026-07-09 — Backend requires abandoning GitHub Pages
**Context:** Site was a Next.js static export (`output: 'export'`) on GitHub Pages. User asked to "add a backend."
**Lesson:** GitHub Pages serves static files only — no API routes, DB, or email, ever. "Add a backend" is a hosting-architecture decision, not a bolt-on. SEO/LLM discoverability, however, is fully doable on the static stack.
**How to apply:** Separate work into "static-safe" (SEO, sitemap, JSON-LD, RSS, llms.txt) vs "needs-server" (subscribe, reactions, comments). Ship the static-safe bucket first; migrate hosting (→ Vercel) only for the server bucket.

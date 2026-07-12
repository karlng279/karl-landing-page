# Blog Restructure — Implementation Spec (v4 — FINAL)

**Target site:** `karl-nguyen.com` (Next.js App Router, Tailwind CSS, MDX/markdown blog posts with frontmatter).
**Scope:** The `/blog` index page and individual `/blog/[slug]` post pages **only**.
**Explicitly out of scope:** The homepage / About page (`/`). Do **not** modify it — separate phase.

---

## 0. Guiding principle (read before making judgment calls)

This blog positions the author as a **container-shipping domain expert who builds product**, not as a generic "AI PM." When a micro-decision isn't specified below, favor: (1) surfacing shipping/logistics domain posts over generic AI-workflow posts, (2) making the page welcoming to industry peers rather than obviously job-seeking, (3) understated/professional over salesy.

**Do NOT rewrite the prose or voice of any existing post.** Content edits are the author's job. Your job is structure, metadata, filtering, and new UI components.

**Design bias:** prefer solutions that **auto-populate from post metadata** over hardcoded lists. The author publishes regularly; the page must stay correct without manual curation.

---

## 1. Orientation — locate these first

Before changing anything, find and confirm:
- Blog post source files (likely `.md`/`.mdx` with frontmatter, in `content/`, `posts/`, or `app/blog/**`).
- The current frontmatter schema (`title`, `date`, `excerpt`, `category`, `tags`, `coverImage`, `readTime`, `pinned`/`featured`).
- The `/blog` index component (hero/pinned card + grid + category filter buttons).
- The current filter implementation — it is **single-select** today and must become **multi-select** (see FIX-3).
- The `/blog/[slug]` post template and its `generateMetadata` (or equivalent).
- The read-time calculation (hardcoded in frontmatter vs. computed at build).
- The existing end-of-post CTA / signature block component.

**Report the actual schema and file locations back to the author before implementing** if they differ materially from the assumptions here.

---

## 2. FIX tasks (modify existing behavior)

### FIX-1 — Change the pinned post (sorting stays as-is)
**Current:** `pm-using-ai-daily` ("From PRD to Production…") is the pinned/hero post.

**Required:**
- Pin **`shipment-visibility-gap`** ("The Shipment Visibility Gap…") as the hero/featured post.
- Remove the pinned/hero treatment and "Pinned" badge from `pm-using-ai-daily`; it returns to the normal grid.
- Exactly **one** post has `pinned: true` at any time.
- The pinned post appears **only** in the hero slot — do **not** duplicate it in the grid below.

**Sorting — keep current behavior. Do NOT add any custom or multi-layer ordering:**
- Hero slot = the single `pinned` post.
- Grid = all remaining posts sorted by `date` **descending (newest first)**.
- This applies to both the unfiltered view and all filtered views.
- Do **not** implement category-priority sorting, `featuredOrder`, or any manual sort weighting.

**Acceptance criteria:**
- `/blog` hero card = "The Shipment Visibility Gap".
- No AI-workflow post occupies the hero slot.
- Grid is strictly newest-first in every view.
- Exactly one post has `pinned: true`; it is not duplicated in the grid.

---

### FIX-2 — Collapse the taxonomy to three primary categories
**Current filters:** `Product`, `Management`, `AI Adoption`, `Container Shipping` (mixes function + domain axes — incoherent).

**Required category set (replaces all existing categories):**

| Display label | Slug (URL value) |
|---|---|
| Shipping & Logistics | `shipping-logistics` |
| Product & Systems | `product-systems` |
| AI in Operations | `ai-in-operations` |

- Each post gets **exactly one** `category` from that set (see mapping in §4).
- Existing per-post topic labels become `tags` (secondary metadata, not filter controls). Preserve them.
- Update the category badge label + color mapping to the three new categories. Keep three visually distinct colors.

**Acceptance criteria:**
- Exactly 3 categories (+ "All" control).
- Every post resolves to one of the 3 categories.
- Filtering by each category returns the posts listed in §4.

---

### FIX-3 — Rebuild the category filter as MULTI-SELECT (currently single-select)
**Current:** filter buttons are single-select — only one category can be active at a time.

**Required:** a **multi-select** filter supporting one or more active categories simultaneously. This is a **hard dependency for ADD-1**, where each reading path spans two categories.

**Filter semantics:**
- **OR logic:** a post is shown if its `category` matches **any** active filter. (Each post has exactly one category, so OR = union of the selected buckets.)
- Filter buttons behave as **toggle chips**: clicking an inactive chip adds it; clicking an active chip removes it.
- **"All"** is a reset control: clicking it clears all active category chips and shows every post.
- If **zero** chips are active → behave exactly as "All" (show everything); "All" renders in its active state.
- If **all three** chips are active → show everything; the result set must equal the full list.
- Active chips must be visually distinct (filled/bordered) from inactive chips. Multiple chips can be active at once.

**URL state (deep-linkable — required for ADD-1's "See all" links):**
- Active categories serialize to a single **comma-separated** query param:
  - One category: `/blog?category=shipping-logistics`
  - Multiple: `/blog?category=shipping-logistics,ai-in-operations`
- On page load, parse `?category=`, split on comma, validate each slug against the known set, apply all valid slugs as active filters.
- Ignore unknown/invalid slugs. If **no** valid slug remains → fall back to "All".
- Toggling chips updates the URL via **shallow routing** (no full page reload). Clearing all chips ("All") removes the `category` param entirely.
- Browser back/forward restores the corresponding filter state.

**Result count:** update the post-count label (currently "11 posts") to reflect the **filtered** result count.

**Empty state:** if a filter combination yields zero posts, render a short message (e.g. "No posts in this category yet.") rather than an empty grid.

**Sorting within filtered results:** `date` descending (per FIX-1). No other ordering.

**Acceptance criteria:**
- Two or more chips can be active simultaneously; the grid shows the union of their posts.
- `/blog?category=shipping-logistics,ai-in-operations` loads with **both** chips active and both categories' posts shown.
- Clicking "All" clears all chips and removes the `category` param from the URL.
- Post count reflects the filtered set.
- Back/forward navigation restores filter state.
- Filtered results are sorted newest-first.

---

### FIX-4 — Recompute honest read-times
- Compute read time from post body word count at **220 words/minute**, rounded to nearest minute, minimum 1.
- Exclude markdown syntax, HTML tags, and code blocks from the count.
- If `readTime` is hardcoded in frontmatter today, either replace it with the computed value or correct the stored numbers to match the formula.

**Acceptance criteria:** displayed read time per post is within ~1 minute of `wordCount / 220`; no post over-reports (e.g. a ~1,200-word post shows ~5 min, not 10).

---

### FIX-5 — Per-post social/SEO metadata (distribution fix — HIGH PRIORITY)
**Problem:** The `/blog` index reuses the homepage `twitter:title`, and social images appear to default site-wide. If posts inherit this, every shared post link previews identically on LinkedIn — killing click-through.

**Required:** each `/blog/[slug]` page emits its **own** metadata via `generateMetadata` (or equivalent):
- `title` = post title
- `description` / `og:description` / `twitter:description` = post excerpt
- `og:title` / `twitter:title` = post title
- `og:image` / `twitter:image` = that post's cover, as an **absolute** URL (`https://karl-nguyen.com/images/blog/<slug>/cover.webp`)
- `twitter:card` = `summary_large_image`
- `canonical` = `https://karl-nguyen.com/blog/<slug>`
- `og:type` = `article`

**Acceptance criteria:** view-source on two sample posts shows post-specific `og:title` and `og:image` pointing to that post's own cover; an OpenGraph/LinkedIn preview renders that post's title + cover (not the generic homepage card).

---

### FIX-6 — Sitemap coverage
- Ensure every `/blog/[slug]` (current + future) appears in `sitemap.xml` with a `lastmod`.

**Acceptance criteria:** `sitemap.xml` lists every published blog post URL.

---

### FIX-7 — Revise the existing end-of-post CTA (do NOT add a second one)
**Current:** posts already end with a CTA / signature block (name + title + "Connect"). This is a **revision**, not an addition.

**Required:**
- Tone: peer-to-peer, not recruiter-facing. **No job-seeking language.**
- One sentence + a link to `/#connect`.
- Suggested copy (author may tweak):
  > *Working on similar problems in shipping or logistics product? [Let's connect.](/#connect)*
- Keep the existing name/title signature only if it reads cleanly alongside this. Goal: one clear call to action, not a stacked wall of sign-offs.

**Acceptance criteria:** every post ends with exactly **one** CTA linking to `/#connect`; no duplicate connect blocks.

---

## 3. ADD tasks (new components)

### ADD-1 — "Start Here" two-path module on `/blog` (category-driven, auto-populating)
Add a module at the top of `/blog`, directly under the page header ("All Posts" / post count) and **above** the post grid.

**Structure:**
- A short intro line (copy below).
- Two cards side-by-side on desktop (Path A left, Path B right); stacked on mobile.
- Each card contains: heading, a 2–3 sentence intro, an **auto-generated list of the 3 most recent posts** from that path's mapped categories, and a "See all →" link to the corresponding multi-category filtered view.
- **Do not hardcode post titles.** Lists derive from post metadata so they self-maintain as new posts publish.
- Style: consistent with existing blog cards; understated, not a banner ad.

**Path → category mapping (depends on FIX-3 multi-select):**

| Path | Mapped categories | "See all →" link |
|---|---|---|
| A — shipping & logistics readers | `shipping-logistics` **+** `ai-in-operations` | `/blog?category=shipping-logistics,ai-in-operations` |
| B — product & software readers | `product-systems` **+** `ai-in-operations` | `/blog?category=product-systems,ai-in-operations` |

> `ai-in-operations` is intentionally shared by **both** paths — it is the bridge category serving both audiences. Do **not** assign it exclusively to one path.

**List generation rule per card:** take all posts whose `category` is in that path's mapped categories → sort by `date` descending → display the top 3 as linked titles. (The pinned post is eligible and may appear here.)

**Exact copy — module intro:**
> **New here? Two ways in.**
> Field notes from inside container-shipping product work — where operations, documentation, and software actually collide. Pick the door that fits you.

**Exact copy — Path A card heading + intro:**
> **You work in shipping & logistics**
> You already live this: SI cutoffs, rolled containers, B/L control, and the quiet phone calls that keep everyone aligned when the systems drift apart. These are the posts about what really happens between booking and cargo release — and where software earns its place or gets in the way.

**Exact copy — Path B card heading + intro:**
> **You build products or software**
> Container shipping is about as constraint-heavy as a domain gets: compliance rules, tangled system dependencies, and edge cases that quietly explode at scale. These are the posts about turning that mess into systems that hold — and about where AI genuinely speeds the work versus where it just produces confident nonsense.

**Acceptance criteria:**
- Module renders above the grid with both cards.
- Each card lists 3 auto-derived, working post links.
- Each "See all →" link loads `/blog` with **both** of that path's category chips active and the union of posts displayed.
- Publishing a new post in a mapped category updates the cards automatically, with **no code or copy changes required**.
- Responsive: 2 columns desktop, stacked mobile.

---

## 4. Category mapping (source of truth)

| Slug | Primary `category` | → Path A | → Path B |
|---|---|---|---|
| `shipment-visibility-gap` *(pinned — hero only)* | Shipping & Logistics | ✓ | |
| `bl-vs-seaway-bill-when-to-use-what` | Shipping & Logistics | ✓ | |
| `product-dev-lifecycle-logistics` | Shipping & Logistics | ✓ | |
| `kpi-success-metrics-container-shipping` | Shipping & Logistics | ✓ | |
| `stakeholder-management-container-shipping` | Shipping & Logistics | ✓ | |
| `mvp-communication-gap` | Product & Systems | | ✓ |
| `document-management-ai-era` | Product & Systems | | ✓ |
| `pm-using-ai-daily` | AI in Operations | ✓ | ✓ |
| `ai-adoption-shipping-ops` | AI in Operations | ✓ | ✓ |
| `structured-data-before-ai` | AI in Operations | ✓ | ✓ |
| `ai-adoption-terms-dummies` | AI in Operations | ✓ | ✓ |

> Path membership is **derived from `category`** — it is not a field to hardcode per post. The ✓ columns show expected output, not stored data.

> **New posts (June/July drafts and beyond):** the author assigns one `category` from the three above; path membership follows automatically. Default new shipping-domain deep-dives to **Shipping & Logistics**.

---

## 5. Final desired state of `/blog`

1. **"Start Here" two-path module** (auto-populating) at the top.
2. **Hero:** `shipment-visibility-gap` (pinned, not repeated in the grid).
3. **Grid:** all other posts, **newest first by date**, in every view. No manual or category-priority ordering.
4. **Filters:** multi-select chips — All / Shipping & Logistics / Product & Systems / AI in Operations — deep-linkable via comma-separated `?category=`.

---

## 6. Out of scope — do NOT do these

- Do **not** edit the homepage / About page (`/`) or its components. Separate phase.
- Do **not** rewrite, condense, or re-tone the prose inside any post. Author-owned.
- Do **not** delete any post.
- Do **not** implement a "bottom-line takeaway" callout (deferred by the author).
- Do **not** implement category-priority / multi-layer sorting, `featuredOrder`, or any manual sort weighting — sorting is **date descending only**.
- Do **not** build a "Recommended | Latest" sort toggle.
- Do **not** add a second end-of-post CTA — FIX-7 revises the existing one.

---

## 7. Final acceptance checklist

- [ ] Hero = Shipment Visibility Gap; AI-workflow post no longer pinned; hero not duplicated in grid.
- [ ] Grid sorted strictly newest-first in all views; no ordering fields or tier logic introduced.
- [ ] Exactly 3 categories (+All): Shipping & Logistics, Product & Systems, AI in Operations; old labels preserved as tags.
- [ ] Filter is **multi-select** with OR logic; 2+ chips can be active at once.
- [ ] `?category=` accepts comma-separated slugs; `/blog?category=shipping-logistics,ai-in-operations` loads with both chips active.
- [ ] "All" resets chips and strips the `category` param; back/forward restores state.
- [ ] Post count reflects filtered results; empty state handled.
- [ ] Read-times recomputed at 220 wpm.
- [ ] Each post page emits unique `og:title` + `og:image` (its own cover); preview verified on 2 posts.
- [ ] All posts in `sitemap.xml`.
- [ ] "Start Here" module live above the grid; lists auto-derive; both "See all →" links load multi-category filtered views; responsive.
- [ ] `AI in Operations` appears in **both** paths.
- [ ] End-of-post CTA revised (not duplicated), links to `/#connect`.
- [ ] Homepage untouched.

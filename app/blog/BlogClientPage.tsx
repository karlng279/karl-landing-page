"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostMeta, Category } from "@/lib/posts";
import Connect from "@/components/Connect";

export const CAT_CONFIG: Record<Category, { label: string; color: string; bg: string }> = {
  "shipping-logistics": {
    label: "Shipping & Logistics",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.1)",
  },
  "product-systems": {
    label: "Product & Systems",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.1)",
  },
  "ai-in-operations": {
    label: "AI in Operations",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.1)",
  },
};

const CATEGORY_SLUGS: Category[] = [
  "shipping-logistics",
  "product-systems",
  "ai-in-operations",
];

const ALL_COLOR = "#334155"; // slate-700, neutral (distinct from the 3 category colors)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({ post, featured = false, pinned = false }: { post: PostMeta; featured?: boolean; pinned?: boolean }) {
  const cat = CAT_CONFIG[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/30 ${
        featured ? "md:flex" : "flex flex-col"
      }`}
      style={{ boxShadow: "0 2px 16px rgba(100,100,140,0.08)" }}
    >
      {/* Thumbnail */}
      <div
        className={`flex-shrink-0 overflow-hidden ${featured ? "md:w-[320px]" : "w-full"}`}
        style={{ minHeight: featured ? 240 : 156, height: featured ? undefined : 156 }}
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            style={{ minHeight: featured ? 240 : 156 }}
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center flex-col gap-1.5"
            style={{
              minHeight: featured ? 240 : 156,
              background:
                "repeating-linear-gradient(-45deg,#f1f5f9,#f1f5f9 2px,#f8fafc 2px,#f8fafc 18px)",
            }}
          >
            <div className="w-8 h-8 rounded-lg opacity-25" style={{ background: cat.color }} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              cover image
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        className={`flex flex-col gap-2.5 flex-1 ${
          featured ? "p-7 md:p-8 justify-center" : "p-5 pt-4"
        }`}
      >
        {pinned && (
          <span className="inline-flex items-center gap-1 self-start text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
            Pinned
          </span>
        )}
        <span
          className="inline-flex items-center gap-1.5 self-start px-2.5 py-[3px] rounded-full text-[11px] font-semibold tracking-wide"
          style={{ background: cat.bg, color: cat.color }}
        >
          {cat.label}
        </span>

        <h2
          className={`font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors ${
            featured ? "text-xl md:text-[22px]" : "text-base"
          }`}
        >
          {post.title}
        </h2>

        <p
          className={`text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center flex-wrap gap-2 mt-1 text-xs lg:text-sm text-slate-400 dark:text-slate-500">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-slate-100 dark:bg-slate-800">
        🗂️
      </div>
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
        No posts in this category yet
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
        Nothing matches the current filter. Try another category or browse everything.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 transition-colors cursor-pointer"
      >
        Browse all posts
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Parse + validate the comma-separated ?category= param into a set of known slugs.
function parseCategoriesFromUrl(): Set<Category> {
  const raw = new URLSearchParams(window.location.search).get("category");
  if (!raw) return new Set();
  const valid = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is Category => (CATEGORY_SLUGS as string[]).includes(s));
  return new Set(valid);
}

export default function BlogClientPage({
  posts,
  startHere,
}: {
  posts: PostMeta[];
  startHere?: React.ReactNode;
}) {
  // Empty set = "All". Default empty so the full list is prerendered into the
  // static HTML (crawlable). We deliberately avoid useSearchParams(), which
  // would exclude this subtree from the static export.
  const [active, setActive] = useState<Set<Category>>(new Set());

  // Restore ?category= on mount and on back/forward — without blanking the HTML.
  useEffect(() => {
    setActive(parseCategoriesFromUrl());
    const onPop = () => setActive(parseCategoriesFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Update state + URL via shallow history (no reload). Empty set strips the param.
  const applyActive = (next: Set<Category>) => {
    setActive(next);
    const params = new URLSearchParams(window.location.search);
    if (next.size === 0) {
      params.delete("category");
    } else {
      params.set("category", CATEGORY_SLUGS.filter((c) => next.has(c)).join(","));
    }
    const qs = params.toString();
    window.history.pushState(null, "", qs ? `/blog?${qs}` : "/blog");
  };

  const toggleCategory = (cat: Category) => {
    const next = new Set(active);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    applyActive(next);
  };

  const isAll = active.size === 0;
  const filtered = isAll ? posts : posts.filter((p) => active.has(p.category));
  const pinnedPost = isAll ? filtered.find((p) => p.pinned) : undefined;
  const featured = pinnedPost ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  const heading = isAll
    ? "All Posts"
    : active.size === 1
    ? CAT_CONFIG[[...active][0]].label
    : "Filtered Posts";

  return (
    <>
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Page header row */}
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-1.5">
                {filtered.length} post{filtered.length !== 1 ? "s" : ""}
              </p>
              <h1 className="text-[28px] font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-50">
                {heading}
              </h1>
            </div>

            {/* Multi-select filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* "All" reset chip — active only when no category is selected */}
              <button
                onClick={() => applyActive(new Set())}
                aria-pressed={isAll}
                className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 outline-none cursor-pointer"
                style={{
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  borderColor: isAll ? ALL_COLOR : "rgba(148,163,184,0.4)",
                  background: isAll ? `${ALL_COLOR}18` : "transparent",
                  color: isAll ? ALL_COLOR : "#64748b",
                }}
              >
                All
              </button>
              {CATEGORY_SLUGS.map((slug) => {
                const on = active.has(slug);
                const color = CAT_CONFIG[slug].color;
                return (
                  <button
                    key={slug}
                    onClick={() => toggleCategory(slug)}
                    aria-pressed={on}
                    className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 outline-none cursor-pointer"
                    style={{
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                      borderColor: on ? color : "rgba(148,163,184,0.4)",
                      background: on ? `${color}18` : "transparent",
                      color: on ? color : "#64748b",
                    }}
                  >
                    {CAT_CONFIG[slug].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Here module (server-rendered, above the grid) */}
          {startHere}

          {/* Posts or empty state */}
          {filtered.length === 0 ? (
            <EmptyState onReset={() => applyActive(new Set())} />
          ) : (
            <>
              {featured && (
                <div className="mb-8">
                  <BlogCard post={featured} featured pinned={!!pinnedPost} />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Connect />
    </>
  );
}

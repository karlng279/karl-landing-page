"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { PostMeta, Category } from "@/lib/posts";
import Connect from "@/components/Connect";

export const CAT_CONFIG: Record<
  Category,
  { label: string; color: string; bg: string; emptyIcon: string; emptyHint: string }
> = {
  product: {
    label: "Product",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.1)",
    emptyIcon: "📦",
    emptyHint: "Product strategy, roadmaps, and decision-making frameworks.",
  },
  management: {
    label: "Management",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.1)",
    emptyIcon: "🗂️",
    emptyHint: "Team leadership, processes, and organizational learnings.",
  },
  "ai-adoption": {
    label: "AI Adoption",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.1)",
    emptyIcon: "🤖",
    emptyHint: "AI in logistics ops — where it helps and where it still hypes.",
  },
  "container-shipping": {
    label: "Container Shipping",
    color: "#db2777",
    bg: "rgba(219,39,119,0.1)",
    emptyIcon: "🚢",
    emptyHint:
      "Booking flows, documentation, visibility, and trade-lane insights.",
  },
};

const FILTER_ORDER: Array<"all" | Category> = [
  "all",
  "product",
  "management",
  "ai-adoption",
  "container-shipping",
];

const FILTER_LABELS: Record<string, string> = {
  all: "All",
  product: "Product",
  management: "Management",
  "ai-adoption": "AI Adoption",
  "container-shipping": "Container Shipping",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
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
          className={`text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center flex-wrap gap-2 mt-1 text-xs text-slate-400 dark:text-slate-500">
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

function EmptyState({ category, onReset }: { category: Category; onReset: () => void }) {
  const cat = CAT_CONFIG[category];
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Icon bubble */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
        style={{ background: cat.bg }}
      >
        {cat.emptyIcon}
      </div>

      {/* Heading */}
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
        No{" "}
        <span style={{ color: cat.color }}>{cat.label}</span> posts yet
      </h2>

      {/* Hint */}
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
        {cat.emptyHint}
      </p>

      {/* Divider with label */}
      <div className="flex items-center gap-3 w-full max-w-xs mb-6">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          in the meantime
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* CTA */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer"
        style={{ color: cat.color }}
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

type Filter = "all" | Category;

export default function BlogClientPage({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = (): Filter => {
    const cat = searchParams.get("category");
    if (cat && (FILTER_ORDER as string[]).includes(cat)) return cat as Filter;
    return "all";
  };

  const [filter, setFilter] = useState<Filter>(initialFilter);

  const applyFilter = (id: Filter) => {
    setFilter(id);
    router.replace(id === "all" ? "/blog" : `/blog?category=${id}`, { scroll: false });
  };

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

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
                {filter === "all"
                  ? "All Posts"
                  : CAT_CONFIG[filter as Category]?.label ?? filter}
              </h1>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTER_ORDER.map((id) => {
                const active = filter === id;
                const catColor =
                  id !== "all" ? CAT_CONFIG[id as Category].color : "#7c3aed";
                return (
                  <button
                    key={id}
                    onClick={() => applyFilter(id)}
                    className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 outline-none cursor-pointer"
                    style={{
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                      borderColor: active ? catColor : "rgba(148,163,184,0.4)",
                      background: active ? `${catColor}18` : "transparent",
                      color: active ? catColor : "#64748b",
                    }}
                  >
                    {FILTER_LABELS[id]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Posts or empty state */}
          {filtered.length === 0 ? (
            <EmptyState category={filter as Category} onReset={() => applyFilter("all")} />
          ) : (
            <>
              {featured && (
                <div className="mb-8">
                  <BlogCard post={featured} featured />
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

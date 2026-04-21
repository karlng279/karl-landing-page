"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta, Category } from "@/lib/posts";
import Connect from "@/components/Connect";

const CAT_CONFIG: Record<Category, { label: string; color: string; bg: string; border: string }> = {
  "container-shipping": {
    label: "Container Shipping",
    color: "#0e7490",
    bg: "rgba(14,116,144,0.1)",
    border: "#0e7490",
  },
  "ai-adoption": {
    label: "AI Adoption",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.1)",
    border: "#c026d3",
  },
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
      {/* Thumbnail placeholder */}
      <div
        className={`flex-shrink-0 ${featured ? "md:w-[320px]" : "w-full"}`}
        style={{ height: featured ? undefined : 156 }}
      >
        <div
          className="h-full w-full relative flex items-center justify-center flex-col gap-1.5"
          style={{
            minHeight: featured ? 240 : 156,
            background: "repeating-linear-gradient(-45deg,#f1f5f9,#f1f5f9 2px,#f8fafc 2px,#f8fafc 18px)",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg opacity-25"
            style={{ background: cat.color }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            cover image
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        className={`flex flex-col gap-2.5 flex-1 ${featured ? "p-7 md:p-8 justify-center" : "p-5 pt-4"}`}
      >
        {/* Category tag */}
        <span
          className="inline-flex items-center gap-1.5 self-start px-2.5 py-[3px] rounded-full text-[11px] font-semibold tracking-wide"
          style={{ background: cat.bg, color: cat.color }}
        >
          {cat.label}
        </span>

        {/* Title */}
        <h2
          className={`font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors ${
            featured ? "text-xl md:text-[22px]" : "text-base"
          }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className={`text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
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

type Filter = "all" | Category;

export default function BlogClientPage({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const filterButtons: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "container-shipping", label: "Container Shipping" },
    { id: "ai-adoption", label: "AI Adoption" },
  ];

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
              {filterButtons.map(({ id, label }) => {
                const active = filter === id;
                const catColor =
                  id !== "all" ? CAT_CONFIG[id as Category].color : "#7c3aed";
                return (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 outline-none"
                    style={{
                      border: `1.5px solid ${active ? catColor : ""}`,
                      borderColor: active
                        ? catColor
                        : "rgba(148,163,184,0.4)",
                      background: active
                        ? `${catColor}18`
                        : "transparent",
                      color: active
                        ? catColor
                        : "var(--tw-prose-body, #64748b)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured post */}
          {featured && (
            <div className="mb-8">
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Card grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400 dark:text-slate-500 text-[15px]">
              No posts yet in this category.
            </div>
          )}
        </div>
      </main>

      <Connect />
    </>
  );
}

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

// Matches the blog card date format (app/blog/BlogClientPage.tsx).
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Homepage "Writing" strip — auto-pulls the most recent posts (passed in from the
// server page). Server component → crawlable, and styled to match the /blog cards.
export default function WritingList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-2">
              {formatDate(post.date)} · {post.readTime} min read
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors mb-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Read all posts
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

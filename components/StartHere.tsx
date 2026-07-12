import Link from "next/link";
import type { PostMeta, Category } from "@/lib/posts";

// "Start Here" two-path module (ADD-1). Server-rendered and auto-populating:
// each card lists the 3 most-recent posts in its mapped categories, derived
// from post metadata (no hardcoded titles). `ai-in-operations` is the bridge
// category shared by both paths. `posts` arrives already sorted date-desc.
const PATHS: {
  key: string;
  heading: string;
  intro: string;
  categories: Category[];
  seeAll: string;
}[] = [
  {
    key: "a",
    heading: "You work in shipping & logistics",
    intro:
      "You already live this: SI cutoffs, rolled containers, B/L control, and the quiet phone calls that keep everyone aligned when the systems drift apart. These are the posts about what really happens between booking and cargo release — and where software earns its place or gets in the way.",
    categories: ["shipping-logistics", "ai-in-operations"],
    seeAll: "/blog?category=shipping-logistics,ai-in-operations",
  },
  {
    key: "b",
    heading: "You build products or software",
    intro:
      "Container shipping is about as constraint-heavy as a domain gets: compliance rules, tangled system dependencies, and edge cases that quietly explode at scale. These are the posts about turning that mess into systems that hold — and about where AI genuinely speeds the work versus where it just produces confident nonsense.",
    categories: ["product-systems", "ai-in-operations"],
    seeAll: "/blog?category=product-systems,ai-in-operations",
  },
];

export default function StartHere({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          New here? Two ways in.
        </h2>
        <p className="mt-1 text-sm lg:text-base text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Field notes from inside container-shipping product work — where operations,
          documentation, and software actually collide. Pick the door that fits you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {PATHS.map((path) => {
          const top3 = posts
            .filter((p) => path.categories.includes(p.category))
            .slice(0, 3);
          return (
            <div
              key={path.key}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 p-6"
              style={{ boxShadow: "0 2px 16px rgba(100,100,140,0.08)" }}
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                {path.heading}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {path.intro}
              </p>

              <ul className="mt-4 space-y-2 flex-1">
                {top3.map((p) => (
                  <li key={p.slug} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#94a3b8" }}
                    />
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-violet-700 dark:hover:text-violet-400 transition-colors no-underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={path.seeAll}
                className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-2.5 transition-all no-underline"
              >
                See all
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

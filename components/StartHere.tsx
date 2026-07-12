import Link from "next/link";
import type { PostMeta, Category } from "@/lib/posts";

// "Start Here" two-path module (ADD-1). Server-rendered and auto-populating:
// each card lists the 3 most-recent posts in its mapped categories, derived
// from post metadata (no hardcoded titles). `ai-in-operations` is the bridge
// category shared by both paths. `posts` arrives already sorted date-desc.
const PATHS: { key: string; heading: string; intro: string; categories: Category[] }[] = [
  {
    key: "a",
    heading: "You work in shipping & logistics",
    intro:
      "You already live this: SI cutoffs, rolled containers, B/L control, and the quiet phone calls that keep everyone aligned when the systems drift apart. These are the posts about what really happens between booking and cargo release — and where software earns its place or gets in the way.",
    categories: ["shipping-logistics", "ai-in-operations"],
  },
  {
    key: "b",
    heading: "You build products or software",
    intro:
      "Container shipping is about as constraint-heavy as a domain gets: compliance rules, tangled system dependencies, and edge cases that quietly explode at scale. These are the posts about turning that mess into systems that hold — and about where AI genuinely speeds the work versus where it just produces confident nonsense.",
    categories: ["product-systems", "ai-in-operations"],
  },
];

export default function StartHere({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="mb-14">
      {/* Section header — matches the blog's eyebrow + heading scale */}
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-1.5">
        Start Here
      </p>
      <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-50">
        New here? Two ways in.
      </h2>
      <p className="mt-2 max-w-2xl text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
        Field notes from inside container-shipping product work — where operations,
        documentation, and software actually collide. Pick the door that fits you.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {PATHS.map((path) => {
          const top3 = posts
            .filter((p) => path.categories.includes(p.category))
            .slice(0, 3);
          return (
            <div
              key={path.key}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 p-6 lg:p-7"
              style={{ boxShadow: "0 2px 16px rgba(100,100,140,0.08)" }}
            >
              <h3 className="text-base lg:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {path.heading}
              </h3>
              <p className="mt-2 text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                {path.intro}
              </p>

              <ul className="mt-5 space-y-2.5">
                {top3.map((p) => (
                  <li key={p.slug} className="flex items-start gap-2.5">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 rounded-full flex-shrink-0 bg-slate-300 dark:bg-slate-600"
                      aria-hidden
                    />
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm lg:text-base font-medium text-slate-700 dark:text-slate-200 hover:text-violet-700 dark:hover:text-violet-400 transition-colors no-underline leading-snug"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

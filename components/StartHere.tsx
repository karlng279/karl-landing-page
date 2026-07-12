import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

// "Start Here" two-path module (ADD-1). Server-rendered. Each card shows a
// hand-curated set of posts (by slug, in the given order) — the author picks
// which pieces best represent each reader path. To change what appears, edit
// the `slugs` lists below. Unknown/unpublished slugs are skipped safely.
const PATHS: { key: string; heading: string; intro: string; slugs: string[] }[] = [
  {
    key: "a",
    heading: "You work in shipping & logistics",
    intro:
      "You already live this: SI cutoffs, rolled containers, B/L control, and the quiet phone calls that keep everyone aligned when the systems drift apart. These are the posts about what really happens between booking and cargo release — and where software earns its place or gets in the way.",
    slugs: [
      "shipment-visibility-gap",
      "kpi-success-metrics-container-shipping",
      "ai-adoption-shipping-ops",
    ],
  },
  {
    key: "b",
    heading: "You build products or software",
    intro:
      "Container shipping is about as constraint-heavy as a domain gets: compliance rules, tangled system dependencies, and edge cases that quietly explode at scale. These are the posts about turning that mess into systems that hold — and about where AI genuinely speeds the work versus where it just produces confident nonsense.",
    slugs: [
      "product-dev-lifecycle-logistics",
      "document-management-ai-era",
      "mvp-communication-gap",
    ],
  },
];

export default function StartHere({ posts }: { posts: PostMeta[] }) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
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
          const items = path.slugs
            .map((slug) => bySlug.get(slug))
            .filter((p): p is PostMeta => Boolean(p));
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
                {items.map((p) => (
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

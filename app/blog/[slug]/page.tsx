import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { marked } from "marked";
import Header from "@/components/Header";
import Connect from "@/components/Connect";
import { getPost, getAllSlugs, type Category } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Karl Nguyen`,
    description: post.excerpt,
  };
}

const CAT_CONFIG: Record<Category, { label: string; color: string; bg: string }> = {
  "container-shipping": {
    label: "Container Shipping",
    color: "#0e7490",
    bg: "rgba(14,116,144,0.1)",
  },
  "ai-adoption": {
    label: "AI Adoption",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.1)",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const cat = CAT_CONFIG[post.category];
  const htmlContent = marked(post.content) as string;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-8 no-underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>

          {/* Category tag */}
          <span
            className="inline-flex items-center self-start px-2.5 py-[3px] rounded-full text-[11px] font-semibold tracking-wide mb-4"
            style={{ background: cat.bg, color: cat.color }}
          >
            {cat.label}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-50 mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-8">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-xs text-slate-500 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div
            className="h-0.5 w-12 rounded mb-10"
            style={{
              background: `linear-gradient(90deg, ${cat.color}, transparent)`,
            }}
          />

          {/* Post content */}
          <article
            className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-200 max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Author card */}
          <div className="mt-14 p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logos/kn-logo-1-1.svg"
                alt="Karl Nguyen"
                width={44}
                height={44}
                className="rounded-xl flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50 text-sm">Karl Nguyen</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Technical Product Manager · Container Shipping & AI
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/huynhnq94/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
              >
                Connect
              </a>
            </div>
          </div>
        </div>
      </main>
      <Connect />
    </>
  );
}

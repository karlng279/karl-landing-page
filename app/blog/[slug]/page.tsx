import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { marked } from "marked";
import Header from "@/components/Header";
import Connect from "@/components/Connect";
import { getPost, getAllSlugs, type Category } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

const SITE_URL = "https://karl-nguyen.com";

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
  const url = `/blog/${post.slug}`;
  const images = post.image ? [post.image] : ["/images/og-default.png"];
  return {
    title: `${post.title} — Karl Nguyen`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["Karl Nguyen"],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

const CAT_CONFIG: Record<Category, { label: string; color: string; bg: string }> = {
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
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Karl Nguyen", url: SITE_URL },
    publisher: { "@type": "Person", name: "Karl Nguyen", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: post.tags.join(", "),
    articleSection: cat.label,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.label,
        item: `${SITE_URL}/blog?category=${post.category}`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8 flex-wrap">
            <Link
              href="/blog"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors no-underline"
            >
              All Posts
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/blog?category=${post.category}`}
              className="transition-colors no-underline font-medium"
              style={{ color: cat.color }}
            >
              {cat.label}
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-[260px]">{post.title}</span>
          </nav>

          {/* Hero image */}
          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200/60 dark:border-slate-700/60">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: 420 }}
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-50 mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-2 text-sm lg:text-base text-slate-400 dark:text-slate-500 mb-8">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-xs lg:text-sm text-slate-500 dark:text-slate-400"
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

          {/* End-of-post CTA (peer-to-peer, single) */}
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
                <p className="font-semibold text-slate-900 dark:text-slate-50 text-sm lg:text-base">Karl Nguyen</p>
                <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Technical Product Manager · Container Shipping & AI
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Working on similar problems in shipping or logistics product?{" "}
              <Link
                href="/#connect"
                className="font-medium text-violet-600 dark:text-violet-400 hover:underline"
              >
                Let&rsquo;s connect.
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Connect />
    </>
  );
}

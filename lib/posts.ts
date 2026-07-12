import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/blog");

export type Category = "shipping-logistics" | "product-systems" | "ai-in-operations";

const WORDS_PER_MINUTE = 220;

// Honest read-time from the post body (FIX-4): strip code blocks, HTML tags,
// and markdown syntax before counting words, then round to the nearest minute
// (minimum 1). Computed at build time so it auto-maintains for new posts.
export function computeReadTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/<[^>]+>/g, " ") // HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → keep link text
    .replace(/[#>*_~`|-]/g, " "); // residual markdown punctuation
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  tags: string[];
  excerpt: string;
  readTime: number;
  image?: string;
  pinned?: boolean;
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(raw);
      const tags =
        typeof data.tags === "string"
          ? data.tags.split(",").map((t: string) => t.trim())
          : data.tags ?? [];
      return {
        slug,
        title: data.title ?? "",
        date: typeof data.date === "object" ? data.date.toISOString().slice(0, 10) : String(data.date),
        category: data.category ?? "shipping-logistics",
        tags,
        excerpt: data.excerpt ?? "",
        readTime: computeReadTime(content),
        image: data.image ?? undefined,
        pinned: data.pinned ?? false,
        published: data.published !== false,
      } as PostMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const tags =
    typeof data.tags === "string"
      ? data.tags.split(",").map((t: string) => t.trim())
      : data.tags ?? [];
  return {
    slug,
    title: data.title ?? "",
    date: typeof data.date === "object" ? data.date.toISOString().slice(0, 10) : String(data.date),
    category: data.category ?? "shipping-logistics",
    tags,
    excerpt: data.excerpt ?? "",
    readTime: computeReadTime(content),
    image: data.image ?? undefined,
    pinned: data.pinned ?? false,
    published: data.published !== false,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
      const { data } = matter(raw);
      return data.published !== false;
    })
    .map((f) => f.replace(/\.md$/, ""));
}

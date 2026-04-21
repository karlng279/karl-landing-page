import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/blog");

export type Category = "container-shipping" | "ai-adoption" | "product" | "management";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  tags: string[];
  excerpt: string;
  readTime: number;
  image?: string;
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
      const { data } = matter(raw);
      const tags =
        typeof data.tags === "string"
          ? data.tags.split(",").map((t: string) => t.trim())
          : data.tags ?? [];
      return {
        slug,
        title: data.title ?? "",
        date: typeof data.date === "object" ? data.date.toISOString().slice(0, 10) : String(data.date),
        category: data.category ?? "container-shipping",
        tags,
        excerpt: data.excerpt ?? "",
        readTime: data.readTime ?? 5,
        image: data.image ?? undefined,
      } as PostMeta;
    })
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
    category: data.category ?? "container-shipping",
    tags,
    excerpt: data.excerpt ?? "",
    readTime: data.readTime ?? 5,
    image: data.image ?? undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

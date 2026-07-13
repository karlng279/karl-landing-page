// Build-time generator for public/rss.xml and public/llms.txt.
//
// The site is a static export (output: 'export'), which does not support
// route handlers, so these machine-readable feeds are generated into public/
// before `next build` (see the "build" script in package.json) and copied to
// out/ as-is.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://karl-nguyen.com";
const AUTHOR = "Karl Nguyen";
const postsDir = path.join(process.cwd(), "content/blog");
const publicDir = path.join(process.cwd(), "public");

const CATEGORY_LABELS = {
  "shipping-logistics": "Shipping & Logistics",
  "product-systems": "Product & Systems",
  "ai-in-operations": "AI in Operations",
};

function readPosts() {
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
          ? data.tags.split(",").map((t) => t.trim())
          : data.tags ?? [];
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date);
      return {
        slug,
        title: data.title ?? "",
        date,
        category: data.category ?? "shipping-logistics",
        tags,
        excerpt: data.excerpt ?? "",
        image: data.image ?? undefined,
        published: data.published !== false,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss(posts) {
  const lastBuild = posts[0]
    ? new Date(posts[0].date).toUTCString()
    : new Date(0).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const cats = post.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${cats}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Thoughts on container shipping, logistics technology, and AI adoption in operations.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function generateLlmsTxt(posts) {
  const lines = [];
  lines.push(`# ${AUTHOR}`);
  lines.push("");
  lines.push(
    "> Product Manager specialized in Container Shipping & Logistics Systems — Booking, SI/BL, and Shipment Visibility. Writes about logistics technology, product management, and AI adoption in operations."
  );
  lines.push("");
  lines.push(`- Site: ${SITE_URL}`);
  lines.push(`- Role: Product Manager (Container Shipping & Logistics)`);
  lines.push(`- Focus: Booking systems, shipping documentation (SI/BL/VGM), shipment visibility, AI-augmented product workflows`);
  lines.push(`- Contact: https://www.linkedin.com/in/huynhnq94/`);
  lines.push("");
  lines.push("## Blog Posts");
  lines.push("");
  for (const post of posts) {
    const label = CATEGORY_LABELS[post.category] ?? post.category;
    lines.push(
      `- [${post.title}](${SITE_URL}/blog/${post.slug}) (${post.date}, ${label}): ${post.excerpt}`
    );
  }
  lines.push("");
  return lines.join("\n");
}

function main() {
  const posts = readPosts();
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "rss.xml"), generateRss(posts));
  fs.writeFileSync(path.join(publicDir, "llms.txt"), generateLlmsTxt(posts));
  console.log(
    `[generate-feeds] Wrote public/rss.xml and public/llms.txt (${posts.length} posts).`
  );
}

main();

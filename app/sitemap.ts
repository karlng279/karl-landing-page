import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://karl-nguyen.com";

// Emitted as a static sitemap.xml at build time (compatible with output: 'export').
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const mostRecent = posts[0] ? new Date(posts[0].date) : new Date();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: mostRecent,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
  ];
}

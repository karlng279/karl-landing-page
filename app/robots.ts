import type { MetadataRoute } from "next";

const SITE_URL = "https://karl-nguyen.com";

// Emitted as a static robots.txt at build time (compatible with output: 'export').
// Explicitly welcomes major LLM/AI crawlers so the site is ingestible by
// Claude, ChatGPT, Gemini, Perplexity, and Common Crawl.
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Google-Extended",
    "PerplexityBot",
    "CCBot",
    "Applebot-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

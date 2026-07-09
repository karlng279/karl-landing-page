/**
 * Renders a JSON-LD structured-data block. Server component — the script is
 * emitted into the static HTML at build time, so search engines and LLM
 * crawlers can read it without executing JS.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

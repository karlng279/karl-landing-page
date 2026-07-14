interface FlagshipLink {
  label: string;
  href: string;
  primary?: boolean;
}

interface FlagshipProjectProps {
  badge: string;
  title: string;
  context: string; // Problem
  description: string; // Solution
  impact: string[];
  pipeline: string[]; // e.g. ["PM Strategy", "PO Pipeline", "Design", "Code", "Validate"]
  links: FlagshipLink[];
}

// The single most prominent case study in "Product Work" — the shipped, inspectable
// artifact that makes the Product-Owner → Product-Manager argument. Rendered full-width
// above the standard case-study grid, wrapped in a subtle sky→fuchsia gradient ring so it
// reads as the headline. Server component (no client hooks) → fully crawlable.
export default function FlagshipProject({
  badge,
  title,
  context,
  description,
  impact,
  pipeline,
  links,
}: FlagshipProjectProps) {
  return (
    <div className="max-w-5xl mx-auto mb-8">
      {/* Gradient ring */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 p-[1.5px] shadow-lg">
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 md:p-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-700 dark:text-primary-300 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {badge}
          </span>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {title}
          </h3>

          {/* Pipeline chain — the PO→PM argument in one graphic */}
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-6"
            aria-label={`End-to-end coverage: ${pipeline.join(", ")}`}
          >
            {pipeline.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs md:text-sm font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200">
                  {stage}
                </span>
                {i < pipeline.length - 1 && (
                  <svg
                    className="w-4 h-4 text-accent-500 dark:text-accent-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Problem / Solution / Impact */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  Problem
                </span>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-1">
                  {context}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  Solution
                </span>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-1">
                  {description}
                </p>
              </div>
            </div>

            <div className="md:border-l md:border-slate-200 md:dark:border-slate-700 md:pl-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                What it demonstrates
              </span>
              <ul className="mt-2 space-y-1.5">
                {impact.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm lg:text-base text-slate-600 dark:text-slate-400"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.primary ? "btn-primary justify-center" : "btn-secondary justify-center"
                }
              >
                {link.label}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

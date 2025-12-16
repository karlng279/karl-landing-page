"use client";

interface ProjectCardProps {
  title: string;
  context: string;
  description: string;
  impact: string[];
  link?: string;
  isEnterprise?: boolean;
}

export default function ProjectCard({
  title,
  context,
  description,
  impact,
  link,
  isEnterprise = false,
}: ProjectCardProps) {
  const CardWrapper = link ? "a" : "div";

  return (
    <CardWrapper
      {...(link
        ? {
            href: link,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className={`card h-full flex flex-col ${link ? "cursor-pointer" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          {isEnterprise && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 mb-2">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Enterprise (Anonymized)
            </span>
          )}
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
        </div>
        {link && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Context */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Context
        </span>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {context}
        </p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
          What I Worked On
        </span>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>

      {/* Impact */}
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
          Impact
        </span>
        <ul className="mt-2 space-y-1.5">
          {impact.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
    </CardWrapper>
  );
}


interface OpportunitiesBannerProps {
  relocatingDate: string;
  lastUpdated: string;
}

export default function OpportunitiesBanner({
  relocatingDate,
  lastUpdated,
}: OpportunitiesBannerProps) {
  const roles = [
    "Product Management",
    "Implementation / Solutions",
    "Logistics & Supply Chain Technology",
  ];

  return (
    <section id="opportunities" className="hidden py-8 md:py-10">
      <div className="section-container">
        <div className="max-w-2xl mx-auto border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-2xl p-6 bg-amber-50/60 dark:bg-amber-950/20 relative">
          {/* Temporary indicator badge */}
          <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-400 dark:bg-amber-600 text-white uppercase tracking-wider shadow-sm">
            ● Current — updating soon
          </span>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">
              📍
            </span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Open to Opportunities in the United States
            </h2>
          </div>

          {/* Body */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Relocating in {relocatingDate} and open to roles in:
          </p>
          <ul className="space-y-2">
            {roles.map((role) => (
              <li
                key={role}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                {role}
              </li>
            ))}
          </ul>

          {/* Last updated note */}
          <p className="mt-5 text-xs text-slate-400 dark:text-slate-500 italic">
            Last updated: {lastUpdated}. This section will be removed once I&apos;ve landed.
          </p>
        </div>
      </div>
    </section>
  );
}

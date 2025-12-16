"use client";

interface WorkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  delay?: number;
}

export default function WorkCard({
  icon,
  title,
  description,
  items,
}: WorkCardProps) {
  return (
    <div className="card group h-full">
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-slate-800 dark:text-slate-100 mb-3">{title}</h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-5">{description}</p>

        {/* Items */}
        <ul className="space-y-2 mt-auto">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <svg
                className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


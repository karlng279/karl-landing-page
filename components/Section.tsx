"use client";

import { useEffect, useRef, useState } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-12 md:py-16 ${
        dark
          ? "bg-slate-900 text-white"
          : "bg-transparent"
      } ${className}`}
    >
      <div className="section-container">
        {(title || subtitle) && (
          <div
            className={`max-w-3xl mx-auto text-center mb-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {title && (
              <h2
                className={`mb-4 ${
                  dark ? "text-white" : "text-slate-800 dark:text-slate-100"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`text-lg ${
                  dark
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}


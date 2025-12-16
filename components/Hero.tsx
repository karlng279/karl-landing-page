"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute right-0 bottom-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main heading */}
          <h1
            className={`mb-6 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block text-slate-600 dark:text-slate-400 text-2xl md:text-3xl font-normal mb-2">
              Hi, I&apos;m
            </span>
            <span className="gradient-text text-5xl md:text-6xl lg:text-7xl">
              Karl Nguyen
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium mb-6 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Technical Product Manager
          </p>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            I turn messy logistics workflows into{" "}
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              usable software
            </span>
            . Building at the intersection of{" "}
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              shipping & logistics
            </span>
            ,{" "}
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              AI
            </span>
            , and{" "}
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              hands-on delivery
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a href="#work" className="btn-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              Explore My Work
            </a>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-slate-700 dark:text-slate-300 font-medium border border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


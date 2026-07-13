"use client";

import { useEffect, useRef, useState } from "react";

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  output: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    number: 1,
    title: "Strategy & Bets",
    description:
      "Frame the problem before the solution. Set direction with OKRs, competitive and market context, and a clear point of view on which bets are worth making.",
    output: "1–3 bets worth deeper discovery, tied to measurable outcomes",
  },
  {
    number: 2,
    title: "Discovery",
    description:
      "Map user needs to opportunities to solutions (opportunity solution trees, JTBD interviews). Surface the riskiest assumption and test it before committing engineering time.",
    output: "Validated (or killed) assumptions — evidence, not opinion",
  },
  {
    number: 3,
    title: "Definition",
    description:
      "Turn the validated bet into a PRD and a story map: problem, users, scope, constraints, success metrics, end-to-end flow (booking → documentation → tracking → support).",
    output: "A concept doc and story map the team can argue with",
  },
  {
    number: 4,
    title: "Specs & Edge Cases",
    description:
      "Break flows into stories with atomic, observable acceptance criteria. Work edge cases and validation rules with engineers and domain experts.",
    output: "Story-level specs traceable from requirement to test case",
  },
  {
    number: 5,
    title: "Design & Build",
    description:
      "Wireframes and component specs; build working prototypes with dummy data to pressure-test flows before backend investment.",
    output: "Wireframes, component specs, and a clickable prototype",
  },
  {
    number: 6,
    title: "Launch & Learn",
    description:
      "Coordinate release with engineering, ops, and support. Define the launch plan, then monitor whether the bet actually worked.",
    output: "A clear read on whether the bet is working — and what to do next",
  },
];

export default function WorkFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNumber = parseInt(
              entry.target.getAttribute("data-step") || "0"
            );
            setVisibleSteps((prev) => new Set([...prev, stepNumber]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    const stepElements = containerRef.current?.querySelectorAll("[data-step]");
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Desktop Timeline View */}
      <div className="hidden lg:block relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 dark:from-primary-700 dark:via-accent-700 dark:to-primary-700" />

        <div className="space-y-12">
          {workflowSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleSteps.has(step.number);

            return (
              <div
                key={step.number}
                data-step={step.number}
                className={`relative flex items-center ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`w-[calc(50%-2rem)] transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : isLeft
                      ? "opacity-0 -translate-x-8"
                      : "opacity-0 translate-x-8"
                  }`}
                >
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mb-3">
                          {step.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs lg:text-sm">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="font-medium">{step.output}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-800 transition-all duration-500 ${
                    isVisible
                      ? "bg-primary-500 scale-100"
                      : "bg-slate-300 dark:bg-slate-600 scale-75"
                  }`}
                />

                {/* Empty space for the other side */}
                <div className="w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden">
        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 dark:from-primary-700 dark:via-accent-700 dark:to-primary-700" />

          <div className="space-y-6">
            {workflowSteps.map((step) => {
              const isVisible = visibleSteps.has(step.number);

              return (
                <div
                  key={step.number}
                  data-step={step.number}
                  className={`relative transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute -left-5 top-4 w-4 h-4 rounded-full border-4 border-white dark:border-slate-800 transition-all duration-500 ${
                      isVisible
                        ? "bg-primary-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />

                  {/* Card */}
                  <div className="card">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs">
                        {step.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {step.description}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="font-medium">{step.output}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-12 text-center">
        <blockquote className="card inline-block max-w-2xl mx-auto">
          <p className="text-slate-600 dark:text-slate-300 italic">
            &quot;AI doesn&apos;t replace discovery or decisions — it{" "}
            <span className="text-primary-600 dark:text-primary-400 font-medium not-italic">
              compresses the busywork
            </span>{" "}
            so I can spend more time on framing, trade-offs, and alignment.&quot;
          </p>
        </blockquote>
      </div>

      {/* Link to automation repo */}
      <div className="mt-8 text-center">
        <a
          href="https://karlng279.github.io/ai-ready-product-workflow-v2/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          View the AI-Ready Product Workflow
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
      </div>
    </div>
  );
}


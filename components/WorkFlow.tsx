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
    title: "Ideas & Problem Shaping",
    description:
      "Collect inputs from customers, ops teams, data, and market signals. Use AI to summarize feedback, cluster themes, and draft problem statements.",
    output: "Clearly framed problems, not raw feature requests",
  },
  {
    number: 2,
    title: "Pick Ideas & Define the Bet",
    description:
      "Assess ideas against impact, effort, risk, and strategic fit. Use AI to simulate scenarios, propose alternatives, and challenge assumptions.",
    output: "1-3 bets worth deeper discovery",
  },
  {
    number: 3,
    title: "PRD / Concept Brief",
    description:
      "Draft a concise PRD: problem, users, scope, constraints, success metrics. Use AI as a co-writer for structure and edge cases.",
    output: "Shared concept document the team can argue with",
  },
  {
    number: 4,
    title: "User Story Map & Journeys",
    description:
      "Map the end-to-end flow (booking → documentation → tracking → support). Use AI to suggest missing steps and failure paths.",
    output: "Story map or service blueprint for slicing work",
  },
  {
    number: 5,
    title: "Backlog & Story List",
    description:
      "Break flows into stories, constraints, and technical tasks. Use AI to draft initial user stories and acceptance criteria.",
    output: "Structured backlog linked to the story map",
  },
  {
    number: 6,
    title: "Story Details & Edge Cases",
    description:
      "Clarify details with engineers, designers, and domain experts. Use AI to generate edge-case lists and validation rules.",
    output: "Story-level specs for dev + QA",
  },
  {
    number: 7,
    title: "UAT & Pre-release Validation",
    description:
      "Define UAT scenarios and success criteria with stakeholders. Use AI to expand test scenarios and spot patterns in feedback.",
    output: "UAT reports and go/no-go decisions",
  },
  {
    number: 8,
    title: "Release & Metrics Monitoring",
    description:
      "Coordinate releases with engineering, ops, and support. Use AI to summarize dashboards and highlight anomalies.",
    output: "Clear view of whether the bet is working",
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
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {step.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">
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
          href="https://github.com/karlng279/product-owner-automation-tasks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          View PM Automation Workflows & Templates
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
        </a>
      </div>
    </div>
  );
}


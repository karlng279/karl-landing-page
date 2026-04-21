---
title: "How I Use AI Every Day as a Product Manager in Logistics"
date: 2026-03-10
category: ai-adoption
tags: AI, Product Management, Workflow
excerpt: Not theory — actual tools, prompts, and workflows I use to go from customer feedback to a structured PRD faster than ever before.
readTime: 6
image: /images/blog/pm-using-ai-daily/cover.svg
---

## This Is Not a "AI Will Change Everything" Post

I'm not going to write about the future of AI in logistics. I'm going to write about what I do on a Tuesday afternoon when I have three customer calls behind me and a product review in two days.

Here's my actual AI workflow as a PM.

## 1. Customer Feedback → Structured Themes

After customer calls, I keep raw notes in a running doc. At the end of each week, I paste everything into Claude with a prompt like:

> "Here are my raw notes from 4 customer calls this week. Identify the top 3 recurring themes, tag each piece of feedback with a theme, and flag any quotes that are particularly compelling for a product narrative."

This turns an hour of synthesis work into 15 minutes. The output isn't perfect, but it's a strong first draft that I edit rather than write from scratch.

## 2. Problem Statement → PRD Structure

Once I have a problem statement I believe in, I use a template prompt to generate the PRD shell:

> "You are a senior PM at a B2B logistics software company. Here's a problem statement: [paste]. Write a PRD outline with sections for: problem, who it affects, current workarounds, proposed solution options (3 minimum), success metrics, and open questions."

I fill in the judgment-heavy parts myself — which option to pursue, what the metrics should actually be. But I don't start from a blank page.

## 3. Spec Review

Before sharing a spec with engineers, I do a sanity check:

> "Review this spec for: missing edge cases, ambiguous requirements, and anything an engineer would need to ask clarifying questions about. Be specific."

This catches the gaps I'm too close to the doc to see myself.

## 4. User Story Drafting

For larger epics, I have the AI generate the full user story set from the spec, then I review and cut. It's faster to delete bad stories than write good ones from scratch.

## 5. Competitive Research Summaries

When I need to understand how a competitor handles a specific feature, I use a structured research prompt rather than browsing for an hour. The output is a starting point, not a final answer — I always verify against primary sources.

## What I Don't Use AI For

- **Final decision-making** — which problem to prioritize, which solution to bet on. That's judgment that requires context AI doesn't have.
- **Customer communication** — emails to customers are mine. The tone and relationship are not things I want to optimize away.
- **Engineering tradeoffs** — I'll brainstorm with AI, but the call on technical complexity is always the engineer's.

## The Actual Time Savings

On a typical week with active spec work, I estimate AI saves me 4–6 hours of first-draft writing and synthesis. That time goes into the judgment-heavy work where PMs actually add value.

The tool doesn't make you a better PM. It makes the administrative parts faster so you can spend more time being one.

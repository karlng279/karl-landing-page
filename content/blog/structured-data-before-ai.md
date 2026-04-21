---
title: "You Can't Build AI on Spreadsheets: The Structured Data Problem"
date: 2026-03-24
category: ai-adoption
tags: AI, Data, Product Strategy
excerpt: Every logistics team I talk to wants AI features. Almost none of them have the structured data to support them. Here's the gap no one talks about.
readTime: 4
image: /images/blog/structured-data-before-ai/cover.svg
---

## The AI Wishlist Is Real. The Foundation Usually Isn't.

In almost every product conversation I've had with logistics teams over the past two years, AI comes up early. Smarter rate suggestions. Automated document checks. Predictive exception handling.

The ambition is legitimate. The data infrastructure to support it often isn't there.

## What "Structured Data" Actually Means in Practice

Structured data isn't just data in a database. It means data that is:

- **Typed** — fields have consistent formats. A date is always a date. A port code is always a port code, not sometimes "CNSHA" and sometimes "Shanghai (CN)".
- **Validated** — there are rules that catch bad entries before they propagate.
- **Relational** — records link to each other in meaningful ways. A booking links to a vessel, which links to a route, which links to port events.

Most logistics operations have data that lives in spreadsheets, email threads, and disconnected TMS fields. That's not structured data — it's captured information with no guarantee of consistency.

## Why This Kills AI Projects

LLMs and ML models can do impressive things, but they have limits:

- A model trained on inconsistent data learns inconsistency.
- A retrieval system built on unstructured fields returns noise.
- A classifier that can't distinguish "CNSHA" from "Shanghai" fails at the first port lookup.

I've seen teams spend six months building an AI-powered exception handler, only to discover that their underlying exception data was so inconsistently coded that the model couldn't learn useful patterns from it.

## The Unsexy First Step

Before building any AI feature, run this audit on your core data entities:

1. Pick the 5 most important fields your AI will rely on.
2. Check the fill rate: how often are they populated?
3. Check the consistency: are the values clean and typed correctly?
4. Check the coverage: do they exist for the full history you plan to train on?

If the fill rate is below 80% or consistency is weak, fix that first. This is unglamorous work. It involves data cleanup scripts, validation rules, and conversations with ops teams about how they enter data.

But it's the only foundation that works.

## What Comes After

Once you have clean, structured data — even on a narrow slice of your operations — AI tools become dramatically more useful. Not because the AI got smarter, but because it finally has reliable signal to work with.

The teams building AI features that stick in logistics almost universally did this work first. The teams building demos that never reach production usually skipped it.

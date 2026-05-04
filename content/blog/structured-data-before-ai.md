---
title: "We Tried to Build AI on Messy Data — It Didn’t Work"
date: 2026-05-04
category: ai-adoption
tags: AI, Data, Product Strategy
excerpt: We wanted AI in our shipping platform — document automation, smarter booking decisions, faster ops. What we actually learned is our data wasn’t ready, and that broke everything.
readTime: 5
image: /images/blog/structured-data-before-ai/cover.webp
published: true
---

## We Didn't Start With AI. We Started With a Problem.

At one point, my team and I were pretty convinced we were ready for AI.

We had clear use cases:
- Auto-checking shipping documents  
- Suggesting required documents based on booking data  
- Helping ops quickly answer “why is this booking stuck?”  

All very real problems. All very painful in daily operations.

So naturally, the next step felt obvious: build something “AI-powered” to solve them.

That’s where things started to break.

## The First Reality Check: Our Data Was All Over the Place

On paper, we had everything:
- Booking data in the system  
- Document data in shared drives  
- Status updates across multiple internal tools  

In reality:
- The same port showed up as `CNSHA`, `Shanghai`, and sometimes just “SH”  
- Document types were free-text in some places, dropdowns in others  
- Key fields like “booking status” or “exception reason” were either missing or inconsistently used  

From a PM perspective, this is where I messed up.

I assumed “we have data” = “we can use AI”.

That assumption is just wrong.

## What Structured Data Actually Means (The Hard Way)

I used to think structured data meant “it’s in the database”.

What I learned is — that’s not even close.

For data to be usable (not just for AI, but for anything reliable), it needs to be:

- **Consistent**  
  Same concept → same format, everywhere.  
  Not 5 ways to represent the same port or document type.

- **Controlled**  
  Clear input rules. Dropdowns, validation, constraints.  
  Not free-text fields where ops teams improvise.

- **Connected**  
  Booking ↔ shipment ↔ documents ↔ events.  
  Not isolated records living in different systems.

Most carrier-side systems (including ours at some point) fail at least one of these.

Usually more than one.

## Why Our AI Attempt Failed

We actually tried to build a document-related AI feature.

The idea was simple:
> Given a booking, list required documents and pre-fill them using existing data.

Sounds straightforward.

What actually happened:
- Missing fields → AI had nothing to pre-fill  
- Inconsistent naming → mapping logic kept breaking  
- Document requirements not standardized → no reliable rule base  

So instead of “AI making things faster”, we got:
- More edge cases  
- More manual overrides  
- More confusion from ops  

At some point, it became obvious:
We weren’t building AI.  
We were building workarounds on top of messy data.

## The Uncomfortable Truth (Especially for PMs)

This is the part most teams — including mine — try to skip.

Cleaning data is:
- Not visible to stakeholders  
- Hard to measure in short-term KPIs  
- Painful to push onto operations teams  

But without it, everything downstream becomes fragile.

Even worse:
You can still ship something that *looks* like AI.

It demos well.  
It impresses in meetings.  
And then it quietly fails in real operations.

## What I’d Do Differently Now

If I had to restart that initiative today, I wouldn’t start with AI at all.

I’d start with a very boring scope:

**Pick 1 flow. 1 entity. 1 problem.**

For example:
- Booking → required documents  

Then:
1. Define standard document types (no free text)  
2. Enforce input validation at source  
3. Backfill critical fields for recent data  
4. Make relationships explicit (booking ↔ doc requirements)  

Only after that, I’d even consider adding AI on top.

Not because AI is hard —  
but because bad data makes everything unpredictable.

## What Actually Changes When Data Is Clean

This is the interesting part.

When you finally get structured data right (even partially):
- Simple rules already solve 50% of the problem  
- AI becomes a *multiplier*, not a crutch  
- Ops teams trust the system more  

The irony is:
The “AI magic” people expect usually comes from fixing fundamentals first.

## Final Thought

If you're working on AI in logistics (especially on the carrier side), ask this before anything else:

> “If I remove AI completely, does my data still make sense?”

If the answer is no —  
adding AI won’t fix it.

It will just make the problem harder to see.
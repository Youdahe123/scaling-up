---
title: "Why Your Cache Keeps Stampeding"
slug: cache-stampede
summary: "A hot key expires, three requests miss at the same instant, and your database gets hit like it's the first request ever. Here's the fix."
author: "Maya Chen"
authorRole: "CS junior, distributed systems TA"
topics: ["Caching", "Reliability"]
date: "2026-07-14"
diagram: "/diagrams/cache-stampede.svg"
diagramCaption: "Three clients miss the same expired key at once, and all three fall through to the database together."
readingMinutes: 5
---

Picture a popular product page. Its price is cached for 60 seconds because recalculating it is expensive. That's fine — until the cache entry expires at exactly the moment a burst of traffic asks for it.

Every one of those requests sees a cache miss. Every one of them turns around and hits the database to recompute the same value. If a hundred requests arrive in that window, your database doesn't get one query — it gets a hundred, all asking the exact same question at the exact same time.

That's a **cache stampede** (also called a "dogpile"), and it's one of those bugs that's invisible in testing and brutal in production, because it only shows up under real traffic.

## Why it happens

Caches are usually treated as a binary: a key is either present or absent. But "absent" covers two very different situations — *nobody has ever computed this* and *someone computed this recently and it just expired.* Most naive caching code doesn't distinguish between them, so every request that sees "absent" independently decides to do the expensive work.

## Three ways out

**1. Locking (single-flight).** Let the first request that misses take a lock and recompute; everyone else waits for that result instead of recomputing it themselves. This is the most direct fix, and it's what libraries like `singleflight` (Go) or `dataloader`-style batching give you for free.

**2. Early recomputation.** Instead of letting a key expire and *then* reacting, recompute it slightly *before* expiry, in the background, while still serving the old (still-valid-enough) value. Nobody ever sees a miss.

**3. Jittered TTLs.** If you have many keys that were all set at the same time (common after a deploy or a cache flush), stagger their expirations slightly with random jitter, so they don't all expire in the same instant and create a stampede on *many* keys simultaneously.

## The pattern to remember

A cache miss isn't just "go get the data." It's a decision point where you're implicitly asking *"is anyone else already getting this data right now?"* — and if your caching layer can't answer that question, it will eventually stampede.

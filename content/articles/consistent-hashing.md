---
title: "Consistent Hashing, Without the Mysticism"
slug: consistent-hashing
summary: "It sounds like a whiteboard interview trap, but it's really just one idea: put keys and servers on the same circle."
author: "Priya Nair"
authorRole: "CS senior, systems design mentor"
topics: ["Distributed Systems", "Fundamentals"]
date: "2026-07-28"
diagram: "/diagrams/consistent-hashing.svg"
diagramCaption: "Keys and nodes both land on the same ring — a key belongs to the next node clockwise."
readingMinutes: 6
---

Say you have four cache servers and you route keys to them with `hash(key) % 4`. It works fine — until you add a fifth server. Now `% 4` becomes `% 5`, and almost every key gets remapped to a different server. Your entire cache just went cold at once.

Consistent hashing exists to fix exactly that problem.

## The core idea

Instead of a modulus, imagine a circle — a ring of numbers from 0 up to some large max value, wrapping back to 0. Every server gets hashed onto a point on that ring. Every key also gets hashed onto a point on that ring. A key belongs to whichever server is the *next one clockwise* from it.

That's it. That's the whole mechanism.

## Why this fixes the remapping problem

When you add a fifth server, it lands at one new point on the ring. Only the keys between that new point and the previous server (going counter-clockwise) need to move — everything else stays exactly where it was. Instead of remapping *everything*, you remap roughly `1/N` of your keys, where N is the number of servers.

This is the property that makes consistent hashing worth the extra complexity: **adding or removing a server only disturbs a small, predictable slice of your data**, not the whole system.

## The part people usually skip: virtual nodes

If you only place each physical server at one point on the ring, you get uneven load — some servers end up responsible for a much bigger arc than others, purely by the luck of where their hash landed. The fix is to give each physical server *many* points on the ring (virtual nodes) instead of one. With enough virtual nodes per server, the arcs even out and load balances fairly, even though the underlying idea hasn't changed at all.

## Where you'll actually see this

Distributed caches (Memcached client libraries), distributed databases (DynamoDB, Cassandra), and CDNs all use some variant of this. It's not an academic exercise — it's the default answer to "how do I add capacity to a sharded system without a full-system reshuffle."

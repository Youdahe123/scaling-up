---
title: "Load Balancers, Explained With Donuts"
slug: load-balancer-donuts
summary: "The whole idea of a load balancer fits in one picture: one box in front, spreading requests across identical boxes behind it. Here's what actually varies underneath."
author: "Devon Ruiz"
authorRole: "CS sophomore, backend club lead"
topics: ["Networking", "Fundamentals"]
date: "2026-07-21"
diagram: "/diagrams/load-balancer.svg"
diagramCaption: "One request in, spread evenly across three identical servers."
readingMinutes: 4
---

A load balancer's job is almost embarrassingly simple to state: **don't let any one server do all the work.** It sits between your users and a group of servers that can each handle the same request, and it decides, for every incoming request, which one gets it.

That's the whole concept. The interesting part — the part that actually shows up in interviews and in real outages — is *how* it decides.

## The decision strategies

- **Round robin.** Server 1, then 2, then 3, then back to 1. Dead simple, and fine when every request costs roughly the same amount of work.
- **Least connections.** Send the new request to whichever server currently has the fewest open connections. Better when requests vary wildly in cost — a server stuck on a slow query shouldn't also get piled on with new work.
- **Consistent hashing.** Route based on some property of the request (like a user ID) so the same user tends to land on the same server. Useful when a server holds some per-user state in memory, like a session or an in-memory cache.

## The failure mode worth knowing

A load balancer needs to know which servers are actually healthy — otherwise it'll cheerfully keep sending traffic to a server that's on fire. That's what **health checks** are for: the load balancer periodically pings each server, and pulls any server that stops responding out of rotation.

The subtle bug: if your health check is *too* shallow (just "did the server respond to a ping"), it can mark a server "healthy" even though the actual thing users care about — say, its database connection — is broken. Health checks are only as good as what they actually check.

## Why this matters beyond the diagram

Once you have more than one server, you've made a promise: any of them can handle any request. That promise is what makes load balancing possible, and it's also what makes it hard — it means your servers need to be interchangeable, which pushes state (sessions, caches, uploads) *out* of individual servers and into shared systems. The load balancer is simple. What it demands from everything around it is not.

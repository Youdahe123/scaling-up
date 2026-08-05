import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="flex flex-col items-start gap-5 py-16 sm:py-20">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          Written &amp; reviewed by students
        </span>
        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          System design,{" "}
          <span className="text-accent">explained one diagram</span> at a
          time.
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Scaling Up is a student-written publication about how real systems
          work. Every write-up starts with a picture, then explains it &mdash;
          no jargon walls, no gatekeeping.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/write"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition"
          >
            Write an article
          </Link>
          <a
            href="#subscribe"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent transition"
          >
            Get new issues by email
          </a>
        </div>
      </section>

      <section className="pb-24">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold">
            Latest write-ups
          </h2>
          <span className="text-sm text-muted">{posts.length} articles</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

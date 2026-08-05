import Link from "next/link";
import type { Post } from "@/lib/posts";
import { TopicPill } from "./TopicPill";
import { withBasePath } from "@/lib/basePath";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="border-b border-border bg-background p-3">
        <img
          src={withBasePath(post.diagram)}
          alt=""
          className="aspect-[16/9] w-full rounded-xl object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.topics.map((topic) => (
            <TopicPill key={topic} topic={topic} />
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold leading-snug text-foreground transition group-hover:text-accent">
          {post.title}
        </h2>

        <p className="line-clamp-2 text-sm text-muted">{post.summary}</p>

        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted">
          <span className="font-medium text-foreground">{post.author}</span>
          <span>&middot;</span>
          <span>{formatDate(post.date)}</span>
          <span>&middot;</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}

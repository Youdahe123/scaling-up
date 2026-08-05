import type { Post } from "@/lib/posts";
import { TopicPill } from "./TopicPill";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ArticleHeader({ post }: { post: Post }) {
  return (
    <header className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-1.5">
        {post.topics.map((topic) => (
          <TopicPill key={topic} topic={topic} />
        ))}
      </div>

      <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="text-lg text-muted">{post.summary}</p>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">
          {initials(post.author)}
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground">{post.author}</p>
          <p className="text-muted">{post.authorRole}</p>
        </div>
        <div className="ml-auto text-right text-sm text-muted">
          <p>{formatDate(post.date)}</p>
          <p>{post.readingMinutes} min read</p>
        </div>
      </div>
    </header>
  );
}

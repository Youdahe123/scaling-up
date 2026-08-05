import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { ArticleHeader } from "@/components/ArticleHeader";
import { DiagramFigure } from "@/components/DiagramFigure";
import { SubscribeForm } from "@/components/SubscribeForm";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[680px] px-5 py-12 sm:py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition"
      >
        &larr; All articles
      </Link>

      <ArticleHeader post={post} />

      <div className="mt-8">
        <DiagramFigure src={post.diagram} caption={post.diagramCaption} />
      </div>

      <div className="prose-article mt-10">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <p className="font-display text-lg font-semibold">
          Liked this write-up?
        </p>
        <p className="mt-1 text-sm text-muted">
          Get the next one in your inbox &mdash; no spam, unsubscribe
          anytime.
        </p>
        <div className="mt-4">
          <SubscribeForm />
        </div>
      </div>
    </article>
  );
}

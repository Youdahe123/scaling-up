import { TopicPill } from "@/components/TopicPill";
import type { ArticleDraft } from "./types";

function initials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PreviewPane({ draft }: { draft: ArticleDraft }) {
  const topics = draft.topics
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap gap-1.5">
        {topics.length ? (
          topics.map((topic) => <TopicPill key={topic} topic={topic} />)
        ) : (
          <span className="text-xs text-muted">No topics yet</span>
        )}
      </div>

      <h1 className="font-display mt-4 text-2xl font-semibold leading-tight">
        {draft.title || "Untitled article"}
      </h1>

      <p className="mt-2 text-muted">
        {draft.summary || "Add a one-line summary to see it here."}
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
          {initials(draft.author)}
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {draft.author || "Your name"}
          </p>
          <p className="text-xs text-muted">
            {draft.authorRole || "Your role"}
          </p>
        </div>
      </div>

      {draft.heroDiagram ? (
        <figure className="mt-6">
          <div
            className="overflow-hidden rounded-2xl border border-border bg-background p-3"
            dangerouslySetInnerHTML={{ __html: draft.heroDiagram.svg }}
          />
          {draft.heroDiagram.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {draft.heroDiagram.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-border p-6 text-center text-sm text-muted">
          Your hero diagram will show up here
        </div>
      )}

      <div className="prose-article mt-6">
        {draft.sections.map((section) => (
          <div key={section.id}>
            <h2>{section.heading || "Untitled section"}</h2>
            {section.body
              .split(/\n{2,}/)
              .filter((p) => p.trim())
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            {!section.body.trim() && (
              <p className="text-muted">Start writing this section…</p>
            )}

            {section.diagram ? (
              <figure>
                <div
                  className="overflow-hidden rounded-2xl border border-border bg-background p-3"
                  dangerouslySetInnerHTML={{ __html: section.diagram.svg }}
                />
                {section.diagram.caption ? (
                  <figcaption className="text-center text-sm text-muted">
                    {section.diagram.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : section.image ? (
              <figure>
                <img
                  src={section.image.dataUrl}
                  alt={section.image.alt}
                  className="w-full rounded-2xl border border-border"
                />
              </figure>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

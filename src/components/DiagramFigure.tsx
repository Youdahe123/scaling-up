import { withBasePath } from "@/lib/basePath";

export function DiagramFigure({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-2">
      <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 sm:p-6">
        <img src={withBasePath(src)} alt={caption ?? ""} className="w-full" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

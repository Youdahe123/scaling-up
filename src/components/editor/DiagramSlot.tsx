"use client";

import type { EditorDiagram } from "./types";

export function DiagramSlot({
  diagram,
  label,
  caption,
  onCaptionChange,
  onDraw,
  onRemove,
}: {
  diagram?: EditorDiagram;
  label: string;
  caption: string;
  onCaptionChange: (caption: string) => void;
  onDraw: () => void;
  onRemove: () => void;
}) {
  if (!diagram) {
    return (
      <button
        type="button"
        onClick={onDraw}
        className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-sm text-muted hover:border-accent hover:text-accent transition"
      >
        <span className="font-semibold">+ {label}</span>
        <span className="text-xs">
          Draw one, paste an image, or import a .excalidraw file
        </span>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-3">
      <div
        className="max-h-64 overflow-hidden rounded-xl border border-border bg-card"
        dangerouslySetInnerHTML={{ __html: diagram.svg }}
      />
      <input
        type="text"
        placeholder="Caption (optional)"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        className="mt-3 w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:border-accent"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onDraw}
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-accent hover:text-accent transition"
        >
          Edit diagram
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted hover:border-red-300 hover:text-red-500 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

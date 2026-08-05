"use client";

import { useRef } from "react";
import type { SectionState } from "./types";
import { DiagramSlot } from "./DiagramSlot";

export function SectionEditor({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMove,
  onOpenDiagram,
}: {
  section: SectionState;
  index: number;
  total: number;
  onChange: (patch: Partial<SectionState>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  onOpenDiagram: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        image: { dataUrl: reader.result as string, alt: file.name },
        diagram: undefined,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          Section {index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="rounded-full px-2 py-1 text-xs text-muted hover:text-accent disabled:opacity-30"
            aria-label="Move section up"
          >
            &uarr;
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="rounded-full px-2 py-1 text-xs text-muted hover:text-accent disabled:opacity-30"
            aria-label="Move section down"
          >
            &darr;
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={total === 1}
            className="ml-1 rounded-full px-2 py-1 text-xs text-muted hover:text-red-500 disabled:opacity-30"
          >
            Remove
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder={'Section heading (e.g. "Why it happens")'}
        value={section.heading}
        onChange={(e) => onChange({ heading: e.target.value })}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold outline-none focus:border-accent"
      />

      <textarea
        placeholder="Write this section in Markdown…"
        value={section.body}
        onChange={(e) => onChange({ body: e.target.value })}
        rows={5}
        className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />

      <div className="mt-3">
        {section.image ? (
          <div className="rounded-2xl border border-border bg-background p-3">
            <img
              src={section.image.dataUrl}
              alt={section.image.alt}
              className="max-h-64 w-full rounded-xl border border-border object-contain"
            />
            <button
              type="button"
              onClick={() => onChange({ image: undefined })}
              className="mt-2 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted hover:border-red-300 hover:text-red-500 transition"
            >
              Remove image
            </button>
          </div>
        ) : section.diagram ? (
          <DiagramSlot
            diagram={section.diagram}
            label="Diagram"
            caption={section.diagram.caption}
            onCaptionChange={(caption) =>
              onChange({ diagram: { ...section.diagram!, caption } })
            }
            onDraw={onOpenDiagram}
            onRemove={() => onChange({ diagram: undefined })}
          />
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onOpenDiagram}
              className="flex-1 rounded-xl border-2 border-dashed border-border px-4 py-3 text-sm font-semibold text-muted hover:border-accent hover:text-accent transition"
            >
              + Draw a diagram
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 rounded-xl border-2 border-dashed border-border px-4 py-3 text-sm font-semibold text-muted hover:border-accent hover:text-accent transition"
            >
              + Upload an image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagePick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

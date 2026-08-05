"use client";

import { useEffect, useRef, useState } from "react";
import { DiagramModal, type DiagramResult } from "./DiagramModal";
import { DiagramSlot } from "./DiagramSlot";
import { SectionEditor } from "./SectionEditor";
import { PreviewPane } from "./PreviewPane";
import {
  createEmptyDraft,
  newSection,
  type ArticleDraft,
  type SectionState,
} from "./types";
import { downloadMarkdown } from "@/lib/exportArticle";

const STORAGE_KEY = "scaling-up:draft";

export function ArticleEditor() {
  const [draft, setDraft] = useState<ArticleDraft>(createEmptyDraft);
  const [diagramTarget, setDiagramTarget] = useState<string | "hero" | null>(
    null
  );
  const loadedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setDraft(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    } finally {
      loadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // draft too large or storage unavailable — fail silently, editing still works
    }
  }, [draft]);

  function updateMeta<K extends keyof ArticleDraft>(key: K, value: ArticleDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function updateSection(id: string, patch: Partial<SectionState>) {
    setDraft((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }

  function addSection() {
    setDraft((d) => ({ ...d, sections: [...d.sections, newSection()] }));
  }

  function removeSection(id: string) {
    setDraft((d) => ({
      ...d,
      sections: d.sections.length > 1 ? d.sections.filter((s) => s.id !== id) : d.sections,
    }));
  }

  function moveSection(id: string, direction: -1 | 1) {
    setDraft((d) => {
      const index = d.sections.findIndex((s) => s.id === id);
      const target = index + direction;
      if (target < 0 || target >= d.sections.length) return d;
      const sections = [...d.sections];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...d, sections };
    });
  }

  function handleDiagramSave(result: DiagramResult) {
    if (diagramTarget === "hero") {
      updateMeta("heroDiagram", {
        scene: result.scene,
        svg: result.svg,
        caption: draft.heroDiagram?.caption ?? "",
      });
    } else if (diagramTarget) {
      const section = draft.sections.find((s) => s.id === diagramTarget);
      updateSection(diagramTarget, {
        diagram: {
          scene: result.scene,
          svg: result.svg,
          caption: section?.diagram?.caption ?? "",
        },
        image: undefined,
      });
    }
    setDiagramTarget(null);
  }

  function currentInitialScene() {
    if (diagramTarget === "hero") return draft.heroDiagram?.scene;
    return draft.sections.find((s) => s.id === diagramTarget)?.diagram?.scene;
  }

  function startOver() {
    if (!confirm("Clear this draft and start a new article?")) return;
    setDraft(createEmptyDraft());
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Write for Scaling Up
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Draft your write-up right here — draw diagrams, add sections, see
          it rendered as you go. Your draft autosaves to this browser.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Article details
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={draft.title}
                onChange={(e) => updateMeta("title", e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-base font-semibold outline-none focus:border-accent"
              />
              <textarea
                placeholder="One-line summary"
                value={draft.summary}
                onChange={(e) => updateMeta("summary", e.target.value)}
                rows={2}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={draft.author}
                  onChange={(e) => updateMeta("author", e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                />
                <input
                  type="text"
                  placeholder="Your role (e.g. CS junior)"
                  value={draft.authorRole}
                  onChange={(e) => updateMeta("authorRole", e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                />
              </div>
              <input
                type="text"
                placeholder="Topics, comma separated (e.g. Caching, Networking)"
                value={draft.topics}
                onChange={(e) => updateMeta("topics", e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Hero diagram
            </h2>
            <p className="mb-3 text-xs text-muted">
              This is the big diagram readers see first — pick the one that
              explains the core idea.
            </p>
            <DiagramSlot
              diagram={draft.heroDiagram}
              label="Draw the hero diagram"
              caption={draft.heroDiagram?.caption ?? ""}
              onCaptionChange={(caption) =>
                draft.heroDiagram &&
                updateMeta("heroDiagram", { ...draft.heroDiagram, caption })
              }
              onDraw={() => setDiagramTarget("hero")}
              onRemove={() => updateMeta("heroDiagram", undefined)}
            />
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
                Sections
              </h2>
              <button
                type="button"
                onClick={addSection}
                className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90 transition"
              >
                + Add section
              </button>
            </div>

            {draft.sections.map((section, i) => (
              <SectionEditor
                key={section.id}
                section={section}
                index={i}
                total={draft.sections.length}
                onChange={(patch) => updateSection(section.id, patch)}
                onRemove={() => removeSection(section.id)}
                onMove={(dir) => moveSection(section.id, dir)}
                onOpenDiagram={() => setDiagramTarget(section.id)}
              />
            ))}
          </section>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => downloadMarkdown(draft)}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition"
            >
              Download article (.md)
            </button>
            <button
              type="button"
              onClick={startOver}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted hover:border-red-300 hover:text-red-500 transition"
            >
              Start over
            </button>
            <p className="text-xs text-muted">
              Drop the downloaded file into{" "}
              <code className="rounded bg-accent-soft px-1 py-0.5 text-accent">
                content/articles/
              </code>{" "}
              and open a pull request — automatic submission from here is
              coming next.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Live preview
          </p>
          <PreviewPane draft={draft} />
        </div>
      </div>

      <DiagramModal
        open={diagramTarget !== null}
        initialScene={currentInitialScene()}
        onClose={() => setDiagramTarget(null)}
        onSave={handleDiagramSave}
      />
    </div>
  );
}

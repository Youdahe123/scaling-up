"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/excalidraw/element/types";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export type DiagramScene = {
  elements: readonly ExcalidrawElement[];
  appState: Partial<AppState>;
  files: BinaryFiles;
};

export type DiagramResult = {
  scene: DiagramScene;
  svg: string;
};

export function DiagramModal({
  open,
  initialScene,
  onClose,
  onSave,
}: {
  open: boolean;
  initialScene?: DiagramScene;
  onClose: () => void;
  onSave: (result: DiagramResult) => void;
}) {
  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleSave() {
    const api = apiRef.current;
    if (!api) return;
    setSaving(true);
    try {
      const elements = api.getSceneElements() as NonDeletedExcalidrawElement[];
      const appState = api.getAppState();
      const files = api.getFiles();

      const { exportToSvg } = await import("@excalidraw/excalidraw");
      const svgEl = await exportToSvg({
        elements,
        appState: { ...appState, exportBackground: true, exportPadding: 16 },
        files,
      });
      const svgString = new XMLSerializer().serializeToString(svgEl);

      onSave({ scene: { elements, appState, files }, svg: svgString });
    } finally {
      setSaving(false);
    }
  }

  const initialData: ExcalidrawInitialDataState | undefined = initialScene
    ? {
        elements: initialScene.elements,
        appState: initialScene.appState,
        files: initialScene.files,
      }
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <p className="font-display font-semibold">Draw your diagram</p>
          <p className="text-xs text-muted">
            Use the menu (top-left) to import an image, an .excalidraw file,
            or paste one in directly.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:border-accent hover:text-accent transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save diagram"}
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Excalidraw
          excalidrawAPI={(api) => {
            apiRef.current = api;
          }}
          initialData={initialData}
          theme="light"
        />
      </div>
    </div>
  );
}

import type { DiagramScene } from "./DiagramModal";

export type EditorDiagram = {
  scene: DiagramScene;
  svg: string;
  caption: string;
};

export type EditorImage = {
  dataUrl: string;
  alt: string;
};

export type SectionState = {
  id: string;
  heading: string;
  body: string;
  diagram?: EditorDiagram;
  image?: EditorImage;
};

export type ArticleDraft = {
  title: string;
  summary: string;
  author: string;
  authorRole: string;
  topics: string;
  heroDiagram?: EditorDiagram;
  sections: SectionState[];
};

export function newSection(): SectionState {
  return { id: crypto.randomUUID(), heading: "", body: "" };
}

export function createEmptyDraft(): ArticleDraft {
  return {
    title: "",
    summary: "",
    author: "",
    authorRole: "",
    topics: "",
    sections: [newSection()],
  };
}

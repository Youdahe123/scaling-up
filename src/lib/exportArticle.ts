import type { ArticleDraft } from "@/components/editor/types";
import { slugify } from "./slugify";

function svgToDataUri(svg: string) {
  const bytes = new TextEncoder().encode(svg);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `data:image/svg+xml;base64,${btoa(binary)}`;
}

function escapeYaml(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function estimateReadingMinutes(draft: ArticleDraft) {
  const words = draft.sections
    .map((s) => s.body.split(/\s+/).filter(Boolean).length)
    .reduce((a, b) => a + b, 0);
  return Math.max(1, Math.round(words / 200));
}

export function buildMarkdown(draft: ArticleDraft) {
  const slug = slugify(draft.title) || "untitled-article";
  const topics = draft.topics
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const heroDiagramUri = draft.heroDiagram
    ? svgToDataUri(draft.heroDiagram.svg)
    : "";

  const frontmatterLines = [
    "---",
    `title: "${escapeYaml(draft.title)}"`,
    `slug: ${slug}`,
    `summary: "${escapeYaml(draft.summary)}"`,
    `author: "${escapeYaml(draft.author)}"`,
    `authorRole: "${escapeYaml(draft.authorRole)}"`,
    `topics: [${topics.map((t) => `"${escapeYaml(t)}"`).join(", ")}]`,
    `date: "${new Date().toISOString().slice(0, 10)}"`,
    `diagram: "${heroDiagramUri}"`,
    `diagramCaption: "${escapeYaml(draft.heroDiagram?.caption ?? "")}"`,
    `readingMinutes: ${estimateReadingMinutes(draft)}`,
    "---",
  ];

  const body = draft.sections
    .map((section) => {
      let block = `## ${section.heading || "Untitled section"}\n\n${section.body}`;
      if (section.diagram) {
        const uri = svgToDataUri(section.diagram.svg);
        block += `\n\n![${section.diagram.caption}](${uri})`;
      } else if (section.image) {
        block += `\n\n![${section.image.alt}](${section.image.dataUrl})`;
      }
      return block;
    })
    .join("\n\n");

  return `${frontmatterLines.join("\n")}\n\n${body}\n`;
}

export function downloadMarkdown(draft: ArticleDraft) {
  const slug = slugify(draft.title) || "untitled-article";
  const markdown = buildMarkdown(draft);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

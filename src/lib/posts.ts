import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type PostFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  author: string;
  authorRole: string;
  topics: string[];
  date: string;
  diagram: string;
  diagramCaption: string;
  readingMinutes: number;
};

export type Post = PostFrontmatter & { content: string };

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as PostFrontmatter), content };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllTopics(): string[] {
  const topics = new Set<string>();
  getAllPosts().forEach((post) => post.topics.forEach((t) => topics.add(t)));
  return Array.from(topics).sort();
}

# Scaling Up

System design, explained one diagram at a time — written and reviewed by students, for students.

**Live site:** https://youdahe123.github.io/scaling-up/

Scaling Up is a small publication built around one idea: a reading experience should get out of the way, and a system design write-up should teach through its diagram first, prose second. Anyone can draft an article — including drawing the diagram — right in the browser, and every submission goes through review before it's published, the same way a code change would.

## How it works

- **Read** — the feed and reader pages are a fully static site (no tracking, no clutter, fast).
- **Write** — [`/write`](https://youdahe123.github.io/scaling-up/write/) is an in-browser editor: add sections, draw or import a system diagram with an embedded [Excalidraw](https://excalidraw.com) canvas, and export a ready-to-submit article.
- **Publish** — articles live as Markdown files in [`content/articles/`](content/articles) and go live once a pull request adding one is reviewed and merged. See [CONTRIBUTING.md](CONTRIBUTING.md).
- **Subscribe** — an [RSS feed](https://youdahe123.github.io/scaling-up/rss.xml) is live; email delivery isn't wired up yet.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export) + [Tailwind CSS](https://tailwindcss.com)
- [Excalidraw](https://excalidraw.com) for the in-browser diagram editor
- Content as Markdown with frontmatter, no CMS/database
- Deployed to [GitHub Pages](https://pages.github.com) via GitHub Actions on every merge to `main`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check what a production build (including the GitHub Pages path prefix) will actually look like:

```bash
npm run build
npx serve out
```

## Contributing

Whether you want to write an article or work on the site itself, start with [CONTRIBUTING.md](CONTRIBUTING.md). Please also read the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)

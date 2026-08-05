# Contributing to Scaling Up

Thanks for wanting to help. There are two very different ways to contribute — writing an article, or working on the site itself — and they go through different processes.

Nothing gets merged to `main` without a pull request and a review, including changes from maintainers. That's deliberate: it's the same review flow whether you're fixing a typo, adding a feature, or publishing a write-up.

## Writing an article

1. Go to [`/write`](https://youdahe123.github.io/scaling-up/write/) and draft your post — title, sections, and a diagram (draw it, or import an image/`.excalidraw` file). It autosaves to your browser as you go.
2. Click **Download article (.md)**.
3. Fork this repo, drop the downloaded file into `content/articles/`, and open a pull request.
4. A reviewer will read it and may ask for changes. Once approved, merging it makes it live and adds it to the RSS feed automatically.

You don't need to touch any code to write an article — the editor produces a complete file with all the required frontmatter.

If you'd rather write the Markdown file by hand, look at an existing file in `content/articles/` for the expected frontmatter shape (`title`, `slug`, `summary`, `author`, `authorRole`, `topics`, `date`, `diagram`, `diagramCaption`, `readingMinutes`).

## Working on the codebase

1. Fork and clone the repo.
2. `npm install`
3. `npm run dev` and open [http://localhost:3000](http://localhost:3000).
4. Make your change, and check `npm run build` succeeds before opening a PR (this is also what CI checks).
5. Open a pull request describing what changed and why.

Good first contributions: small UI/UX fixes, accessibility improvements, or anything filed as a `good first issue`.

If you're planning something larger (a new feature, a structural change), consider opening an issue first to talk it through before investing a lot of time — it's a small project and it's easier to align early than to rework a big PR.

## Review expectations

- Article PRs are reviewed for clarity and correctness, not gatekept on writing style — this is a learning space.
- Code PRs need at least one approval and a passing build before merge (enforced by branch protection on `main`).
- Be patient — this is a volunteer project maintained by students alongside classes.

## Code of Conduct

Participation in this project is covered by our [Code of Conduct](CODE_OF_CONDUCT.md).

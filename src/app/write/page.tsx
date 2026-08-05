import { GithubIcon } from "@/components/icons";

const CONTENT_REPO_URL = "https://github.com/Youdahe123/scaling-up/tree/main/content/articles";

const STEPS = [
  {
    title: "Draft in the editor",
    body: "Add a title, sections, and draw or import your diagram right in the browser. Nothing is public yet.",
  },
  {
    title: "Submit for review",
    body: "One click packages your draft into a pull request against the articles repo — the same review flow as a code change.",
  },
  {
    title: "A reviewer reads it",
    body: "A student reviewer checks it on a live preview link and leaves comments directly on the PR if anything needs work.",
  },
  {
    title: "It publishes itself",
    body: "Once merged, the site rebuilds automatically and subscribers get it in their next email.",
  },
];

export default function WritePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-3 py-1 text-xs font-semibold text-[#c96a00]">
        Editor in progress
      </span>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Write for Scaling Up
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        The in-browser diagram editor is being built next. Here&rsquo;s how
        publishing will work once it lands — the same pull-request review
        flow the site&rsquo;s code itself uses.
      </p>

      <ol className="mt-10 flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">
              {i + 1}
            </div>
            <div>
              <p className="font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <p className="font-display text-lg font-semibold">
          Want to publish sooner?
        </p>
        <p className="mt-1 text-sm text-muted">
          You can already submit a Markdown file with your write-up and
          diagram directly as a pull request — the editor is a nicer way to
          do the same thing.
        </p>
        <a
          href={CONTENT_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent transition"
        >
          <GithubIcon className="h-4 w-4" />
          Open the articles repo
        </a>
      </div>
    </div>
  );
}

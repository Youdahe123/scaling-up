import Link from "next/link";
import { GithubIcon } from "./icons";
import { SubscribeForm } from "./SubscribeForm";

const CODE_REPO_URL = "https://github.com/Youdahe123/scaling-up";
const CONTENT_REPO_URL = "https://github.com/Youdahe123/scaling-up/tree/main/content/articles";

export function SiteFooter() {
  return (
    <footer id="subscribe" className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-4 border-b border-border pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">
              One diagram, once a week.
            </p>
            <p className="mt-1 text-sm text-muted">
              New write-ups land in your inbox. No spam, unsubscribe anytime.
            </p>
          </div>
          <SubscribeForm />
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built by students, for students. &copy; {new Date().getFullYear()}{" "}
            Scaling Up.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/write" className="hover:text-foreground transition">
              Write an article
            </Link>
            <a
              href={CONTENT_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition"
            >
              Article repo
            </a>
            <a
              href={CODE_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition"
            >
              <GithubIcon className="h-4 w-4" />
              Site code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

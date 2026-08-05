import Link from "next/link";
import { GithubIcon, SquiggleMark } from "./icons";
import { SubscribeForm } from "./SubscribeForm";

const CODE_REPO_URL = "https://github.com/Youdahe123/scaling-up";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <SquiggleMark className="h-7 w-10" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Scaling Up
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-foreground transition">
            Articles
          </Link>
          <Link href="/write" className="hover:text-foreground transition">
            Write for us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CODE_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition"
          >
            <GithubIcon className="h-4 w-4" />
            Contribute to the codebase
          </a>
          <div className="hidden lg:block">
            <SubscribeForm variant="compact" />
          </div>
        </div>
      </div>
    </header>
  );
}

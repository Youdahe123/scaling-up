export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function SquiggleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="14" height="10" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <rect x="32" y="18" width="14" height="10" rx="3" className="fill-mint-soft" stroke="var(--mint)" strokeWidth="2" />
      <path
        d="M16 9c6 0 4 14 10 14"
        stroke="var(--amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="26" cy="23" r="1.8" fill="var(--amber)" />
    </svg>
  );
}

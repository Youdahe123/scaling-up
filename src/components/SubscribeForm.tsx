"use client";

import { useState } from "react";

export function SubscribeForm({ variant = "inline" }: { variant?: "inline" | "compact" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wiring to a real provider (Buttondown/Resend) is the next step —
    // this just confirms the UI state for now.
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="text-sm font-medium text-mint">
        You&rsquo;re in — look out for the next issue.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "compact"
          ? "flex items-center gap-2"
          : "flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      }
    >
      <input
        type="email"
        required
        placeholder="you@school.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          variant === "compact"
            ? "w-40 rounded-full border border-border bg-card px-3 py-1.5 text-sm outline-none focus:border-accent"
            : "flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent"
        }
      />
      <button
        type="submit"
        className={
          variant === "compact"
            ? "rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground whitespace-nowrap hover:opacity-90 transition"
            : "rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground whitespace-nowrap hover:opacity-90 transition"
        }
      >
        Subscribe
      </button>
    </form>
  );
}

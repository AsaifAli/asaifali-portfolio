"use client";

import Link from "next/link";
import { useAISession } from "./AISessionProvider";

export function AISessionBadge() {
  const { hydrated, token, provider, model } = useAISession();
  if (!hydrated) return null;
  return (
    <Link className={`ai-session-badge ${token ? "active" : ""}`} href="/#demo" aria-label="Portfolio AI session">
      <span className="ai-session-dot" />
      {token ? `AI session · ${model}` : "Start AI session"}
    </Link>
  );
}

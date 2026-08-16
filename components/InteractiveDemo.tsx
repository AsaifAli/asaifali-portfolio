"use client";

import { useMemo, useState } from "react";

const GATEWAY_URL = process.env.NEXT_PUBLIC_LLM_GATEWAY_URL?.replace(/\/$/, "");

const providers = [
  { id: "openrouter", label: "OpenRouter", placeholder: "openai/gpt-oss-20b:free" },
  { id: "google", label: "Google Gemini", placeholder: "gemini-3.5-flash-lite" },
  { id: "openai", label: "OpenAI", placeholder: "gpt-5-mini" },
  { id: "anthropic", label: "Anthropic", placeholder: "claude-..." },
] as const;

type ProviderId = (typeof providers)[number]["id"];

type Props = {
  project: string;
  title?: string;
  description?: string;
};

export function InteractiveDemo({ project, title = "Try the interactive demo", description }: Props) {
  const [provider, setProvider] = useState<ProviderId>("google");
  const [model, setModel] = useState("gemini-3.5-flash-lite");
  const [apiKey, setApiKey] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "creating" | "ready" | "error">("idle");
  const [error, setError] = useState("");

  const selectedProvider = useMemo(
    () => providers.find((item) => item.id === provider) ?? providers[0],
    [provider],
  );

  async function createSession() {
    if (!GATEWAY_URL) {
      setStatus("error");
      setError("Interactive demos are not configured yet.");
      return;
    }

    if (!apiKey.trim() || !model.trim()) {
      setStatus("error");
      setError("Enter an API key and model ID to continue.");
      return;
    }

    setStatus("creating");
    setError("");

    try {
      const response = await fetch(`${GATEWAY_URL}/v1/demo/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          model: model.trim(),
          api_key: apiKey,
          project,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.detail || payload?.error?.message || "Unable to create demo session.");
      }

      setToken(payload.access_token ?? null);
      setStatus(payload.access_token ? "ready" : "error");
      if (!payload.access_token) setError("Gateway did not return a session token.");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Unable to create demo session.");
    }
  }

  async function revokeSession() {
    if (!GATEWAY_URL || !token) return;
    try {
      await fetch(`${GATEWAY_URL}/v1/demo/session/revoke`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      setToken(null);
      setApiKey("");
      setStatus("idle");
      setError("");
    }
  }

  return (
    <section className="demo-panel" aria-labelledby={`${project}-demo-title`}>
      <div className="demo-header">
        <div>
          <div className="section-kicker">Interactive demo</div>
          <h3 id={`${project}-demo-title`}>{title}</h3>
          <p className="demo-copy">
            {description ?? "Bring your own provider key. The credential is used for a short-lived demo session and is not stored in the portfolio."}
          </p>
        </div>
        <span className={`demo-status demo-status-${status}`}>
          {status === "ready" ? "Session ready" : status === "creating" ? "Connecting…" : "BYOK"}
        </span>
      </div>

      <div className="demo-grid">
        <div className="field">
          <label htmlFor={`${project}-provider`}>Provider</label>
          <select
            id={`${project}-provider`}
            value={provider}
            onChange={(event) => {
              const next = event.target.value as ProviderId;
              setProvider(next);
              const item = providers.find((candidate) => candidate.id === next);
              if (item) setModel(item.placeholder);
              setStatus("idle");
              setError("");
            }}
          >
            {providers.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={`${project}-model`}>Model ID</label>
          <input
            id={`${project}-model`}
            value={model}
            onChange={(event) => setModel(event.target.value)}
            placeholder={selectedProvider.placeholder}
            spellCheck={false}
          />
        </div>

        <div className="field demo-key-field">
          <label htmlFor={`${project}-api-key`}>API key</label>
          <input
            id={`${project}-api-key`}
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Paste provider key"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="field-hint">Used only to create the temporary gateway session.</span>
        </div>
      </div>

      {error && <div className="notice demo-error" role="alert">{error}</div>}

      <div className="demo-actions">
        {status === "ready" ? (
          <button className="btn btn-secondary" type="button" onClick={revokeSession}>End session</button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={createSession} disabled={status === "creating"}>
            {status === "creating" ? "Creating session…" : "Start interactive demo →"}
          </button>
        )}
      </div>

      {status === "ready" && (
        <div className="notice demo-ready">
          Session established for <strong>{provider}</strong> / <strong>{model}</strong>. This proves the portfolio-to-gateway inference session; the project-specific action can be plugged into this session later.
        </div>
      )}
    </section>
  );
}

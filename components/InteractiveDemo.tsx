"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAISession } from "./AISessionProvider";

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
  mode?: "manager" | "status";
  liveUrl?: string;
};

const HANDOFF_PARAM = "portfolio_llm_session";

const PROJECT_LIVE_URLS: Record<string, string> = {
  legacylens: "https://ai-code-modernization-ui.onrender.com",
  evidenceflow: "https://langgraph-rag-hdkn.onrender.com",
  quotesense: "https://quotation-analyzer-9m4i.onrender.com",
  flowpilot: "https://ai-automation-ui-ac2c.onrender.com",
  webqa_intelligence: "https://web-crawler-agent.onrender.com",
};

function resolveLiveUrl(project: string, liveUrl?: string) {
  return liveUrl?.trim() || PROJECT_LIVE_URLS[project.toLowerCase()] || "";
}

function buildLaunchUrl(liveUrl: string, token: string) {
  const target = new URL(liveUrl);
  target.searchParams.set(HANDOFF_PARAM, token);
  return target.toString();
}

export function InteractiveDemo({
  project,
  title = "Try the interactive demo",
  description,
  mode = "manager",
  liveUrl = "",
}: Props) {
  const {
    token,
    provider: activeProvider,
    model: activeModel,
    hydrated,
    creating,
    error,
    createSession,
    revokeSession,
  } = useAISession();

  const [provider, setProvider] = useState<ProviderId>("google");
  const [model, setModel] = useState("gemini-3.5-flash-lite");
  const [apiKey, setApiKey] = useState("");
  const selectedProvider = useMemo(
    () => providers.find((item) => item.id === provider) ?? providers[0],
    [provider],
  );
  const resolvedLiveUrl = resolveLiveUrl(project, liveUrl);

  const launchDemo = () => {
    if (!token || !resolvedLiveUrl) return;
    window.open(buildLaunchUrl(resolvedLiveUrl, token), "_blank", "noopener,noreferrer");
  };

  if (mode === "status") {
    return (
      <section className="demo-panel demo-session-status" aria-labelledby={`${project}-session-title`}>
        <div className="demo-header">
          <div>
            <div className="section-kicker">Interactive demo · BYOK</div>
            <h3 id={`${project}-session-title`}>
              {token ? `Try ${project === "portfolio" ? "this project" : "this project"} live` : "Connect your AI session"}
            </h3>
            <p className="demo-copy">
              {token
                ? `Your temporary ${activeProvider} / ${activeModel} session is ready. Open the live project below to use it.`
                : "Bring your own provider key to create a short-lived session for this project. The portfolio does not store the credential."}
            </p>
          </div>
          <span className={`demo-status ${token ? "demo-status-ready" : "demo-status-idle"}`}>
            {token ? "Session active" : "No session"}
          </span>
        </div>

        {token ? (
          <div className="shared-session-card shared-session-card-active">
            <div className="shared-session-copy">
              <div className="shared-session-label">Portfolio AI session</div>
              <strong>{activeProvider} · {activeModel}</strong>
              <p>Active in this browser session. Your provider API key is not stored by the portfolio.</p>
            </div>
            <div className="demo-actions-buttons demo-session-buttons demo-session-buttons-active">
              <button
                className="btn btn-primary demo-launch-btn"
                type="button"
                onClick={launchDemo}
                disabled={!resolvedLiveUrl}
                title={resolvedLiveUrl ? "Open the live project with this session" : "Demo deployment URL is not configured"}
              >
                Open project ↗
              </button>
              <button className="btn btn-session-end" type="button" onClick={() => void revokeSession()}>
                End session
              </button>
            </div>
          </div>
        ) : (
          <div className="demo-actions">
            <div className="demo-footnote">
              One session · reusable across project pages · provider key never stored
            </div>
            <Link className="btn btn-secondary" href="/#work">
              Configure session →
            </Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      className="demo-panel"
      id={project === "portfolio" ? undefined : `${project}-demo`}
      aria-labelledby={`${project}-demo-title`}
    >
      <div className="demo-header">
        <div>
          <div className="section-kicker">Interactive demo · BYOK</div>
          <h3 id={`${project}-demo-title`}>{title}</h3>
          <p className="demo-copy">
            {description ?? "Bring your own provider key once. The credential creates a short-lived portfolio session and is not stored by the portfolio."}
          </p>
        </div>
        {hydrated && (
          <span className={`demo-status ${token ? "demo-status-ready" : creating ? "demo-status-creating" : "demo-status-idle"}`}>
            {token ? "Session active" : creating ? "Connecting…" : "Ready to connect"}
          </span>
        )}
      </div>

      {token ? (
        <div className="shared-session-card shared-session-card-active">
          <div className="shared-session-copy">
            <div className="shared-session-label">Portfolio AI session</div>
            <strong>{activeProvider} · {activeModel}</strong>
            <p>Active across the portfolio in this browser session. Your provider API key is not stored.</p>
          </div>
          <div className="demo-actions-buttons demo-session-buttons demo-session-buttons-active">
            <button
              className="btn btn-primary demo-launch-btn"
              type="button"
              onClick={launchDemo}
              disabled={!resolvedLiveUrl}
              title={resolvedLiveUrl ? "Open the live project with this session" : "Demo deployment URL is not configured"}
            >
              Open project ↗
            </button>
            <button className="btn btn-session-end" type="button" onClick={() => void revokeSession()}>
              End session
            </button>
            {project === "portfolio" && <Link className="btn btn-secondary" href="#work">Choose a project →</Link>}
          </div>
        </div>
      ) : (
        <>
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
                }}
              >
                {providers.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${project}-model`}>Model ID</label>
              <input id={`${project}-model`} value={model} onChange={(event) => setModel(event.target.value)} placeholder={selectedProvider.placeholder} spellCheck={false} />
            </div>
            <div className="field demo-key-field">
              <label htmlFor={`${project}-api-key`}>Provider API key</label>
              <input id={`${project}-api-key`} type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder={`Paste your ${selectedProvider.label} key`} autoComplete="off" spellCheck={false} />
              <span className="field-hint">Used once to create the temporary portfolio session. It is not stored by the portfolio.</span>
            </div>
          </div>
          {error && <div className="notice demo-error" role="alert">{error}</div>}
          <div className="demo-actions">
            <div className="demo-footnote">One session · reusable across project pages · provider key never stored</div>
            <button className="btn btn-primary" type="button" onClick={() => createSession({ provider, model, apiKey })} disabled={creating}>
              {creating ? "Creating secure session…" : "Start portfolio AI session →"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

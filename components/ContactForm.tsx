"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") || ""), email: String(form.get("email") || ""), message: String(form.get("message") || "") };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      setState("sent");
      event.currentTarget.reset();
    } catch { setState("error"); }
  }

  return <form className="form-stack" onSubmit={onSubmit}>
    <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required maxLength={120} /></div>
    <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={320} /></div>
    <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={6} required maxLength={5000} /></div>
    <div><button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message →"}</button></div>
    {state === "sent" && <div className="notice">Thanks — your message has been recorded.</div>}
    {state === "error" && <div className="notice">The contact service is not configured yet. Please use email or LinkedIn.</div>}
  </form>;
}

"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Password updated successfully. You can now sign in.");
      setPassword("");
      setConfirm("");
    } catch {
      setError("The recovery session is invalid or has expired. Request a new reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell admin-shell">
      <div className="section-kicker">Private admin</div>
      <h1 style={{ fontSize: 48, margin: "10px 0 18px" }}>Set a new password.</h1>

      <form className="form-stack" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div className="field">
          <label htmlFor="password">New password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {error ? <p className="notice">{error}</p> : null}
        {message ? <p className="notice">{message}</p> : null}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update password →"}
        </button>
      </form>
    </main>
  );
}

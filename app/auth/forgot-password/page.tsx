import Link from "next/link";
import { requestPasswordReset } from "../sign-in/server-actions";

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const invalidEmail = params.error === "invalid-email";

  return (
    <main className="shell admin-shell">
      <div className="section-kicker">Private admin</div>
      <h1 style={{ fontSize: 48, margin: "10px 0 18px" }}>Reset password.</h1>
      <p className="muted" style={{ maxWidth: 560, marginBottom: 28 }}>
        Enter the admin email address and we&apos;ll send a password-reset link.
      </p>

      <form className="form-stack" action={requestPasswordReset} style={{ maxWidth: 420 }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        {invalidEmail ? <p className="notice">Please enter a valid email address.</p> : null}

        <button className="btn btn-primary" type="submit">
          Send reset link →
        </button>
      </form>

      <p className="muted" style={{ marginTop: 18 }}>
        <Link href="/auth/sign-in">← Back to sign in</Link>
      </p>
    </main>
  );
}

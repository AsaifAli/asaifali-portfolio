import Link from "next/link";
import { signIn } from "./server-actions";

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

function messageFor(error?: string) {
  switch (error) {
    case "invalid-credentials":
      return "The email or password is incorrect.";
    case "supabase-not-configured":
      return "Supabase is not configured.";
    case "password-reset-sent":
      return "If the account exists, a password-reset email has been sent.";
    default:
      return "";
  }
}

export default async function SignInPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const message = messageFor(params.error);

  return (
    <main className="shell admin-shell">
      <div className="section-kicker">Private admin</div>
      <h1 style={{ fontSize: 48, margin: "10px 0 30px" }}>Sign in.</h1>

      <form className="form-stack" action={signIn} style={{ maxWidth: 420 }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {message ? <p className="notice">{message}</p> : null}

        <button className="btn btn-primary" type="submit">
          Sign in →
        </button>
      </form>

      <p className="muted" style={{ marginTop: 18 }}>
        <Link href="/auth/forgot-password">Forgot your password?</Link>
      </p>
    </main>
  );
}

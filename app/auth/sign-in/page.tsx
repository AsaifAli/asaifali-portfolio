import { signIn } from "./server-actions";

export default function SignInPage() {
  return <main className="shell admin-shell"><div className="section-kicker">Private admin</div><h1 style={{fontSize:48,margin:'10px 0 30px'}}>Sign in.</h1><form className="form-stack" action={signIn} style={{maxWidth:420}}><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div><div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" required /></div><button className="btn btn-primary" type="submit">Sign in →</button></form></main>;
}

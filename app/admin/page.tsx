import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { projects as fallback } from "@/lib/projects";

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) return <main className="shell admin-shell"><div className="section-kicker">Admin</div><h1 style={{fontSize:48}}>Supabase not configured.</h1><p className="muted">Add the two Supabase environment variables from .env.example, run supabase/schema.sql + supabase/seed.sql, then sign in with your Supabase user.</p></main>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  const { data } = await supabase.from("projects").select("slug,name,short,published").order("sort_order", { ascending: true });
  const rows = data?.length ? data : fallback;
  return <main className="shell admin-shell"><div className="section-kicker">Private admin</div><h1 style={{fontSize:48,margin:'8px 0'}}>Portfolio control room.</h1><p className="muted">Signed in as {user.email}. Project content is stored in Supabase when configured.</p><div className="admin-list">{rows.map((p:any)=><Link className="admin-row" href={`/admin/projects/${p.slug}`} key={p.slug}><span><strong>{p.name}</strong><br/><span className="muted">{p.slug}</span></span><span>{p.published === false ? "Draft" : "Published"} →</span></Link>)}</div></main>;
}

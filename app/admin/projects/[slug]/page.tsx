import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { projects as fallback } from "@/lib/projects";
import { saveProject } from "./actions";

export default async function AdminProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();
  const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/auth/sign-in");
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
  const project = data || fallback.find(p => p.slug === slug); if (!project) notFound();
  return <main className="shell admin-shell"><div className="section-kicker">Edit project</div><h1 style={{fontSize:48,margin:'8px 0 30px'}}>{project.name}</h1><form className="form-stack" action={saveProject}>
    <input type="hidden" name="slug" value={project.slug}/>
    {[["name","Name",project.name],["eyebrow","Eyebrow",project.eyebrow],["short","Short description",project.short],["description","Description",project.description],["github","GitHub URL",project.github],["status","Status",project.status]].map(([name,label,value])=><div className="field" key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} defaultValue={value as string}/></div>)}
    <div className="field"><label htmlFor="problem">Problem</label><textarea id="problem" name="problem" rows={4} defaultValue={project.problem}/></div>
    <div className="field"><label htmlFor="solution">Solution</label><textarea id="solution" name="solution" rows={4} defaultValue={project.solution}/></div>
    <div className="field"><label htmlFor="tags">Tags (comma separated)</label><input id="tags" name="tags" defaultValue={(project.tags as string[]).join(", ")}/></div>
    <label style={{display:'flex',gap:8,alignItems:'center',fontSize:13}}><input type="checkbox" name="published" defaultChecked={project.published !== false}/> Published</label>
    <button className="btn btn-primary" type="submit">Save project →</button>
  </form></main>;
}

"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/admin");
  const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/auth/sign-in");
  const slug = String(formData.get("slug") || "");
  const tags = String(formData.get("tags") || "").split(",").map(x=>x.trim()).filter(Boolean);
  const { error } = await supabase.from("projects").update({ name: String(formData.get("name")||""), eyebrow: String(formData.get("eyebrow")||""), short: String(formData.get("short")||""), description: String(formData.get("description")||""), github: String(formData.get("github")||""), status: String(formData.get("status")||""), problem: String(formData.get("problem")||""), solution: String(formData.get("solution")||""), tags, published: formData.get("published") === "on", updated_at: new Date().toISOString() }).eq("slug", slug);
  if (error) redirect(`/admin/projects/${slug}?error=save-failed`);
  redirect(`/projects/${slug}?saved=1`);
}

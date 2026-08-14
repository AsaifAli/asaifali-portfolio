import { projects as fallbackProjects, type Project } from "./projects";
import { createClient } from "./supabase/server";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  if (!supabase) return fallbackProjects;

  const { data, error } = await supabase.from("projects").select("*").eq("published", true).order("sort_order", { ascending: true });
  if (error || !data?.length) return fallbackProjects;

  return data as Project[];
}

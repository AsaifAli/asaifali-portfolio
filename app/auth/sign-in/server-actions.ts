"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configured || "http://localhost:3000";
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth/sign-in?error=supabase-not-configured");

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect("/auth/sign-in?error=invalid-credentials");
  redirect("/admin");
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth/sign-in?error=supabase-not-configured");

  const email = String(formData.get("email") || "").trim();

  if (!email) redirect("/auth/forgot-password?error=invalid-email");

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/update-password`,
  });

  // Do not reveal whether the email exists.
  redirect("/auth/sign-in?error=password-reset-sent");
}

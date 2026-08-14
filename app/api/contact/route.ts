import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: string; email?: string; message?: string } | null;
  if (!body?.name || !body.email || !body.message || body.name.length > 120 || body.email.length > 320 || body.message.length > 5000) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase is not configured" }, { status: 503 });

  const { error } = await supabase.from("contact_messages").insert({ name: body.name.trim(), email: body.email.trim(), message: body.message.trim() });
  if (error) return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

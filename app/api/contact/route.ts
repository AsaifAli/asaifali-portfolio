import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API = "https://api.resend.com/emails";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: string; email?: string; message?: string; company?: string } | null;
  if (!body?.name || !body.email || !body.message || body.name.length > 120 || body.email.length > 320 || body.message.length > 5000 || !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  if (body.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();
  let stored = false;
  let emailed = false;

  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (!error) stored = true;
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

  if (resendKey && toEmail) {
    const response = await fetch(RESEND_API, {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `${message}\n\nFrom: ${name} <${email}>`,
      }),
    });
    if (response.ok) emailed = true;
  }

  if (!stored && !emailed) {
    return NextResponse.json({ ok: false, message: "The contact service is not configured yet. Please use the email or LinkedIn links." }, { status: 503 });
  }

  return NextResponse.json({ ok: true, delivered: emailed, stored });
}

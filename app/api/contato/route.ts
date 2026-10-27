import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 422 });
  }
  const d = parsed.data;

  // honeypot preenchido: finge sucesso e descarta
  if (d.site) return NextResponse.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY não configurada");
    return NextResponse.json({ error: "O envio está indisponível no momento." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Nome", d.nome],
    ["E-mail", d.email],
    ["Empresa / Instagram", d.empresa || "—"],
    ["Serviços", d.servicos.join(", ") || "—"],
    ["Mensagem", d.mensagem || "—"],
  ];
  // API REST do Resend (https://resend.com/docs/api-reference/emails/send-email)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Site Juá <site@jua.agency>",
      to: [process.env.CONTACT_TO || "ola@jua.agency"],
      reply_to: d.email,
      subject: `Novo contato pelo site: ${d.nome}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="8" style="font-family:sans-serif;font-size:15px">${rows
        .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top"><b>${k}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
    }),
  }).catch((e: unknown) => {
    console.error("Resend:", e);
    return null;
  });

  if (!res?.ok) {
    if (res) console.error("Resend:", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Não foi possível enviar." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

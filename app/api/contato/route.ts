import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";
import { rateLimited } from "@/lib/rateLimit";
import { site } from "@/content/site";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
// tira quebras de linha de campos que vão pro assunto/cabeçalho do e-mail
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

const MAX_BODY = 16 * 1024;

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // alguns navegadores não mandam em POST do mesmo site
  try {
    const host = new URL(origin).host;
    return host === req.headers.get("host") || host === new URL(site.url).host || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ error: "Formato inválido." }, { status: 415 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Tente de novo em alguns minutos." }, { status: 429 });
  }

  const raw = await req.text().catch(() => "");
  if (raw.length > MAX_BODY) return NextResponse.json({ error: "Mensagem grande demais." }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
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
    // sem e-mail configurado o contato segue só pelo WhatsApp
    return NextResponse.json({ ok: true, email: false });
  }

  const rows: [string, string][] = [
    ["Nome", d.nome],
    ["E-mail", d.email],
    ["Empresa / Instagram", d.empresa || "—"],
    ["Serviços", d.servicos.join(", ") || "—"],
    ["Plano / projeto", d.plano || "—"],
    ["Mensagem", d.mensagem || "—"],
  ];
  // API REST do Resend (https://resend.com/docs/api-reference/emails/send-email)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Site Juá <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || site.contact.email],
      reply_to: d.email,
      subject: `Novo contato pelo site: ${oneLine(d.nome)}`,
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
    if (res) console.error("Resend:", res.status);
    return NextResponse.json({ error: "Não foi possível enviar." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

// qualquer outro método nessa rota
export function GET() {
  return NextResponse.json({ error: "Método não permitido." }, { status: 405, headers: { Allow: "POST" } });
}

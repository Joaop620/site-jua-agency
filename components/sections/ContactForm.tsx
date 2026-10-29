"use client";

import { useEffect, useRef, useState } from "react";
import { formServices, site } from "@/content/site";
import { JuaSymbol } from "../JuaSymbol";

type Status = "idle" | "sent";
type Errors = Partial<Record<"nome" | "email", string>>;

const DRAFT = "jua-contato";
const FIELDS = ["nome", "email", "empresa", "mensagem"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [plano, setPlano] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const form = useRef<HTMLFormElement>(null);

  // plano escolhido na seção de preços
  useEffect(() => {
    const on = (e: Event) => setPlano((e as CustomEvent<string>).detail);
    addEventListener("jua:plan", on);
    return () => removeEventListener("jua:plan", on);
  }, []);

  // rascunho: se a pessoa sair e voltar, o que ela digitou continua lá
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT) || "null");
      if (!d || !form.current || Date.now() - (d.ts ?? 0) > 7 * 864e5) return;
      for (const f of FIELDS) {
        const el = form.current.elements.namedItem(f) as HTMLInputElement | null;
        if (el && d[f] && !el.value) el.value = d[f];
      }
      if (Array.isArray(d.servicos)) setPicked((p) => (p.length ? p : d.servicos));
      if (d.plano) setPlano((p) => p || d.plano);
    } catch {}
  }, []);

  const saveDraft = () => {
    if (!form.current) return;
    const fd = new FormData(form.current);
    const d: Record<string, unknown> = { servicos: picked, plano, ts: Date.now() };
    for (const f of FIELDS) d[f] = String(fd.get(f) ?? "");
    try {
      localStorage.setItem(DRAFT, JSON.stringify(d));
    } catch {}
  };

  useEffect(saveDraft, [picked, plano]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const on = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      setPicked((p) => (p.includes(v) ? p : [...p, v]));
    };
    addEventListener("jua:pick", on);
    return () => removeEventListener("jua:pick", on);
  }, []);

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
      site: String(fd.get("site") ?? ""),
      servicos: picked,
      plano,
    };
    const errs: Errors = {};
    if (!data.nome.trim()) errs.nome = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errs.email = "Informe um e-mail válido.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.nome ? "fn" : "fe")?.focus();
      return;
    }
    // monta a mensagem e abre o WhatsApp da Juá já com tudo preenchido
    const lines = [
      "Olá! Vim pelo site da Juá e gostaria de solicitar um orçamento.",
      "",
      `*Nome:* ${data.nome.trim()}`,
      `*E-mail:* ${data.email.trim()}`,
      data.empresa.trim() ? `*Empresa/Instagram:* ${data.empresa.trim()}` : null,
      picked.length ? `*Interesse:* ${picked.join(", ")}` : null,
      plano ? `*Plano/projeto:* ${plano}` : null,
      data.mensagem.trim() ? `\n*Sobre o negócio:* ${data.mensagem.trim()}` : null,
    ].filter((l) => l !== null);
    const url = `${site.contact.whatsapp.href}?text=${encodeURIComponent(lines.join("\n"))}`;
    // abre no mesmo clique (sem await antes) pra não ser bloqueado como pop-up
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;

    // cópia por e-mail, se o Resend estiver configurado (falha em silêncio)
    fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});

    setWaUrl(url);
    setStatus("sent");
    requestAnimationFrame(() => {
      const ok = document.getElementById("form-ok");
      ok?.scrollIntoView({ block: "center", behavior: "smooth" });
      ok?.focus({ preventScroll: true });
    });
    try {
      localStorage.removeItem(DRAFT);
    } catch {}
  }

  if (status === "sent") {
    return (
      <div className="form form-ok" id="form-ok" role="status" tabIndex={-1}>
        <JuaSymbol size={72} />
        <h3>Quase lá!</h3>
        <p className="sub">O WhatsApp foi aberto com a sua mensagem pronta. Basta tocar em enviar para combinarmos a primeira reunião.</p>
        <p className="form-privacy">Prefere e-mail? Escreva para {site.contact.email}.</p>
        <a className="btn btn-n" href={waUrl} target="_blank" rel="noopener noreferrer">
          Abrir o WhatsApp de novo
        </a>
      </div>
    );
  }

  return (
    <form className="form rv" id="form" ref={form} onSubmit={submit} onInput={saveDraft} noValidate>
      <h3>Solicite seu orçamento</h3>
      <p className="sub">Sem compromisso e sem custo.</p>
      <div className="f-row">
        <div className="field">
          <label htmlFor="fn">Seu nome</label>
          <input
            id="fn"
            name="nome"
            placeholder="Como prefere ser chamado(a)?"
            required
            autoComplete="name"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "fn-err" : undefined}
          />
          {errors.nome && (
            <span id="fn-err" className="err">
              {errors.nome}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="fe">E-mail</label>
          <input
            id="fe"
            name="email"
            type="email"
            placeholder="voce@empresa.com"
            required
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "fe-err" : undefined}
          />
          {errors.email && (
            <span id="fe-err" className="err">
              {errors.email}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="fc">Empresa ou @ do Instagram</label>
        <input id="fc" name="empresa" placeholder="@suamarca" autoComplete="organization" />
      </div>
      <div className="field hp" aria-hidden="true">
        <label htmlFor="fs">Deixe em branco</label>
        <input id="fs" name="site" tabIndex={-1} autoComplete="off" />
      </div>
      {plano && (
        <div className="plan-pick" role="status">
          <span>
            <span className="label">Escolha</span> {plano}
          </span>
          <button type="button" onClick={() => setPlano("")} aria-label="Remover escolha">
            ×
          </button>
        </div>
      )}
      <fieldset className="field">
        <legend className="lab">O que você precisa?</legend>
        <div className="chips">
          {formServices.map((s) => (
            <button key={s} type="button" aria-pressed={picked.includes(s)} onClick={() => toggle(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="fm">Fale sobre o seu negócio</label>
        <textarea id="fm" name="mensagem" placeholder="O que você vende, para quem e o que gostaria de mudar na sua marca." />
      </div>
      <button className="btn btn-n" type="submit">
        Enviar pelo WhatsApp
      </button>
      <p className="form-privacy">Ao enviar, o WhatsApp abre com a sua mensagem pronta. Seus dados são usados apenas para responder ao contato (<a href="/privacidade">privacidade</a>).</p>
    </form>
  );
}

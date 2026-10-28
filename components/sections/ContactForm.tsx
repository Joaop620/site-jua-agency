"use client";

import { useEffect, useRef, useState } from "react";
import { formServices } from "@/content/site";
import { JuaSymbol } from "../JuaSymbol";

type Status = "idle" | "loading" | "sent" | "error";
type Errors = Partial<Record<"nome" | "email", string>>;

const DRAFT = "jua-contato";
const FIELDS = ["nome", "email", "empresa", "mensagem"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState("");
  const [plano, setPlano] = useState("");
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
      if (!d || !form.current) return;
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
    const d: Record<string, unknown> = { servicos: picked, plano };
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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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
    if (!data.nome.trim()) errs.nome = "Conta pra gente como te chamar.";
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errs.email = "Esse e-mail não parece válido.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.nome ? "fn" : "fe")?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Não foi possível enviar.");
      }
      setStatus("sent");
      try {
        localStorage.removeItem(DRAFT);
      } catch {}
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Não foi possível enviar.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form form-ok" role="status">
        <JuaSymbol size={72} />
        <h3>Recebemos!</h3>
        <p className="sub">A gente volta em breve pra marcar a conversa.</p>
      </div>
    );
  }

  return (
    <form className="form rv" ref={form} onSubmit={submit} onInput={saveDraft} noValidate aria-busy={status === "loading"}>
      <h3>Vamos conversar</h3>
      <p className="sub">Sem compromisso e sem enrolação.</p>
      <div className="f-row">
        <div className="field">
          <label htmlFor="fn">Seu nome</label>
          <input
            id="fn"
            name="nome"
            placeholder="Como podemos te chamar?"
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
        <label htmlFor="fm">Conta um pouco do seu negócio</label>
        <textarea id="fm" name="mensagem" placeholder="O que você vende, pra quem, e o que gostaria de mudar na sua marca." />
      </div>
      <button className="btn btn-n" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <span className="spin" aria-hidden="true" /> Enviando…
          </>
        ) : (
          <>
            Enviar <span className="arr" aria-hidden="true">→</span>
          </>
        )}
      </button>
      <p className="form-privacy">A gente usa seus dados só pra responder esta mensagem.</p>
      {status === "error" && (
        <p className="form-err" role="alert">
          {msg} Tente de novo ou escreva pra ola@jua.agency.
        </p>
      )}
    </form>
  );
}

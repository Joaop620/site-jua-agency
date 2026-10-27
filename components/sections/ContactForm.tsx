"use client";

import { useEffect, useState } from "react";
import { formServices } from "@/content/site";
import { JuaSymbol } from "../JuaSymbol";

type Status = "idle" | "loading" | "sent" | "error";
type Errors = Partial<Record<"nome" | "email", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState("");

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
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Não foi possível enviar.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form form-ok rv in" role="status">
        <JuaSymbol size={72} />
        <div className="ok-log mono" aria-hidden="true">
          <span>&gt; POST /api/contato</span>
          <span className="pink">200 OK · mensagem entregue</span>
        </div>
        <h3>Recebemos!</h3>
        <p className="sub">A gente volta em breve pra marcar a conversa.</p>
      </div>
    );
  }

  return (
    <form className="form rv" onSubmit={submit} noValidate aria-busy={status === "loading"}>
      <div className="form-head">
        <div>
          <h3>Vamos conversar</h3>
          <p className="sub">Sem compromisso e sem enrolação.</p>
        </div>
        <span className="form-tag mono" aria-hidden="true">
          FORM_01
        </span>
      </div>
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
            Enviar <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      {status === "error" && (
        <p className="form-err" role="alert">
          {msg} Tente de novo ou escreva pra ola@jua.agency.
        </p>
      )}
    </form>
  );
}

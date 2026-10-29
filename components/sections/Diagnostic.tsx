"use client";

import { useState } from "react";
import { signs } from "@/content/site";

export function Diagnostic() {
  const [on, setOn] = useState<boolean[]>(() => signs.map(() => false));
  const n = on.filter(Boolean).length;

  return (
    <section className="sec light" id="diagnostico" aria-labelledby="diag-title">
      <div className="wrap diag-grid">
        <div className="diag-head">
          <div className="kick">Diagnóstico rápido</div>
          <h2 id="diag-title" className="h h-l rv">
            4 sinais de que a sua marca está afastando clientes.
          </h2>
          <p className="lead rv" style={{ marginTop: 28 }}>
            Marque os que você reconhece. Leva 30 segundos.
          </p>
        </div>
        <div>
          <div className="diag-list">
            {signs.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className="sign rv"
                aria-pressed={on[i]}
                onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))}
              >
                <span className="it">0{i + 1}</span>
                <span>
                  <strong>{s.title}</strong>
                  <span className="t">{s.text}</span>
                </span>
                <span className="box" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="diag-result" aria-live="polite">
            <p>
              {n === 0 ? (
                "Marque os sinais que você reconhece."
              ) : n === 1 ? (
                <>
                  <span className="count">1</span> sinal. Vale atenção.
                </>
              ) : (
                <>
                  <span className="count">{n}</span> sinais. É hora de rever a sua marca.
                </>
              )}
            </p>
            {n >= 2 && (
              <div className="diag-ctas">
                <a className="btn btn-p" href="#contato">
                  Solicitar orçamento
                </a>
                <a className="btn btn-g" href="#planos">
                  Ver planos
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

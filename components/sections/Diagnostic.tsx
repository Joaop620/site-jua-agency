"use client";

import { useState } from "react";
import { signs } from "@/content/site";

export function Diagnostic() {
  const [on, setOn] = useState<boolean[]>(() => signs.map(() => false));
  const n = on.filter(Boolean).length;
  const pct = Math.round((n / signs.length) * 100);

  return (
    <section className="sec diag" id="diagnostico" aria-labelledby="diag-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap diag-grid">
        <div>
          <div className="kick mono">Diagnóstico rápido</div>
          <h2 id="diag-title" className="h h-l">
            4 sinais de que a sua marca está <i className="pink">afastando</i> clientes.
          </h2>
          <p className="lead" style={{ marginTop: 28 }}>
            Clique nos que você reconhece. Leva 30 segundos.
          </p>
        </div>
        <div className="console">
          <div className="console-bar mono" aria-hidden="true">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span>brand-scan — v1.0</span>
            <span>{n}/4</span>
          </div>
          <div className="diag-list">
            {signs.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className="sign"
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
          <div className="meter" aria-hidden="true">
            <div className="meter-head mono">
              <span>Risco de marca</span>
              <span className="pink">{pct}%</span>
            </div>
            <div className="meter-track">
              {signs.map((_, i) => (
                <span key={i} data-on={i < n || undefined} />
              ))}
            </div>
          </div>
          <div className="diag-result" aria-live="polite">
            <p>
              {n === 0 ? (
                "Marque os sinais que você reconhece."
              ) : n === 1 ? (
                <>
                  <span className="count">1</span> sinal. Vale ficar de olho.
                </>
              ) : (
                <>
                  <span className="count">{n}</span> sinais. Então vale a gente conversar.
                </>
              )}
            </p>
            {n >= 2 && (
              <a className="btn btn-p" href="#contato">
                Vamos conversar <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

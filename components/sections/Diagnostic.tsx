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
          <div className="kick label">Diagnóstico rápido</div>
          <h2 id="diag-title" className="h h-l rv">
            4 sinais de que a sua marca está <i className="mag">afastando</i> clientes.
          </h2>
          <p className="lead rv" style={{ marginTop: 28 }}>
            Clique nos que você reconhece. Leva 30 segundos.
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
                Vamos conversar <span className="arr" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

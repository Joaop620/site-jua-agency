"use client";

import { useState } from "react";
import { services } from "@/content/site";
import { PickLink } from "../PickLink";

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section className="sec light" id="servicos" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick mono">O que fazemos</div>
            <h2 id="svc-title" className="h h-l rv">
              Quatro frentes. <i className="mag">Um só</i> objetivo: vender mais.
            </h2>
          </div>
          <p className="lead rv">Dá pra começar por uma delas ou fazer tudo junto. A gente ajuda você a decidir por onde começar.</p>
        </div>
        <div className="svc-list">
          {services.map((s, i) => {
            const on = open === i;
            return (
              <article className="svc rv" key={s.title} data-open={on || undefined}>
                <h3 className="svc-h">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`svc-${i}`}
                    id={`svc-b-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    <span className="svc-n">{s.n}</span>
                    <span className="svc-t">{s.title}</span>
                    <span className="svc-a mono">{s.area}</span>
                    <span className="svc-x" aria-hidden="true" />
                  </button>
                </h3>
                <div className="svc-body" id={`svc-${i}`} role="region" aria-labelledby={`svc-b-${i}`}>
                  <div className="svc-inner">
                    <p className="d">{s.text}</p>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    <PickLink className="btn btn-d" pick={s.pick}>
                      Quero esse <span className="arr" aria-hidden="true">→</span>
                    </PickLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="svc-all rv">
          <p>
            Precisa de <i>tudo junto?</i> A gente monta um projeto só, com um cronograma só.
          </p>
          <PickLink className="btn btn-p" pick="Tudo junto">
            Montar meu projeto <span className="arr" aria-hidden="true">→</span>
          </PickLink>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { faq, site } from "@/content/site";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="sec light faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <div className="kick">Dúvidas frequentes</div>
          <h2 id="faq-title" className="h h-l rv">
            Antes de começar.
          </h2>
          <p className="lead rv">
            Não encontrou sua dúvida? Fale conosco pelo{" "}
            <a className="ul" href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
        <div className="faq-list">
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <div className="qa rv" key={f.q} data-open={on || undefined}>
                <h3 className="qa-h">
                  <button type="button" aria-expanded={on} aria-controls={`qa-${i}`} id={`qa-b-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="svc-x" aria-hidden="true" />
                  </button>
                </h3>
                <div className="qa-body" id={`qa-${i}`} role="region" aria-labelledby={`qa-b-${i}`}>
                  <div className="qa-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

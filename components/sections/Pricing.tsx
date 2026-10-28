"use client";

import { useEffect, useRef, useState } from "react";
import { launchPromo, planCompare, plans, projectPrices, promoPrice, semesterDiscount } from "@/content/site";
import { AnimatedNumber } from "../AnimatedNumber";

type Billing = "mensal" | "semestral";

const brl = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** Avisa o formulário qual plano/serviço foi escolhido. */
function choose(plan: string, service: string) {
  window.dispatchEvent(new CustomEvent("jua:plan", { detail: plan }));
  window.dispatchEvent(new CustomEvent("jua:pick", { detail: service }));
}

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="tick">
    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("mensal");
  const factor = billing === "semestral" ? 1 - semesterDiscount : 1;
  const off = Math.round(semesterDiscount * 100);
  const promoOff = Math.round(launchPromo.discount * 100);
  const list = useRef<HTMLDivElement>(null);

  // no carrossel do celular, começa mostrando o plano recomendado
  useEffect(() => {
    const el = list.current;
    if (!el || !matchMedia("(max-width: 640px)").matches) return;
    const featured = el.querySelector<HTMLElement>("[data-featured]");
    if (featured) el.scrollLeft = featured.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft);
  }, []);

  return (
    <section className="sec pricing" id="planos" aria-labelledby="price-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick label">Planos e preços</div>
            <h2 id="price-title" className="h h-l rv">
              Preço claro, <i className="pink">sem surpresa</i>.
            </h2>
          </div>
          <p className="lead rv">
            Planos mensais pra quem quer constância nas redes, e projetos com preço de partida pra marca e site. Tudo começa
            com uma conversa.
          </p>
        </div>

        {launchPromo.active && (
          <div className="promo rv">
            <span className="promo-tag">−{promoOff}%</span>
            <p>
              <strong>{launchPromo.label}.</strong> {promoOff}% de desconto em todos os planos e projetos, para{" "}
              {launchPromo.until}.
            </p>
          </div>
        )}

        <div className="bill rv" role="group" aria-label="Forma de contratação">
          <div className="bill-switch" data-on={billing}>
            <span className="bill-pill" aria-hidden="true" />
            <button type="button" aria-pressed={billing === "mensal"} onClick={() => setBilling("mensal")}>
              Mensal
            </button>
            <button type="button" aria-pressed={billing === "semestral"} onClick={() => setBilling("semestral")}>
              Semestral <span className="bill-off">−{off}%</span>
            </button>
          </div>
          <p className="bill-note" aria-live="polite">
            {billing === "semestral"
              ? `Compromisso de 6 meses, com ${off}% de desconto em todas as mensalidades.`
              : "Sem fidelidade: cancela com 30 dias de aviso."}
          </p>
        </div>

        <div className="plans" ref={list}>
          {plans.map((p, i) => {
            const base = promoPrice(p.price);
            const month = Math.round((base * factor) / 10) * 10;
            const label = `${p.name} (${billing})`;
            return (
              <article className="plan rv" key={p.id} data-featured={p.featured || undefined} style={{ ["--d" as string]: i }}>
                <div className="plan-top">
                  <h3>{p.name}</h3>
                  {p.featured && <span className="plan-tag label">Recomendado</span>}
                </div>
                <p className="plan-line">{p.tagline}</p>
                {(launchPromo.active || billing === "semestral") && (
                  <p className="plan-was">
                    <span className="sr">Antes:</span>
                    <s>R$ {brl.format(p.price)}</s>
                  </p>
                )}
                <p className="plan-price">
                  <span className="cur">R$</span>
                  <span className="num">
                    <AnimatedNumber value={month} />
                  </span>
                  <span className="per it">/mês</span>
                </p>
                <p className="plan-sub label">
                  {billing === "semestral" ? (
                    <>
                      R$ {brl.format(month * 6)} no semestre
                      {launchPromo.active ? ` · inauguração −${promoOff}% + semestral −${off}%` : ` · semestral −${off}%`}
                    </>
                  ) : (
                    launchPromo.active ? `${launchPromo.label}, cobrado todo mês` : "Cobrado todo mês"
                  )}
                </p>
                <a className={`btn ${p.featured ? "btn-d" : "btn-g"}`} href="#form" onClick={() => choose(label, "Social media")}>
                  Quero o {p.name} <span className="arr" aria-hidden="true">→</span>
                </a>
                <ul className="plan-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="plans-hint" aria-hidden="true">
          Arraste pro lado pra ver os outros planos →
        </p>

        <details className="compare rv">
          <summary>
            <span>Comparar os planos</span>
            <span className="compare-x" aria-hidden="true" />
          </summary>
          <div className="compare-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr">Item</span>
                  </th>
                  {plans.map((p) => (
                    <th scope="col" key={p.id} data-featured={p.featured || undefined}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planCompare.map(([item, ...vals]) => (
                  <tr key={item}>
                    <th scope="row">{item}</th>
                    {vals.map((v, j) => (
                      <td key={j} data-featured={plans[j]?.featured || undefined}>
                        {v === "✓" ? (
                          <>
                            <Check />
                            <span className="sr">Incluído</span>
                          </>
                        ) : v === "—" ? (
                          <>
                            <span aria-hidden="true" className="dash">
                              —
                            </span>
                            <span className="sr">Não incluído</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <div className="projects-price">
          <div className="pp-head rv">
            <h3 className="h h-m">
              Projetos <i className="pink">sob medida</i>
            </h3>
            <p className="lead">Pagamento único, parcelado em até 3x. O valor final sai na proposta, depois da primeira conversa.</p>
          </div>
          <ul className="pp-list">
            {projectPrices.map((p) => (
              <li className="pp rv" key={p.name}>
                <div className="pp-main">
                  <h4>{p.name}</h4>
                  <p>{p.text}</p>
                </div>
                <span className="pp-time label">{p.time}</span>
                <p className="pp-price">
                  <span className="label">a partir de</span>
                  {launchPromo.active && (
                    <s className="pp-was">
                      <span className="sr">Antes:</span> R$ {brl.format(p.from)}
                    </s>
                  )}
                  R$ {brl.format(promoPrice(p.from))}
                </p>
                <a className="pp-cta" href="#form" onClick={() => choose(p.name, p.pick)} aria-label={`Pedir proposta de ${p.name}`}>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

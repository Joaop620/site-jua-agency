"use client";

import { useState } from "react";
import { AnimatedNumber } from "../AnimatedNumber";
import { launchPromo, planCompare, plans, projectPrices, promoPrice, semesterDiscount } from "@/content/site";
import { scrollToForm } from "@/lib/scrollToForm";

const brl = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const round10 = (n: number) => Math.round(n / 10) * 10;

/** Avisa o formulário qual plano/serviço foi escolhido. */
function choose(e: React.MouseEvent, plan: string, service: string) {
  window.dispatchEvent(new CustomEvent("jua:plan", { detail: plan }));
  window.dispatchEvent(new CustomEvent("jua:pick", { detail: service }));
  scrollToForm(e);
}

type Billing = "mensal" | "semestral";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("mensal");
  const off = Math.round(semesterDiscount * 100);
  const promoOff = Math.round(launchPromo.discount * 100);

  return (
    <section className="sec pricing" id="planos" aria-labelledby="price-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="kick">Planos e preços</p>
            <h2 id="price-title" className="h h-l rv">
              Preço claro, sem surpresa.
            </h2>
          </div>
          <p className="lead rv">
            Planos mensais pra quem quer constância nas redes, e projetos com preço de partida pra marca e site. Tudo começa
            com uma conversa.
          </p>
        </div>

        {launchPromo.active && (
          <p className="promo rv">
            <strong>{launchPromo.label}.</strong> {promoOff}% de desconto em todos os planos e projetos, para{" "}
            {launchPromo.until}.
          </p>
        )}

        <div className="price-row">
          <h3 className="price-sub">Social media, por mês</h3>
          <div className="bill" role="group" aria-label="Forma de contratação">
            <div className="bill-switch" data-on={billing}>
              <span className="bill-pill" aria-hidden="true" />
              <button type="button" aria-pressed={billing === "mensal"} onClick={() => setBilling("mensal")}>
                Mensal
              </button>
              <button type="button" aria-pressed={billing === "semestral"} onClick={() => setBilling("semestral")}>
                Semestral <span className="bill-off">−{off}%</span>
              </button>
            </div>
          </div>
        </div>
        <div className="plans">
          {plans.map((p) => {
            const month = promoPrice(p.price);
            const semester = round10(month * (1 - semesterDiscount));
            const shown = billing === "semestral" ? semester : month;
            return (
              <article className="plan rv" key={p.id} data-featured={p.featured || undefined}>
                <div className="plan-name">
                  <h4>
                    {p.name}
                    {p.featured && <span className="plan-tag">Recomendado</span>}
                  </h4>
                  <p>{p.tagline}</p>
                </div>
                <ul className="plan-list">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="plan-price">
                  {launchPromo.active && (
                    <s className="plan-was">
                      <span className="sr">Antes: </span>R$ {brl.format(p.price)}
                    </s>
                  )}
                  <p className="plan-now">
                    R$ <AnimatedNumber value={shown} />
                    <span>/mês</span>
                  </p>
                  <p className="plan-sem">
                    {billing === "semestral"
                      ? `R$ ${brl.format(semester * 6)} no semestre`
                      : `ou R$ ${brl.format(semester)}/mês no semestral`}
                  </p>
                  <a className="btn btn-p btn-sm" href="#form" onClick={(e) => choose(e, `${p.name} (${billing})`, "Social media")}>
                    Quero esse plano
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="price-note">
          Mensal sem fidelidade: cancela com 30 dias de aviso. No semestral, cada mensalidade sai {off}% mais barata.
        </p>

        <details className="compare rv">
          <summary>Comparar os planos item por item</summary>
          <div className="compare-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr">Item</span>
                  </th>
                  {plans.map((p) => (
                    <th scope="col" key={p.id}>
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
                      <td key={j}>{v === "✓" ? "Sim" : v === "—" ? <span className="dash">Não</span> : v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <h3 className="price-sub">Projetos, pagamento único</h3>
        <ul className="pp-list">
          {projectPrices.map((p) => (
            <li className="pp rv" key={p.name}>
              <div className="pp-main">
                <h4>{p.name}</h4>
                <p>{p.text}</p>
              </div>
              <span className="pp-time">{p.time}</span>
              <p className="pp-price">
                <span>a partir de</span>
                {launchPromo.active && (
                  <s className="pp-was">
                    <span className="sr">Antes: </span>R$ {brl.format(p.from)}
                  </s>
                )}
                R$ {brl.format(promoPrice(p.from))}
              </p>
              <a className="link pp-cta" href="#form" onClick={(e) => choose(e, p.name, p.pick)}>
                Pedir proposta
              </a>
            </li>
          ))}
        </ul>
        <p className="price-note">Projetos parcelados em até 3x. O valor final sai na proposta, depois da primeira conversa.</p>
      </div>
    </section>
  );
}

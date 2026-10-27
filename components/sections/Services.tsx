import { services } from "@/content/site";
import { PickLink } from "../PickLink";

export function Services() {
  return (
    <section className="sec svc-sec" id="servicos" aria-labelledby="svc-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick mono">O que fazemos</div>
            <h2 id="svc-title" className="h h-l">
              Quatro frentes. <i className="pink">Um só</i> objetivo: vender mais.
            </h2>
          </div>
          <p className="lead">Dá pra começar por uma delas ou fazer tudo junto. A gente ajuda você a decidir por onde começar.</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <article className="svc rv" key={s.title} data-spot>
              <div className="svc-top">
                <span className="svc-n">{s.n}</span>
                <span className="svc-id mono">
                  SVC_0{i + 1} <span className="dim">/</span> {s.area}
                </span>
              </div>
              <h3 className="h h-m">{s.title}</h3>
              <p className="d">{s.text}</p>
              <ul>
                {s.items.map((it, j) => (
                  <li key={it}>
                    <span className="mono li-n">{String(j + 1).padStart(2, "0")}</span>
                    {it}
                  </li>
                ))}
              </ul>
              <PickLink className="btn btn-g" pick={s.pick}>
                Quero esse <span aria-hidden="true">→</span>
              </PickLink>
            </article>
          ))}
        </div>
        <div className="svc-all rv">
          <p>
            Precisa de <i>tudo junto?</i> A gente monta um projeto só, com um cronograma só.
          </p>
          <PickLink className="btn btn-n" pick="Tudo junto">
            Montar meu projeto <span aria-hidden="true">→</span>
          </PickLink>
        </div>
      </div>
    </section>
  );
}

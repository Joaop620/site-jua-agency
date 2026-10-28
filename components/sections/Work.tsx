import Link from "next/link";
import { projects, site } from "@/content/site";
import { Media } from "../Placeholder";

const sizes = {
  tall: "(max-width: 1000px) 100vw, 640px",
  wide: "(max-width: 1000px) 100vw, 600px",
  half: "(max-width: 1000px) 100vw, 640px",
  full: "(max-width: 1320px) 100vw, 1220px",
};

export function Work() {
  return (
    <section className="sec work" id="trabalhos" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick label">Trabalhos recentes</div>
            <h2 id="work-title" className="h h-l rv">
              Marcas que <i className="pink">brilham</i> no escuro.
            </h2>
          </div>
          <p className="lead rv">Alguns projetos que saíram daqui. Cada um começou com uma conversa.</p>
        </div>
        <div className="cases-grid">
          {projects.map((pr, i) => (
            <Link className={`case rv case-${pr.layout}`} href={`/trabalhos/${pr.slug}`} key={pr.slug}>
              <div className="case-img">
                <div className="case-par" data-speed="-0.06">
                  <Media src={pr.image} alt={pr.title} label="Capa do projeto" sizes={sizes[pr.layout]} priority={i === 0} />
                </div>
              </div>
              <div className="case-meta">
                <h3 className="h h-s">
                  <span className="ul">{pr.title}</span>
                </h3>
                <span className="label">
                  {pr.services.slice(0, 2).join(" · ")} · {pr.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="work-more rv">
          <p>Tem mais trabalho no nosso Behance.</p>
          <a className="btn btn-g" href={site.contact.behance.href} target="_blank" rel="noopener noreferrer">
            Ver no Behance <span className="arr" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

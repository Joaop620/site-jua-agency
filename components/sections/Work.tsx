import Link from "next/link";
import { projects } from "@/content/site";
import { Media } from "../Placeholder";

export function Work() {
  return (
    <section className="sec work" id="trabalhos" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick mono">Trabalhos recentes</div>
            <h2 id="work-title" className="h h-l rv">
              Marcas que <i className="pink">brilham</i> no escuro.
            </h2>
          </div>
          <p className="lead rv">Alguns projetos que saíram daqui. Cada um começou com uma conversa.</p>
        </div>
        <div className="cases-grid">
          {projects.map((pr) => (
            <Link className={`case rv case-${pr.layout}`} href={`/trabalhos/${pr.slug}`} key={pr.slug}>
              <div className="case-img">
                <div className="case-par" data-speed="-0.07">
                  <Media
                  src={pr.image}
                  alt={pr.title}
                  label={pr.layout === "tall" ? "Foto do projeto principal · 4:5" : "Foto do projeto · 16:10"}
                  sizes={pr.layout === "tall" ? "(max-width: 1000px) 100vw, 640px" : "(max-width: 1000px) 100vw, 600px"}
                  />
                </div>
              </div>
              <div className="case-meta">
                <h3 className="h h-s">
                  <span className="ul">{pr.title}</span>
                </h3>
                <span className="mono">
                  {pr.services.join(" · ")}
                  {pr.services.length < 2 ? ` · ${pr.year}` : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { projects } from "@/content/site";
import { Media } from "../Placeholder";

export function Work() {
  return (
    <section className="sec" id="trabalhos" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick mono">Trabalhos recentes</div>
            <h2 id="work-title" className="h h-l">
              Marcas que <i className="pink">brilham</i> no escuro.
            </h2>
          </div>
          <p className="lead">Alguns projetos que saíram daqui. Cada um começou com uma conversa.</p>
        </div>
        <div className="cases-grid">
          {projects.map((pr, i) => (
            <Link className={`case rv case-${pr.layout}`} href={`/trabalhos/${pr.slug}`} key={pr.slug}>
              <div className="case-img">
                <Media
                  src={pr.image}
                  alt={pr.title}
                  label={pr.layout === "tall" ? "Foto do projeto principal · 4:5" : "Foto do projeto · 16:10"}
                  sizes={pr.layout === "tall" ? "(max-width: 960px) 100vw, 640px" : "(max-width: 960px) 100vw, 600px"}
                  seed={i}
                />
                <span className="case-tag mono">
                  #{String(i + 1).padStart(3, "0")} <span className="dim">·</span> {pr.year}
                </span>
                <span className="case-scan" aria-hidden="true" />
              </div>
              <div className="case-meta">
                <h3 className="h h-s">{pr.title}</h3>
                <span className="mono">{pr.services.join(" · ")}{pr.services.length < 2 ? ` · ${pr.year}` : ""}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

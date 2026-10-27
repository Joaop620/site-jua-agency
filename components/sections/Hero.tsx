import { site } from "@/content/site";
import { HeroCanvas } from "../HeroCanvas";
import { Scramble } from "../Scramble";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <div className="term mono" aria-hidden="true">
            <span className="pink">&gt;</span> init jua.agency <span className="dim">--mode=</span>vender
            <span className="caret" />
          </div>
          <div className="kick mono">Agência criativa · Branding, design e social</div>
          <h1 id="hero-title" className="h h-xl">
            Bonito é o começo. <i className="pink"><Scramble text="Vender" delay={350} /></i> é o ponto.
          </h1>
          <p className="lead">
            A Juá cria marcas, conteúdo e sites com design bonito, estratégia clara e resultado que dá pra medir.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-p" href="#contato">
              Agendar uma conversa <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-g" href="#servicos">
              Ver serviços
            </a>
          </div>
        </div>
        <div className="hero-art">
          <span className="hud-corner tl" aria-hidden="true" />
          <span className="hud-corner tr" aria-hidden="true" />
          <span className="hud-corner bl" aria-hidden="true" />
          <span className="hud-corner br" aria-hidden="true" />
          <HeroCanvas />
          <div className="hud-read mono" aria-hidden="true">
            <span>OBJ / LUA_CRESCENTE</span>
            <span>FASE 01 → 04</span>
          </div>
          {site.agenda.open && (
            <div className="chip chip-a">
              <span className="dot" aria-hidden="true" />
              Agenda aberta · {site.agenda.month}
            </div>
          )}
          <div className="chip chip-b">
            <span className="mono">est. 2026</span>
          </div>
        </div>
      </div>
      <div className="hero-foot mono wrap" aria-hidden="true">
        <span>Role pra baixo ↓</span>
        <span className="hero-coords">LAT -23.5505 · LON -46.6333</span>
        <span>{site.tagline}</span>
      </div>
    </section>
  );
}

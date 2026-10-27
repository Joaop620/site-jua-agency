"use client";

import { site } from "@/content/site";
import { Moon, type MoonLayout } from "../Moon";
import { useScrollProgress } from "../useScrollProgress";

const layout = (w: number, h: number): MoonLayout =>
  w < 760
    ? { cx: w * 0.5, cy: h * 0.36, r: Math.min(w * 0.5, h * 0.28) }
    : { cx: w * 0.64, cy: h * 0.46, r: Math.min(h * 0.41, w * 0.31) };

export function Hero() {
  const { el, p } = useScrollProgress<HTMLElement>("pin");

  return (
    <section className="hero" ref={el} aria-labelledby="hero-title">
      <div className="hero-pin">
        <Moon className="hero-moon" layout={layout} getPhase={() => 110 - p.current * 80} stars />
        <div className="wrap hero-frame">
          <div className="hero-top mono">
            <span>Agência criativa · Branding, design e social</span>
            {site.agenda.open && (
              <span>
                Agenda aberta · {site.agenda.month} {site.agenda.year}
              </span>
            )}
          </div>
          <div className="hero-bottom">
            <h1 id="hero-title" className="h hero-title">
              <span className="line">
                <span>Bonito é o começo.</span>
              </span>
              <span className="line">
                <span>
                  <i className="pink">Vender</i> é o ponto.
                </span>
              </span>
            </h1>
            <div className="hero-side">
              <p className="lead hero-lead">
                A Juá cria marcas, conteúdo e sites com design bonito, estratégia clara e resultado que dá pra medir.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-p" href="#contato">
                  Agendar uma conversa <span className="arr" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-g" href="#servicos">
                  Ver serviços
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll mono" aria-hidden="true">
          <span>Role</span>
          <span className="hero-scroll-bar" />
        </div>
      </div>
    </section>
  );
}

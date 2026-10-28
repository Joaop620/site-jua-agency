"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Moon, type MoonLayout } from "../Moon";
import { useScrollProgress } from "../useScrollProgress";

const layout = (w: number, h: number): MoonLayout =>
  w < 760
    ? { cx: w * 0.5, cy: h * 0.33, r: Math.min(w * 0.5, h * 0.27) }
    : { cx: w * 0.64, cy: h * 0.46, r: Math.min(h * 0.41, w * 0.31) };


const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export function Hero() {
  const { el, p } = useScrollProgress<HTMLElement>("pin");
  const start = useRef(0);

  useEffect(() => {
    const intro = document.documentElement.classList.contains("intro");
    start.current = performance.now() + (intro ? 1300 : 150);
  }, []);

  // a lua "nasce": vai de nova até crescente na abertura e cresce com a rolagem
  const getPhase = () => {
    const rise = start.current ? ease((performance.now() - start.current) / 2400) : 0;
    const base = 112 - p.current * 82;
    return 180 + (base - 180) * rise;
  };

  return (
    <section className="hero" ref={el} aria-labelledby="hero-title">
      <div className="hero-pin">
        <Moon className="hero-moon" layout={layout} getPhase={getPhase} stars />
        <div className="wrap hero-frame">
          <div className="hero-bottom">
            <h1 id="hero-title" className="h hero-title" aria-label={site.tagline}>
              <span className="hl hl-1" aria-hidden="true">
                <span className="hl-in">Bonito.</span>
              </span>
              <span className="hl hl-2" aria-hidden="true">
                <span className="hl-in">Estratégico.</span>
              </span>
              <span className="hl hl-3" aria-hidden="true">
                <span className="hl-in">
                  <i className="pink">Vende.</i>
                </span>
              </span>
            </h1>
            <div className="hero-side hero-fade">
              <p className="lead hero-lead">
                A Juá cria marcas, conteúdo e sites com design bonito, estratégia clara e resultado que dá pra medir.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-p" href="#contato">
                  Agendar uma conversa <span className="arr" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-g" href="#planos">
                  Ver planos e preços
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

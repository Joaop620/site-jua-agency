"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Moon, type MoonLayout } from "../Moon";
import { Roll } from "../Roll";
import { useScrollProgress } from "../useScrollProgress";

const layout = (w: number, h: number): MoonLayout =>
  w < 760
    ? { cx: w * 0.5, cy: h * 0.33, r: Math.min(w * 0.5, h * 0.27) }
    : { cx: w * 0.64, cy: h * 0.46, r: Math.min(h * 0.41, w * 0.31) };

/** Divide uma palavra em letras para a entrada escalonada. */
function Chars({ text, from }: { text: string; from: number }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span className="ch" key={i} style={{ ["--i" as string]: from + i }}>
          {c}
        </span>
      ))}
    </>
  );
}

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
          <div className="hero-top mono">
            <span className="hero-fade">Agência criativa · Branding, design e social</span>
            {site.agenda.open && (
              <span className="hero-fade">
                Agenda aberta · {site.agenda.month} {site.agenda.year}
              </span>
            )}
          </div>
          <div className="hero-bottom">
            <h1 id="hero-title" className="h hero-title" aria-label={site.tagline}>
              <span className="hl hl-1" aria-hidden="true">
                <Chars text="Bonito." from={0} />
              </span>
              <span className="hl hl-2" aria-hidden="true">
                <Chars text="Estratégico." from={5} />
              </span>
              <span className="hl hl-3" aria-hidden="true">
                <i className="pink">
                  <Chars text="Vende." from={14} />
                </i>
              </span>
            </h1>
            <div className="hero-side hero-fade">
              <p className="lead hero-lead">
                A Juá cria marcas, conteúdo e sites com design bonito, estratégia clara e resultado que dá pra medir.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-p" href="#contato" data-magnetic>
                  <Roll>Agendar uma conversa</Roll> <span className="arr" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-g" href="#servicos" data-magnetic>
                  <Roll>Ver serviços</Roll>
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

"use client";

import { useEffect, useRef, useState } from "react";
import { phases } from "@/content/site";
import { MoonPhase } from "../MoonPhase";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const v = (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.1);
        setP(Math.max(0, Math.min(1, v)));
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(4, Math.floor(p * 4.4));

  return (
    <section className="sec process" id="processo" aria-labelledby="proc-title">
      <div className="stars" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick mono">Processo</div>
            <h2 id="proc-title" className="h h-l">
              Como uma marca <i className="pink">nasce</i> aqui dentro.
            </h2>
          </div>
          <p className="lead">Quatro fases, como as da lua. Cada uma prepara a próxima, e nenhuma é pulada.</p>
        </div>
        <div className="pipe-meta mono" aria-hidden="true">
          <span>pipeline.run()</span>
          <span>
            <span className="pink">{Math.round(p * 100)}%</span> concluído
          </span>
        </div>
        <div className="phases" ref={ref} style={{ ["--p" as string]: p }}>
          <div className="pipe" aria-hidden="true">
            <span />
          </div>
          {phases.map((ph, i) => (
            <div className="phase rv" key={ph.title} data-on={i < active || undefined}>
              <div className="phase-node">
                <MoonPhase phase={ph.phase} />
              </div>
              <div className="phase-status mono" aria-hidden="true">
                {i < active ? "● ok" : "○ aguardando"}
              </div>
              <div className="it num">0{i + 1}</div>
              <h3>{ph.title}</h3>
              <p className="it sub">{ph.sub}</p>
              <p>{ph.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

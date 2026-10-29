"use client";

import { useEffect, useRef, useState } from "react";
import { phases } from "@/content/site";
import { Moon, type MoonLayout } from "../Moon";
import { MoonPhase } from "../MoonPhase";
import { useScrollProgress } from "../useScrollProgress";

const layout = (w: number, h: number): MoonLayout => ({ cx: w / 2, cy: h / 2, r: Math.min(w, h) * 0.36 });
const PHASE = [140, 90, 42, 0];

export function Process() {
  const { el, p } = useScrollProgress<HTMLDivElement>("through");
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  // fase contínua: interpola entre as quatro fases conforme a rolagem
  const getPhase = () => {
    const x = Math.min(1, p.current * 1.15) * (PHASE.length - 1);
    const i = Math.min(PHASE.length - 2, Math.floor(x));
    return PHASE[i] + (PHASE[i + 1] - PHASE[i]) * (x - i);
  };

  return (
    <section className="sec process" data-dark id="processo" aria-labelledby="proc-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kick">Processo</div>
            <h2 id="proc-title" className="h h-l rv">
              Como uma marca nasce aqui dentro.
            </h2>
          </div>
          <p className="lead rv">Quatro fases, como as da lua. Cada uma prepara a seguinte, e nenhuma é pulada.</p>
        </div>
        <div className="proc" ref={el}>
          <div className="proc-stage">
            <div className="proc-sticky">
              <Moon className="proc-moon" layout={layout} getPhase={getPhase} />
            </div>
          </div>
          <ol className="proc-steps">
            {phases.map((ph, i) => (
              <li
                key={ph.title}
                className="step"
                data-i={i}
                data-on={i === active || undefined}
                ref={(n) => {
                  steps.current[i] = n;
                }}
              >
                <div className="step-top">
                  <MoonPhase phase={ph.phase} className="step-moon" />
                  <span className="it num">0{i + 1}</span>
                  <span className="step-time label">{ph.time}</span>
                </div>
                <h3>{ph.title}</h3>
                <p className="it sub">{ph.sub}</p>
                <p>{ph.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

export type MoonLayout = { cx: number; cy: number; r: number };

type Props = {
  /** Ângulo de fase em graus: 180 = lua nova, 90 = quarto, 0 = cheia. */
  getPhase: () => number;
  /** Onde desenhar a lua dentro do container. */
  layout: (w: number, h: number) => MoonLayout;
  className?: string;
};

// crateras em coordenadas relativas ao raio (x, y, raio)
const CRATERS: [number, number, number][] = [
  [0.38, -0.42, 0.13],
  [0.55, 0.12, 0.09],
  [0.18, 0.46, 0.16],
  [-0.12, -0.18, 0.1],
  [0.62, -0.08, 0.05],
  [-0.4, 0.3, 0.12],
  [0.05, 0.08, 0.06],
  [-0.5, -0.45, 0.08],
];

/** Caminho da parte iluminada: meio disco do lado da luz + elipse do terminador. */
function litPath(L: MoonLayout, phase: number) {
  const { cx, cy, r } = L;
  const a = (Math.max(0, Math.min(180, phase)) * Math.PI) / 180;
  const rx = Math.max(0.01, r * Math.abs(Math.cos(a)));
  const gibbous = phase < 90 ? 1 : 0;
  return `M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx} ${cy + r}A${rx} ${r} 0 0 ${gibbous} ${cx} ${cy - r}Z`;
}

/**
 * Lua vetorial nas cores da marca. Leve: só o caminho da parte iluminada
 * é recalculado, e só enquanto a fase está mudando.
 */
export function Moon({ getPhase, layout, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const [L, setL] = useState<MoonLayout | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize({ w, h });
      setL(layout(w, h));
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!L) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phase = getPhase();
    let drawn = -1;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = getPhase();
      phase = reduce ? target : phase + (target - phase) * Math.min(1, dt * 7);
      if (Math.abs(phase - drawn) > 0.05) {
        lit.current?.setAttribute("d", litPath(L, phase));
        drawn = phase;
      }
      if (visible) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    if (box.current) io.observe(box.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [L]);

  return (
    <div ref={box} className={className} aria-hidden="true">
      {L && (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} style={{ display: "block", overflow: "visible" }}>
          <defs>
            <radialGradient id={`glow${id}`} cx={L.cx} cy={L.cy} r={L.r * 1.6} gradientUnits="userSpaceOnUse">
              <stop offset=".55" stopColor="#E5197A" stopOpacity=".16" />
              <stop offset="1" stopColor="#3F1278" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id={`lit${id}`}
              gradientUnits="userSpaceOnUse"
              x1={L.cx + L.r * 0.7}
              y1={L.cy - L.r * 0.9}
              x2={L.cx - L.r * 0.6}
              y2={L.cy + L.r * 0.9}
            >
              <stop offset="0" stopColor="#FFD9E8" />
              <stop offset=".35" stopColor="#FF55A7" />
              <stop offset=".7" stopColor="#E5197A" />
              <stop offset="1" stopColor="#3F1278" />
            </linearGradient>
            <radialGradient id={`dark${id}`} cx={L.cx - L.r * 0.3} cy={L.cy - L.r * 0.3} r={L.r * 1.3} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#24104F" />
              <stop offset="1" stopColor="#120827" />
            </radialGradient>
            <clipPath id={`clip${id}`}>
              <path ref={lit} d={litPath(L, getPhase())} />
            </clipPath>
          </defs>
          <circle cx={L.cx} cy={L.cy} r={L.r * 1.6} fill={`url(#glow${id})`} />
          <circle cx={L.cx} cy={L.cy} r={L.r} fill={`url(#dark${id})`} stroke="rgba(247,243,238,.1)" strokeWidth="1" />
          <g clipPath={`url(#clip${id})`}>
            <rect x={L.cx - L.r} y={L.cy - L.r} width={L.r * 2} height={L.r * 2} fill={`url(#lit${id})`} />
            {CRATERS.map(([x, y, cr], i) => (
              <circle
                key={i}
                cx={L.cx + x * L.r}
                cy={L.cy + y * L.r}
                r={cr * L.r}
                fill="rgba(63,18,120,.09)"
                stroke="rgba(255,255,255,.08)"
                strokeWidth={Math.max(1, L.r * 0.006)}
              />
            ))}
          </g>
        </svg>
      )}
    </div>
  );
}

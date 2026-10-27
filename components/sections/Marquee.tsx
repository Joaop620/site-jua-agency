"use client";

import { useEffect, useRef } from "react";

const Crescent = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" />
  </svg>
);

const Group = () => (
  <span className="mq-group">
    <span>Bonito.</span>
    <Crescent />
    <span className="mq-out">Estratégico.</span>
    <Crescent />
    <i className="pink">Vende.</i>
    <Crescent />
  </span>
);

/** Slogan em faixa contínua; acelera, inclina e muda de sentido com a rolagem. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let v = 0;
    let dir = 1;
    let last = scrollY;
    let raf = 0;
    const loop = () => {
      const dy = scrollY - last;
      last = scrollY;
      if (dy) dir = dy > 0 ? 1 : -1;
      v += (dy - v) * 0.12;
      x -= (0.7 + Math.min(18, Math.abs(v) * 0.35)) * dir;
      const w = el.scrollWidth / 2;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      const skew = Math.max(-8, Math.min(8, v * -0.25));
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track" ref={track}>
        <Group />
        <Group />
        <Group />
        <Group />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const MOON = "M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z";
const STOPS: [number, [number, number, number]][] = [
  [0, [255, 85, 167]],
  [0.5, [229, 25, 122]],
  [1, [63, 18, 120]],
];

function grad(t: number): [number, number, number] {
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, c1] = STOPS[i];
    const [p0, c0] = STOPS[i - 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0);
      return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
    }
  }
  return STOPS[STOPS.length - 1][1];
}

type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number; c: string; ph: number };

/** Lua crescente feita de partículas que reagem ao cursor, com órbitas e satélites. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: P[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    const start = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // amostra a forma da lua num canvas fora da tela
      const S = 220;
      const off = document.createElement("canvas");
      off.width = off.height = S;
      const o = off.getContext("2d")!;
      o.scale(S / 64, S / 64);
      o.fill(new Path2D(MOON));
      const data = o.getImageData(0, 0, S, S).data;

      const size = Math.min(w, h) * 0.86;
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;
      const step = w < 480 ? 3 : 2;
      pts = [];
      for (let y = 0; y < S; y += step) {
        for (let x = 0; x < S; x += step) {
          if (data[(y * S + x) * 4 + 3] < 128) continue;
          const jx = x + (Math.random() - 0.5) * step;
          const jy = y + (Math.random() - 0.5) * step;
          const hx = ox + (jx / S) * size;
          const hy = oy + (jy / S) * size;
          const [r, g, b] = grad(Math.min(1, Math.max(0, (jx + jy) / (S * 1.6))));
          pts.push({
            hx,
            hy,
            x: hx + (Math.random() - 0.5) * w * (reduce ? 0 : 0.6),
            y: hy + (Math.random() - 0.5) * h * (reduce ? 0 : 0.6),
            vx: 0,
            vy: 0,
            r: Math.random() * 1.4 + 0.9,
            c: `rgb(${r | 0},${g | 0},${b | 0})`,
            ph: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.47;

      // órbitas
      ctx.lineWidth = 1;
      [1, 1.22].forEach((k, i) => {
        ctx.strokeStyle = i ? "rgba(247,243,238,.07)" : "rgba(247,243,238,.14)";
        ctx.setLineDash(i ? [2, 6] : []);
        ctx.beginPath();
        ctx.arc(cx, cy, R * k, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // arco de varredura
      const a = t * 0.6;
      ctx.strokeStyle = "rgba(255,85,167,.55)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, a, a + 0.9);
      ctx.stroke();

      // satélites
      [
        [R, 0.35, 3],
        [R * 1.22, -0.18, 2.2],
      ].forEach(([rad, sp, s], i) => {
        const ang = t * sp + i * 2.4;
        const sx = cx + Math.cos(ang) * rad;
        const sy = cy + Math.sin(ang) * rad;
        ctx.fillStyle = i ? "#F7F3EE" : "#FF55A7";
        ctx.beginPath();
        ctx.arc(sx, sy, s, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = i ? "rgba(247,243,238,.25)" : "rgba(255,85,167,.3)";
        ctx.beginPath();
        ctx.arc(sx, sy, s + 5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // partículas
      for (const p of pts) {
        if (!reduce) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const f = (9000 - d2) / 9000;
            p.vx += (dx / Math.sqrt(d2 + 1)) * f * 2.2;
            p.vy += (dy / Math.sqrt(d2 + 1)) * f * 2.2;
          }
          const wob = Math.sin(t * 1.3 + p.ph) * 0.6;
          p.vx += (p.hx + wob - p.x) * 0.04;
          p.vy += (p.hy + Math.cos(t + p.ph) * 0.6 - p.y) * 0.04;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.75 + Math.sin(t * 2 + p.ph) * 0.25;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }
      ctx.globalAlpha = 1;

      // linha de scan (só dentro da órbita)
      if (!reduce) {
        const sy = cy - R + ((t * 0.22) % 1) * R * 2;
        const half = Math.sqrt(Math.max(0, R * R - (sy - cy) * (sy - cy)));
        const g = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
        g.addColorStop(0, "rgba(255,85,167,0)");
        g.addColorStop(0.5, "rgba(255,85,167,.5)");
        g.addColorStop(1, "rgba(255,85,167,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - half, sy, half * 2, 1);
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    build();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

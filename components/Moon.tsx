"use client";

import { useEffect, useRef } from "react";

export type MoonLayout = { cx: number; cy: number; r: number };

type Props = {
  /** Ângulo de fase em graus: 180 = lua nova, 90 = quarto, 0 = cheia. */
  getPhase: () => number;
  /** Onde desenhar a lua dentro do canvas. */
  layout: (w: number, h: number) => MoonLayout;
  className?: string;
};

// ruído de valor 3D simples (determinístico), usado pro relevo da superfície
// hash inteiro (rápido; sem Math.sin)
function hash(x: number, y: number, z: number) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1103515245);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w
  );
}
function fbm(x: number, y: number, z: number) {
  let a = 0.5, f = 1, s = 0;
  for (let i = 0; i < 3; i++) {
    s += a * noise(x * f, y * f, z * f);
    f *= 2.1;
    a *= 0.5;
  }
  return s;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Lua desenhada como ilustração: esfera sólida com relevo procedural,
 * iluminada por uma luz cuja direção define a fase. Não gira; só é
 * redesenhada quando a fase muda.
 */
export function Moon({ getPhase, layout, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let L: MoonLayout = { cx: 0, cy: 0, r: 0 };
    let D = 0; // diâmetro em pixels do bitmap da lua
    let NX = new Float32Array(0);
    let NZ = new Float32Array(0);
    let ALB = new Float32Array(0); // albedo (claro/escuro da superfície)
    let IN = new Uint8Array(0);
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;
    let img: ImageData | null = null;

    let phase = getPhase();
    let drawn = -999;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let lastRender = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, rect.width < 760 ? 1.5 : 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      L = layout(w, h);

      // resolução do bitmap limitada: a lua é suave e o navegador amplia sem perda visível
      D = Math.max(64, Math.min(rect.width < 760 ? 240 : 420, Math.round(L.r * 2 * dpr)));
      off.width = off.height = D;
      img = octx.createImageData(D, D);
      const n = D * D;
      NX = new Float32Array(n);
      NZ = new Float32Array(n);
      ALB = new Float32Array(n);
      IN = new Uint8Array(n);
      const R = D / 2;
      for (let py = 0; py < D; py++) {
        for (let px = 0; px < D; px++) {
          const i = py * D + px;
          const x = (px + 0.5 - R) / R;
          const y = -(py + 0.5 - R) / R;
          const q = x * x + y * y;
          if (q > 1) continue;
          const z = Math.sqrt(1 - q);
          IN[i] = q > 0.985 ? 2 : 1; // 2 = borda (suaviza o serrilhado)
          NX[i] = x;
          NZ[i] = z;
          // "mares" escuros grandes + relevo fino + grão
          const maria = smooth(0.52, 0.68, fbm(x * 1.6 + 3.1, y * 1.6 + 1.7, z * 1.6));
          const fine = fbm(x * 7 + 11, y * 7 + 5, z * 7);
          const grain = hash(px, py, 7) * 0.06;
          ALB[i] = 0.82 - maria * 0.32 + (fine - 0.5) * 0.26 + grain;
        }
      }
      drawn = -999;
    };

    const render = () => {
      if (!img) return;
      const a = (phase * Math.PI) / 180;
      const lx = Math.sin(a);
      const lz = Math.cos(a);
      const d = img.data;
      const n = D * D;
      for (let i = 0; i < n; i++) {
        const o = i * 4;
        if (!IN[i]) {
          d[o + 3] = 0;
          continue;
        }
        const lam = NX[i] * lx + NZ[i] * lz;
        // terminador com transição curta, como na lua de verdade
        const lit = smooth(-0.03, 0.22, lam) * (0.78 + 0.22 * NZ[i]);
        const v = Math.min(1, Math.max(0, ALB[i])) * lit;
        // lado claro: papel quente; lado escuro: um tom acima do fundo
        // sombra puxando pro violeta só no escuro; luz em tom papel, sem lilás
        const k = v * v * (3 - 2 * v);
        d[o] = 20 + v * 205 + k * 22;
        d[o + 1] = 14 + v * 208 + k * 21;
        d[o + 2] = 40 + v * 176 + k * 22;
        d[o + 3] = IN[i] === 2 ? 150 : 255;
      }
      octx.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(off, L.cx - L.r, L.cy - L.r, L.r * 2, L.r * 2);
      drawn = phase;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = getPhase();
      phase = reduce ? target : phase + (target - phase) * Math.min(1, dt * 6);
      // no celular, no máximo ~20 redesenhos por segundo
      const gap = w < 760 ? 48 : 16;
      if (Math.abs(phase - drawn) > 0.4 && now - lastRender >= gap) {
        lastRender = now;
        render();
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      build();
      render();
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const idle = (cb: () => void) =>
      typeof requestIdleCallback === "function" ? requestIdleCallback(cb, { timeout: 700 }) : setTimeout(cb, 200);
    if (document.readyState === "complete") idle(begin);
    else addEventListener("load", () => idle(begin), { once: true });

    const ro = new ResizeObserver(() => {
      if (!started) return;
      build();
      render();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && started) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // getPhase/layout são lidos a cada quadro; o efeito roda uma vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

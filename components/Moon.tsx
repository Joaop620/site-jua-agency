"use client";

import { useEffect, useRef } from "react";

export type MoonLayout = { cx: number; cy: number; r: number };

type Props = {
  /** Ângulo de fase em graus: 180 = lua nova, 90 = quarto, 0 = cheia. */
  getPhase: () => number;
  /** Onde desenhar a esfera dentro do canvas. */
  layout: (w: number, h: number) => MoonLayout;
  stars?: boolean;
  className?: string;
};

const LEVELS = 28;
// violeta → magenta → pink → quase branco, como a luz batendo na superfície
const RAMP: [number, number, number, number][] = [
  [0, 63, 18, 120],
  [0.45, 229, 25, 122],
  [0.75, 255, 85, 167],
  [1, 255, 222, 238],
];

function ramp(t: number) {
  for (let i = 1; i < RAMP.length; i++) {
    const [p1, r1, g1, b1] = RAMP[i];
    const [p0, r0, g0, b0] = RAMP[i - 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0);
      return [r0 + (r1 - r0) * k, g0 + (g1 - g0) * k, b0 + (b1 - b0) * k].map((v) => v | 0);
    }
  }
  return [255, 222, 238];
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Relevo procedural: crateras e "mares" para a rotação ficar visível. */
function surface(x: number, y: number, z: number) {
  const maria = smooth(-0.2, 0.6, Math.sin(x * 2.1 + 0.6) * Math.cos(y * 1.7 - 0.3) + Math.sin(z * 2.6 + 1.2) * 0.6);
  const fine = 0.5 + 0.5 * Math.sin(x * 11.3 + z * 4.1) * Math.sin(y * 9.7 - x * 3.3) * Math.sin(z * 12.9 + y * 2.2);
  return (1 - maria * 0.5) * (0.78 + fine * 0.22);
}

/**
 * Lua 3D renderizada em canvas: esfera de pontos (distribuição de Fibonacci),
 * iluminada por uma fonte de luz cuja direção define a fase.
 */
export function Moon({ getPhase, layout, stars = false, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fills = Array.from({ length: LEVELS }, (_, i) => {
      const t = i / (LEVELS - 1);
      const [r, g, b] = ramp(t);
      return `rgba(${r},${g},${b},${(0.22 + 0.78 * t).toFixed(3)})`;
    });

    let w = 0;
    let h = 0;
    let L: MoonLayout = { cx: 0, cy: 0, r: 0 };
    let P = new Float32Array(0); // x, y, z, relevo
    let S: { x: number; y: number; s: number; ph: number }[] = [];
    const buckets: number[][] = Array.from({ length: LEVELS + 1 }, () => []);

    let phase = getPhase();
    let yaw = 0.6;
    let pitch = -0.18;
    let tYaw = 0;
    let tPitch = 0;
    let mYaw = 0;
    let mPitch = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      L = layout(w, h);

      // pontos quase uniformes (Fibonacci) com um leve deslocamento aleatório,
      // para a superfície não formar padrões regulares
      const n = Math.round(Math.min(30000, Math.max(5000, L.r * L.r * 0.2)));
      P = new Float32Array(n * 4);
      const ga = Math.PI * (3 - Math.sqrt(5));
      const jit = 1.6 / Math.sqrt(n);
      let seed = 11;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
      for (let i = 0; i < n; i++) {
        const y0 = 1 - ((i + 0.5) / n) * 2;
        const rad = Math.sqrt(1 - y0 * y0);
        const th = ga * i;
        let x = Math.cos(th) * rad + rnd() * jit;
        let y = y0 + rnd() * jit;
        let z = Math.sin(th) * rad + rnd() * jit;
        const len = Math.hypot(x, y, z);
        x /= len;
        y /= len;
        z /= len;
        P[i * 4] = x;
        P[i * 4 + 1] = y;
        P[i * 4 + 2] = z;
        P[i * 4 + 3] = surface(x, y, z);
      }

      S = [];
      if (stars) {
        seed = 7;
        const rnd01 = () => rnd() + 0.5;
        const count = Math.round((w * h) / 9000);
        for (let i = 0; i < count; i++) {
          const x = rnd01() * w;
          const y = rnd01() * h;
          if (Math.hypot(x - L.cx, y - L.cy) < L.r * 1.08) continue;
          S.push({ x, y, s: rnd01() < 0.08 ? 1.6 : 1, ph: rnd01() * 6.28 });
        }
      }
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = getPhase();
      phase = reduce ? target : phase + (target - phase) * Math.min(1, dt * 6);
      if (!reduce) {
        yaw += dt * 0.07;
      }
      mYaw += (tYaw - mYaw) * Math.min(1, dt * 3);
      mPitch += (tPitch - mPitch) * Math.min(1, dt * 3);
      const curYaw = yaw + mYaw;
      const curPitch = pitch + mPitch;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      for (const s of S) {
        ctx.fillStyle = `rgba(247,243,238,${(0.25 + 0.25 * Math.sin(now / 1400 + s.ph)).toFixed(3)})`;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      }

      const a = (phase * Math.PI) / 180;
      const lx = Math.sin(a);
      const lz = Math.cos(a);
      const lit = 1 - phase / 180;

      // halo atmosférico discreto do lado iluminado
      const hx = L.cx + lx * L.r * 0.18;
      const g = ctx.createRadialGradient(hx, L.cy, L.r * 0.92, hx, L.cy, L.r * 1.32);
      g.addColorStop(0, `rgba(229,25,122,${(0.05 + lit * 0.09).toFixed(3)})`);
      g.addColorStop(1, "rgba(229,25,122,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // borda da esfera
      ctx.strokeStyle = "rgba(247,243,238,.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, L.r, 0, Math.PI * 2);
      ctx.stroke();

      const cyw = Math.cos(curYaw);
      const syw = Math.sin(curYaw);
      const cp = Math.cos(curPitch);
      const sp = Math.sin(curPitch);
      for (const b of buckets) b.length = 0;

      for (let i = 0; i < P.length; i += 4) {
        const x = P[i];
        const y = P[i + 1];
        const z = P[i + 2];
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        if (z2 <= 0) continue;
        const d = x1 * lx + z2 * lz;
        const v = Math.min(0.999, smooth(-0.1, 0.32, d) * P[i + 3] * (0.8 + 0.2 * z2) * 1.3);
        const sx = L.cx + x1 * L.r;
        const sy = L.cy - y2 * L.r;
        if (v < 0.03) buckets[LEVELS].push(sx, sy);
        else buckets[Math.min(LEVELS - 1, (v * LEVELS) | 0)].push(sx, sy);
      }

      const base = Math.max(1.1, L.r / 210);
      ctx.fillStyle = "rgba(150,110,230,.075)";
      const dark = buckets[LEVELS];
      for (let j = 0; j < dark.length; j += 2) ctx.fillRect(dark[j], dark[j + 1], base, base);

      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < LEVELS; k++) {
        const arr = buckets[k];
        if (!arr.length) continue;
        const s = base * (0.8 + (k / LEVELS) * 0.7);
        ctx.fillStyle = fills[k];
        for (let j = 0; j < arr.length; j += 2) ctx.fillRect(arr[j], arr[j + 1], s, s);
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse") return;
      tYaw = (e.clientX / innerWidth - 0.5) * 0.5;
      tPitch = (e.clientY / innerHeight - 0.5) * 0.3;
    };

    build();
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
    };
    // getPhase/layout são lidos a cada frame; o efeito roda uma vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

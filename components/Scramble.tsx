"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFJUA";

/** Texto que "decodifica" a partir de caracteres aleatórios ao entrar na tela. */
export function Scramble({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let raf = 0;
    let timer = 0;
    const total = 28;
    const run = () => {
      frame++;
      const p = frame / total;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i / text.length < p ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join("")
      );
      if (frame < total) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        timer = window.setTimeout(run, delay);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

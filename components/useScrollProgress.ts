"use client";

import { useEffect, useRef } from "react";

/**
 * Progresso (0–1) de rolagem através de um elemento, sem re-render:
 * fica num ref e também numa variável CSS `--p` no próprio elemento.
 * "pin": seção com conteúdo fixo (sticky); "through": seção que passa pela tela.
 */
export function useScrollProgress<T extends HTMLElement>(mode: "pin" | "through" = "pin") {
  const el = useRef<T>(null);
  const p = useRef(0);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let raf = 0;
    const update = () => {
      const r = node.getBoundingClientRect();
      const vh = innerHeight;
      const v =
        mode === "pin"
          ? -r.top / Math.max(1, r.height - vh)
          : (vh * 0.6 - r.top) / Math.max(1, r.height);
      p.current = Math.min(1, Math.max(0, v));
      node.style.setProperty("--p", p.current.toFixed(4));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [mode]);

  return { el, p };
}

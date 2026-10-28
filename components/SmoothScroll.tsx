"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Rolagem suave com inércia no mouse/trackpad (desligada no toque e para quem prefere menos movimento). */
export function SmoothScroll() {
  useEffect(() => {
    // no toque o Lenis não suaviza nada e só gastaria processamento a cada quadro
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: true, autoRaf: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}

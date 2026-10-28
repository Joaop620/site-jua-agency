"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Rolagem suave com inércia no mouse/trackpad (desligada no toque e para quem prefere menos movimento). */
export function SmoothScroll() {
  useEffect(() => {
    // no toque o Lenis não suaviza nada e só gastaria processamento a cada quadro
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: true });
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}

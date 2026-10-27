"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Rolagem suave com inércia (desligada para quem prefere menos movimento). */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: true });
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}

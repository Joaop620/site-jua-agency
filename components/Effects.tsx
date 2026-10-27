"use client";

import { useEffect } from "react";

/**
 * Efeitos de página:
 * - `.rv`: revela ao entrar na tela
 * - `[data-progress]`: escreve `--p` (0–1) conforme a seção atravessa a tela
 * - `[data-speed]`: parallax vertical
 * - `[data-magnetic]`: botão acompanha levemente o ponteiro
 */
export function Effects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // títulos com máscara (clip-path) não "aparecem" para o observer,
    // então observamos o elemento pai e revelamos o título
    const owner = new Map<Element, HTMLElement>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (owner.get(e.target) ?? e.target).classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      const target = el.classList.contains("h") && el.parentElement ? el.parentElement : el;
      if (target !== el) owner.set(target, el);
      io.observe(target);
    });

    const prog = [...document.querySelectorAll<HTMLElement>("[data-progress]")];
    const par = reduce ? [] : [...document.querySelectorAll<HTMLElement>("[data-speed]")];
    let raf = 0;
    const update = () => {
      const vh = innerHeight;
      for (const el of prog) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const v = (vh * 0.6 - r.top) / Math.max(1, r.height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, v)).toFixed(4));
      }
      for (const el of par) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const off = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed);
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    const mags = reduce || !matchMedia("(pointer: fine)").matches ? [] : [...document.querySelectorAll<HTMLElement>("[data-magnetic]")];
    const offs = mags.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      };
      const leave = () => (el.style.transform = "");
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      offs.forEach((f) => f());
    };
  }, []);

  return null;
}

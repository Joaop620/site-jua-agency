"use client";

import { useEffect } from "react";

/**
 * Efeitos globais da página:
 * - revela elementos `.rv` ao entrar na tela (IntersectionObserver)
 * - spotlight que segue o cursor em `[data-spot]`
 * - barra de progresso de rolagem (`--scroll` no <html>)
 */
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });

    const onMove = (ev: PointerEvent) => {
      const t = (ev.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      t.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = root.scrollHeight - innerHeight;
        root.style.setProperty("--scroll", String(max > 0 ? scrollY / max : 0));
      });
    };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="scroll-bar" aria-hidden="true" />;
}

"use client";

import { useEffect } from "react";

/** Revela elementos `.rv` quando entram na tela. */
export function Effects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

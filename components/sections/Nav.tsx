"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "../Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav" data-solid={solid || open || undefined}>
      <div className="wrap nav-bar">
        <Logo />
        <nav aria-label="Principal">
          <ul className="nav-links">
            {nav.map((l) => (
              <li key={l.href}>
                <a className="ul" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-p btn-sm" href="#contato">
            Agendar conversa
          </a>
          <button className="nav-toggle" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((o) => !o)}>
            <span className="burger" aria-hidden="true" />
            <span className="sr">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>
      <nav id="mnav" className="mnav" aria-label="Menu mobile" hidden={!open}>
        <ul>
          {[...nav, { href: "#contato", label: "Agendar conversa" }].map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

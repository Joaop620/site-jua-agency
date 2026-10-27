"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "../Logo";
import { Clock } from "../Clock";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav" data-open={open || undefined}>
      <div className="wrap nav-bar">
        <Logo />
        <nav aria-label="Principal">
          <ul className="nav-links">
            {nav.map((l, i) => (
              <li key={l.href}>
                <a className="ul" href={l.href}>
                  <span className="nav-idx mono">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-cta">
          <span className="nav-status mono">
            <span className="pulse" aria-hidden="true" /> Online
          </span>
          <Clock />
          <a className="btn btn-p btn-sm" href="#contato">
            Agendar conversa
          </a>
          <button
            className="nav-toggle mono"
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>
      <nav id="mnav" className="mnav" aria-label="Menu mobile" hidden={!open}>
        <div className="mnav-grid" aria-hidden="true" />
        <ul>
          {[...nav, { href: "#contato", label: "Agendar conversa" }].map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mnav-foot mono">
          <Clock prefix="São Paulo" />
          <span>-23.5505 / -46.6333</span>
        </div>
      </nav>
    </header>
  );
}

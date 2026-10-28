"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "../Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");

  // marca no menu a seção que está na tela
  useEffect(() => {
    const ids = nav.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else if (e.target.id === active) setActive("");
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <a className="ul" href={l.href} aria-current={active === l.href.slice(1) ? "location" : undefined}>
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
        <div className="mnav-foot">
          <a href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
            WhatsApp ↗
          </a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.instagram.href} target="_blank" rel="noopener noreferrer">
            {site.contact.instagram.label}
          </a>
        </div>
      </nav>
    </header>
  );
}

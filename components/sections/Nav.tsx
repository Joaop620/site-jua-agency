"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { JuaSymbol } from "../JuaSymbol";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [onLight, setOnLight] = useState(false);

  // marca no menu a seção que está na tela e descobre se o fundo atrás do menu é claro
  useEffect(() => {
    const ids = [...nav.map((l) => l.href.slice(1)), "diagnostico", "estudio", "contato"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = e.target.id;
          if (e.isIntersecting) setActive(id);
          else setActive((a) => (a === id ? "" : a));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));

    const dark = [...document.querySelectorAll<HTMLElement>("[data-dark]")];
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = 36;
        setOnLight(!dark.some((d) => {
          const r = d.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        }));
      });
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      io.disconnect();
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-light={(onLight && !open) || undefined}>
        <div className="wrap nav-bar">
          <a className="nav-logo" href="#conteudo" aria-label="Juá Agency, início">
            <JuaSymbol size={26} variant="mono" />
            <span>
              Juá <i>Agency</i>
            </span>
          </a>
          <nav aria-label="Principal" className="nav-main">
            <ul className="nav-links">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} aria-current={active === l.href.slice(1) ? "location" : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="nav-cta" href="#contato">
            Agendar conversa
          </a>
          <button className="nav-toggle" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((o) => !o)}>
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </header>
      {/* fora do header pra ficar por cima da página inteira */}
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
            WhatsApp {site.contact.whatsapp.label}
          </a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.instagram.href} target="_blank" rel="noopener noreferrer">
            Instagram {site.contact.instagram.label}
          </a>
        </div>
      </nav>
    </>
  );
}

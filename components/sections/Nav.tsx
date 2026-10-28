"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { JuaSymbol } from "../JuaSymbol";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [hover, setHover] = useState("");
  const list = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // marca no menu a seção que está na tela
  useEffect(() => {
    // seções que "limpam" o menu também são observadas (ex.: estúdio, contato)
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
    return () => io.disconnect();
  }, []);

  // some ao rolar pra baixo, volta ao rolar pra cima
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 400);
      last = y;
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  // destaque que desliza até o link ativo (ou o que está sob o mouse)
  const target = hover || active;
  useLayoutEffect(() => {
    const ul = list.current;
    const a = target && ul?.querySelector<HTMLElement>(`a[href="#${target}"]`);
    setPill(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
  }, [target]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-hidden={(hidden && !open) || undefined} data-open={open || undefined}>
        <div className="nav-pill">
          <a className="nav-logo" href="#conteudo" aria-label="Juá Agency, início">
            <JuaSymbol size={28} />
            <span>
              Juá <i>Agency</i>
            </span>
          </a>
          <nav aria-label="Principal" className="nav-main">
            <ul className="nav-links" ref={list} onMouseLeave={() => setHover("")}>
              <span
                className="nav-ind"
                aria-hidden="true"
                style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.w, opacity: 1 } : { opacity: 0 }}
              />
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href.slice(1) ? "location" : undefined}
                    onMouseEnter={() => setHover(l.href.slice(1))}
                  >
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
            <span>{open ? "Fechar" : "Menu"}</span>
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
      </header>
      {/* fora do header: assim o menu fixo não fica preso ao transform da cápsula */}
      <nav id="mnav" className="mnav" aria-label="Menu mobile" hidden={!open}>
        <ul>
          {[...nav, { href: "#contato", label: "Agendar conversa" }].map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mnav-n">0{i + 1}</span>
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
    </>
  );
}

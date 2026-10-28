"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Atalho pro WhatsApp: aparece depois do hero e some na seção de contato. */
export function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // some no contato e no rodapé, onde ele cobriria links e o próprio formulário
    const hidden = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target)));
        update();
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll("#contato, footer").forEach((el) => io.observe(el));
    function update() {
      setShow(scrollY > innerHeight * 1.2 && hidden.size === 0);
    }
    update();
    addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", update);
    };
  }, []);

  const href = `${site.contact.whatsapp.href}?text=${encodeURIComponent("Olá! Vim pelo site da Juá e queria conversar sobre um projeto.")}`;

  return (
    <a className="wa" href={href} target="_blank" rel="noopener noreferrer" data-show={show || undefined} tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.2a8.8 8.8 0 0 0-7.6 13.3L3.2 20.8l4.4-1.2A8.8 8.8 0 1 0 12 3.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.2c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.3.6 1.4 2 3 2.6.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.3 1.4-1 1.7-.7.3-1.6.4-3.4-.4-2.4-1-3.9-3.4-4-3.6-.2-.2-.9-1.2-.9-2.3 0-1 .5-1.6.7-1.8Z"
          fill="currentColor"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

"use client";

import { scrollToForm } from "@/lib/scrollToForm";

/** Link para o formulário que já marca o serviço escolhido. */
export function PickLink({ pick, className, children }: { pick: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      className={className}
      href="#form"
      onClick={(e) => {
        window.dispatchEvent(new CustomEvent("jua:pick", { detail: pick }));
        scrollToForm(e);
      }}
    >
      {children}
    </a>
  );
}

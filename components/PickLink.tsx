"use client";

/** Link para o formulário que já marca o serviço escolhido. */
export function PickLink({ pick, className, children }: { pick: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      className={className}
      href="#contato"
      onClick={() => window.dispatchEvent(new CustomEvent("jua:pick", { detail: pick }))}
    >
      {children}
    </a>
  );
}

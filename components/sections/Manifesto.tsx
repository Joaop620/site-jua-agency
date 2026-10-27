"use client";

import { useScrollProgress } from "../useScrollProgress";

const TEXT =
  "Clareza vende. Por isso cada projeto começa entendendo o seu negócio, quem compra de você e por que essa pessoa escolheria você. Só depois a gente abre o arquivo.";

export function Manifesto() {
  const { el } = useScrollProgress<HTMLElement>("through");
  const words = TEXT.split(" ");

  return (
    <section className="band" ref={el} aria-label="Manifesto">
      <div className="wrap band-in">
        <p className="it band-title rv">Ninguém compra o que não entende.</p>
        <p className="band-text" aria-label={TEXT}>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" style={{ ["--k" as string]: (i / words.length).toFixed(3) }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

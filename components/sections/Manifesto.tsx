export function Manifesto() {
  return (
    <section className="band" aria-label="Manifesto">
      <svg className="band-moon" viewBox="0 0 64 64" aria-hidden="true" data-speed="-0.12">
        <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" />
      </svg>
      <div className="wrap band-in">
        <p className="it band-title rv">Ninguém compra o que não entende.</p>
        <p className="band-text rv">
          Clareza vende. Por isso cada projeto começa entendendo o seu negócio, quem compra de você e por que essa pessoa
          escolheria você. Só depois a gente abre o arquivo.
        </p>
      </div>
    </section>
  );
}

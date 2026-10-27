export function Manifesto() {
  return (
    <section className="band" aria-label="Manifesto">
      <div className="band-grid" aria-hidden="true" />
      <svg className="band-moon" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" fill="none" stroke="rgba(247,243,238,.45)" strokeWidth=".18" />
      </svg>
      <div className="wrap band-in">
        <div>
          <div className="band-code mono rv" aria-hidden="true">
            {"// manifesto.txt"}
          </div>
          <p className="it rv">Ninguém compra o que não entende.</p>
        </div>
        <p className="rv">
          Clareza vende. Por isso cada projeto começa entendendo o seu negócio, quem compra de você e por que essa pessoa
          escolheria você. Só depois a gente abre o arquivo.
        </p>
      </div>
    </section>
  );
}

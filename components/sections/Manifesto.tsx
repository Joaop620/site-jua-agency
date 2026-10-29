export function Manifesto() {
  return (
    <section className="band" aria-label="Manifesto">
      <svg className="band-moon" viewBox="0 0 64 64" aria-hidden="true" data-speed="-0.12">
        <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" />
      </svg>
      <div className="wrap band-in">
        <p className="it band-title rv">Ninguém compra o que não entende.</p>
        <p className="band-text rv">
          Clareza vende. Por isso, todo projeto começa pelo entendimento do seu negócio, de quem compra de você e do motivo dessa escolha. O design vem depois.
        </p>
      </div>
    </section>
  );
}

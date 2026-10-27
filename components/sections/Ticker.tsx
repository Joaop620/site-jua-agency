const words = ["Branding", "Identidade visual", "Social media", "Sites & landing pages", "Estratégia", "Posicionamento"];

export function Ticker() {
  const row = (
    <div className="ticker-row">
      {words.map((w) => (
        <span key={w}>
          {w}
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker mono" aria-hidden="true">
      <div className="ticker-track">
        {row}
        {row}
      </div>
    </div>
  );
}

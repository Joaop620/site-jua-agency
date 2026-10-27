/** Texto cujas palavras acendem conforme a seção (com `data-progress`) passa pela tela. */
export function ScrollWords({ text, start = 0, span = 1 }: { text: string; start?: number; span?: number }) {
  const words = text.split(" ");
  return (
    <span className="sw" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" style={{ ["--k" as string]: (start + (i / words.length) * span).toFixed(3) }}>
          {w}{" "}
        </span>
      ))}
    </span>
  );
}

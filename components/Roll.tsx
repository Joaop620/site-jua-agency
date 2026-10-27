/** Texto que "rola" no hover: a linha sobe e uma cópia entra por baixo. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-t={children}>{children}</span>
    </span>
  );
}

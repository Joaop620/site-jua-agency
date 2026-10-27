import { useId } from "react";

const paths: Record<1 | 2 | 3 | 4, string | null> = {
  1: "M50 4A46 46 0 0 1 50 96A28 46 0 0 0 50 4Z",
  2: "M50 4A46 46 0 0 1 50 96Z",
  3: "M50 4A46 46 0 0 1 50 96A28 46 0 0 1 50 4Z",
  4: null,
};

/** Fases da lua usadas no processo (1 = crescente fina, 4 = cheia). */
export function MoonPhase({ phase, className }: { phase: 1 | 2 | 3 | 4; className?: string }) {
  const id = useId().replace(/:/g, "");
  const d = paths[phase];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`p${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF55A7" />
          <stop offset=".5" stopColor="#E5197A" />
          <stop offset="1" stopColor="#3F1278" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={d ? "none" : `url(#p${id})`} stroke="rgba(247,243,238,.3)" strokeWidth=".8" />
      {d && <path d={d} fill={`url(#p${id})`} />}
    </svg>
  );
}

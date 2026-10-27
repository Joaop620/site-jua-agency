/** Abertura curta com o símbolo sendo desenhado (só na primeira visita da sessão). */
export function Intro() {
  return (
    <div className="intro-ov" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="intro-mark">
        <defs>
          <linearGradient id="intro-g" gradientUnits="userSpaceOnUse" x1="20" y1="6" x2="72" y2="90">
            <stop offset="0" stopColor="#FF55A7" />
            <stop offset=".5" stopColor="#E5197A" />
            <stop offset="1" stopColor="#3F1278" />
          </linearGradient>
        </defs>
        <path className="intro-dot" d="M59.42 9.65 A8.5 8.5 0 1 0 69.35 19.58 A7.2 7.2 0 0 1 59.42 9.65 Z" fill="url(#intro-g)" />
        <path
          className="intro-j"
          d="M61 36V62A18 18 0 0 1 25.6 66.7"
          fill="none"
          stroke="url(#intro-g)"
          strokeWidth="11"
          strokeLinecap="round"
          pathLength={1}
        />
      </svg>
    </div>
  );
}

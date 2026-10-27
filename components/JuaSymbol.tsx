import { useId } from "react";

type Props = { variant?: "gradient" | "mono"; size?: number; className?: string; title?: string };

/** Símbolo Juá: J + lua crescente. */
export function JuaSymbol({ variant = "gradient", size = 34, className, title }: Props) {
  const id = useId().replace(/:/g, "");
  const paint = variant === "gradient" ? `url(#g${id})` : "currentColor";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`g${id}`} gradientUnits="userSpaceOnUse" x1="20" y1="6" x2="72" y2="90">
          <stop offset="0" stopColor="#FF55A7" />
          <stop offset=".5" stopColor="#E5197A" />
          <stop offset="1" stopColor="#3F1278" />
        </linearGradient>
        <mask id={`m${id}`}>
          <rect width="100" height="100" fill="#fff" />
          <circle cx="65.5" cy="13.5" r="7.2" fill="#000" />
        </mask>
      </defs>
      <circle cx="61" cy="18" r="8.5" fill={paint} mask={`url(#m${id})`} />
      <path d="M61 36V62A18 18 0 0 1 25.6 66.7" fill="none" stroke={paint} strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}

import { ImageResponse } from "next/og";

export const alt = "Juá Agency · Bonito. Estratégico. Vende.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(60% 70% at 70% 20%, #3F1278 0%, #0A0620 70%)",
          backgroundColor: "#0A0620",
        }}
      >
        <svg width="320" height="320" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="20" y1="6" x2="72" y2="90">
              <stop offset="0" stopColor="#FF55A7" />
              <stop offset=".5" stopColor="#E5197A" />
              <stop offset="1" stopColor="#3F1278" />
            </linearGradient>
          </defs>
          <path d="M59.42 9.65 A8.5 8.5 0 1 0 69.35 19.58 A7.2 7.2 0 0 1 59.42 9.65 Z" fill="url(#g)" />
          <path d="M61 36V62A18 18 0 0 1 25.6 66.7" fill="none" stroke="url(#g)" strokeWidth="11" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size
  );
}

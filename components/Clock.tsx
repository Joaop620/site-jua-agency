"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Relógio ao vivo no fuso de São Paulo. */
export function Clock({ prefix = "SP" }: { prefix?: string }) {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="clock mono" suppressHydrationWarning>
      {prefix} <time>{now}</time> <span className="dim">BRT</span>
    </span>
  );
}

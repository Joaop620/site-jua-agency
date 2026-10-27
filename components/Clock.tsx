"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Hora local de São Paulo, atualizada ao vivo. */
export function Clock({ prefix }: { prefix?: string }) {
  const [now, setNow] = useState("--:--");
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="clock" suppressHydrationWarning>
      {prefix} <time>{now}</time>
    </span>
  );
}

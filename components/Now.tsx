"use client";

import { useEffect, useState } from "react";

const month = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "America/Porto_Velho" });

/** Mês ("Novembro · 2026") ou ano atual, calculados no navegador pra nunca ficarem velhos. */
export function Now({ kind }: { kind: "month" | "year" }) {
  const [d, setD] = useState<Date | null>(null);
  useEffect(() => setD(new Date()), []);
  const now = d ?? new Date();
  // perto do fim do mês, a agenda aberta já é a do mês seguinte
  const date = kind === "month" && now.getDate() >= 20 ? new Date(now.getFullYear(), now.getMonth() + 1, 15) : now;
  if (kind === "year") return <span suppressHydrationWarning>{date.getFullYear()}</span>;
  const m = month.format(date);
  return (
    <span suppressHydrationWarning>
      {m.charAt(0).toUpperCase() + m.slice(1)} · {date.getFullYear()}
    </span>
  );
}

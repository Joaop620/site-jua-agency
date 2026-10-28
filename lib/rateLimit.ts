/**
 * Limite simples de envios por IP (em memória, por instância do servidor).
 * Não substitui um WAF, mas segura robôs que disparam o formulário em sequência.
 */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, max = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return list.length > max;
}

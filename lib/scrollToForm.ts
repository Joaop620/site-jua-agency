/**
 * Rola até o formulário de contato deixando o título visível abaixo do menu fixo.
 * Calcula no quadro seguinte ao clique, depois que a escolha (plano/serviço) já entrou no formulário.
 */
export function scrollToForm(e?: { preventDefault(): void }) {
  const el = document.getElementById("form");
  if (!el) return;
  e?.preventDefault();
  requestAnimationFrame(() => {
    // offsetTop ignora a animação de entrada (translateY) que o formulário pode estar fazendo
    let top = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
    const y = top - 96;
    const lenis = (window as unknown as { __lenis?: { scrollTo(t: number, o?: object): void } }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", "#form");
    // depois da rolagem, o cursor já fica no primeiro campo
    setTimeout(() => document.getElementById("fn")?.focus({ preventScroll: true }), 1150);
  });
}

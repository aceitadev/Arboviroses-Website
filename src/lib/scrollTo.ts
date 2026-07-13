/** Rolagem suave até um id, respeitando a preferência por movimento reduzido. */
export function scrollToId(id: string, reduced: boolean): void {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

  // Move o foco para a seção, preservando a navegação por teclado.
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.focus({ preventScroll: true });
}

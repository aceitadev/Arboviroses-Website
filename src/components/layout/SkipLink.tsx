import { nav } from '@/data/content';

/** Link "pular para o conteúdo" — visível apenas ao foco por teclado. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-full bg-science px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {nav.skipToContent}
    </a>
  );
}

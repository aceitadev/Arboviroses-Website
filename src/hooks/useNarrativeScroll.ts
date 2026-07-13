'use client';

import { useEffect } from 'react';
import { SECTION_IDS } from '@/lib/sections';
import { scrollState } from '@/lib/scroll/scrollState';
import { useNarrativeStore } from '@/lib/scroll/store';

/**
 * Centraliza o scroll da narrativa:
 * - Um trigger GLOBAL escreve o progresso (0..1) em `scrollState` (para a câmera 3D)
 *   e numa CSS var (para a barra de progresso), sem estado React por frame.
 * - Triggers LOCAIS por seção marcam a seção ativa (baixa frequência).
 * O GSAP é carregado sob demanda (fora do First Load) e sofre cleanup completo.
 */
export function useNarrativeScroll(): void {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      // Evita refresh a cada mudança da barra de endereço no mobile (menos jank).
      ScrollTrigger.config({ ignoreMobileResize: true });

      const setActive = useNarrativeStore.getState().setActive;
      const root = document.documentElement;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: '#conteudo',
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            scrollState.progress = self.progress;
            root.style.setProperty('--narrative-progress', String(self.progress));
          },
        });

        SECTION_IDS.forEach((id, index) => {
          ScrollTrigger.create({
            trigger: `#${id}`,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) {
                scrollState.active = index;
                setActive(id);
              }
            },
          });
        });
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      cleanup = () => {
        window.removeEventListener('load', onLoad);
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
}

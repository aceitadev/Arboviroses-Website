'use client';

import { useNarrativeScroll } from '@/hooks/useNarrativeScroll';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';

/** Ativa o rastreio de scroll e renderiza a barra de progresso. */
export function NarrativeController() {
  useNarrativeScroll();
  return <ProgressIndicator />;
}

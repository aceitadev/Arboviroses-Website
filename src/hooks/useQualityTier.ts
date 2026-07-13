'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { lowerTier, type QualityTier, resolveInitialTier } from '@/lib/quality';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
}

/**
 * Resolve o tier inicial uma única vez e só permite REBAIXAR na sessão
 * (nunca sobe de novo), conforme a diretriz de qualidade adaptativa.
 */
export function useQualityTier() {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<QualityTier>('medium');
  const settled = useRef(false);

  useEffect(() => {
    if (settled.current) return;
    settled.current = true;
    const nav = navigator as NavigatorWithHints;
    setTier(
      resolveInitialTier({
        width: window.innerWidth,
        dpr: window.devicePixelRatio || 1,
        reducedMotion: reduced,
        deviceMemory: nav.deviceMemory,
        hardwareConcurrency: nav.hardwareConcurrency,
      }),
    );
  }, [reduced]);

  const downgrade = useCallback(() => {
    setTier((current) => lowerTier(current));
  }, []);

  return { tier, downgrade };
}

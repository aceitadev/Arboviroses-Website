'use client';

import dynamic from 'next/dynamic';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { StaticSceneFallback } from '@/components/three/StaticSceneFallback';
import { SceneErrorBoundary } from '@/components/three/SceneErrorBoundary';

// Carregamento progressivo: o canvas 3D é importado só no cliente; enquanto
// carrega, mostramos o fundo estático (nunca um vazio).
const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas'), {
  ssr: false,
  loading: () => <StaticSceneFallback />,
});

/**
 * Camada de cena FIXA atrás do conteúdo, sempre pointer-events:none e aria-hidden.
 * Sem WebGL (ou em caso de erro), cai para um fundo estático — o conteúdo do
 * site permanece totalmente acessível no DOM.
 */
export function SceneLayer() {
  const webgl = useWebGLSupport();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {webgl === true ? (
        <SceneErrorBoundary fallback={<StaticSceneFallback />}>
          <SceneCanvas />
        </SceneErrorBoundary>
      ) : (
        <StaticSceneFallback />
      )}
    </div>
  );
}

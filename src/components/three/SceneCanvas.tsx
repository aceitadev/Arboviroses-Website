'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { instanceBudget, maxDprForTier } from '@/lib/quality';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Scene } from '@/components/three/Scene';

/** Canvas persistente. pointer-events sempre desativado (interações ficam no DOM). */
export default function SceneCanvas() {
  const { tier, downgrade } = useQualityTier();
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  const budget = instanceBudget(tier);

  return (
    <Canvas
      className="!pointer-events-none"
      dpr={[1, maxDprForTier(tier)]}
      gl={{
        antialias: tier !== 'low',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ position: [0, 1.6, 8.6], fov: 42, near: 0.1, far: 40 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <PerformanceMonitor onDecline={() => downgrade()} flipflops={3} />
      <Scene tier={tier} budget={budget} reduced={reduced} spread={mobile ? 0.62 : 1} />
    </Canvas>
  );
}

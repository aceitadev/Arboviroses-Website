'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import type { QualityTier } from '@/lib/quality';
import { Lighting } from '@/components/three/Lighting';
import { CameraRig } from '@/components/three/CameraRig';
import { Island } from '@/components/three/objects/Island';
import { MosquitoSwarm } from '@/components/three/objects/MosquitoSwarm';
import { Rain } from '@/components/three/objects/Rain';
import { TemperatureField } from '@/components/three/objects/TemperatureField';
import { ModelCore } from '@/components/three/objects/ModelCore';
import { DataFlow } from '@/components/three/objects/DataFlow';
import { ForecastCurve } from '@/components/three/objects/ForecastCurve';
import { AlertBeacon } from '@/components/three/objects/AlertBeacon';
import { ScrollGuideMosquito } from '@/components/three/objects/ScrollGuideMosquito';

interface SceneProps {
  budget: { mosquitoes: number; rain: number; particles: number };
  reduced: boolean;
  spread: number;
  tier: QualityTier;
}

/** Sob movimento reduzido, redesenha apenas quando o scroll muda (frameloop demand). */
function ScrollInvalidator() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener('scroll', onScroll, { passive: true });
    invalidate();
    return () => window.removeEventListener('scroll', onScroll);
  }, [invalidate]);
  return null;
}

export function Scene({ budget, reduced, spread }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={['#F4F7FB', 9, 22]} />
      <Lighting />
      <CameraRig reduced={reduced} spread={spread} />

      <Island />
      <MosquitoSwarm count={budget.mosquitoes} reduced={reduced} />
      <Rain count={budget.rain} reduced={reduced} />
      <TemperatureField reduced={reduced} />
      <DataFlow count={budget.particles} reduced={reduced} />
      <ModelCore reduced={reduced} />
      <ForecastCurve reduced={reduced} />
      <AlertBeacon reduced={reduced} />
      <ScrollGuideMosquito reduced={reduced} />

      {reduced && <ScrollInvalidator />}
    </>
  );
}

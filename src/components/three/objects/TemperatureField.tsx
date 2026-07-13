'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [1, 2] as const;

/** Termômetro abstrato: nível quente que sobe (representa a temperatura). */
export function TemperatureField({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const fill = useRef<THREE.Mesh>(null);
  const tubeMat = useRef<THREE.MeshStandardMaterial>(null);
  const bulbMat = useRef<THREE.MeshStandardMaterial>(null);
  const fillMat = useRef<THREE.MeshStandardMaterial>(null);
  const opacity = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const stage = stageFromProgress(scrollState.progress);
    const distance = stageDistance(stage, HOMES);

    if (distance > ACTIVE_WINDOW) {
      group.current.visible = false;
      return;
    }
    group.current.visible = true;

    const dt = Math.min(delta, 0.05);
    const target = windowOpacity(distance);
    opacity.current = damp(opacity.current, target, 4, dt);
    if (tubeMat.current) tubeMat.current.opacity = opacity.current * 0.5;
    if (bulbMat.current) bulbMat.current.opacity = opacity.current;
    if (fillMat.current) fillMat.current.opacity = opacity.current;

    if (fill.current) {
      const level = reduced ? 0.7 : 0.55 + Math.sin(performance.now() * 0.0006) * 0.35;
      fill.current.scale.y = level;
      fill.current.position.y = 0.02 + (level * 0.62) / 2;
    }
  });

  return (
    <group ref={group} position={[1.75, 0.2, 0.4]} visible={false}>
      {/* Tubo externo translúcido */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.72, 16]} />
        <meshStandardMaterial
          ref={tubeMat}
          color="#EAF1F7"
          roughness={0.35}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>
      {/* Bulbo quente na base */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.15, 18, 18]} />
        <meshStandardMaterial
          ref={bulbMat}
          color="#E4B23C"
          roughness={0.6}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>
      {/* Coluna que sobe */}
      <mesh ref={fill} position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.62, 12]} />
        <meshStandardMaterial
          ref={fillMat}
          color="#E4B23C"
          roughness={0.5}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

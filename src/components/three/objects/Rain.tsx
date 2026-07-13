'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [1, 2] as const;
const FALL_RANGE = 3.2;

interface Drop {
  x: number;
  z: number;
  y0: number;
  speed: number;
}

/** Chuva: gotas alongadas instanciadas caindo sobre a ilha. */
export function Rain({ count, reduced }: { count: number; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const opacity = useRef(0);

  const drops = useMemo<Drop[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (((i * 73) % 100) / 100) * 4.4 - 2.2,
        z: (((i * 137) % 100) / 100) * 3.2 - 1.6,
        y0: (((i * 191) % 100) / 100) * FALL_RANGE,
        speed: 1.6 + (((i * 57) % 100) / 100) * 1.4,
      })),
    [count],
  );

  // Posição inicial (evita frame 0 com tudo no mesmo lugar).
  useLayoutEffect(() => {
    if (!mesh.current) return;
    drops.forEach((drop, i) => {
      dummy.position.set(drop.x, 0.2 + drop.y0, drop.z);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [drops, dummy]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const stage = stageFromProgress(scrollState.progress);
    const distance = stageDistance(stage, HOMES);

    if (distance > ACTIVE_WINDOW) {
      mesh.current.visible = false;
      return;
    }
    mesh.current.visible = true;

    const target = windowOpacity(distance);
    opacity.current = damp(opacity.current, target, 4, Math.min(delta, 0.05));
    if (material.current) material.current.opacity = opacity.current * 0.55;

    const time = performance.now() * 0.001;
    drops.forEach((drop, i) => {
      const phase = reduced ? drop.y0 : (drop.y0 + time * drop.speed) % FALL_RANGE;
      const y = 0.2 + (FALL_RANGE - phase);
      dummy.position.set(drop.x, y, drop.z);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
      <cylinderGeometry args={[0.01, 0.01, 0.16, 5]} />
      <meshStandardMaterial
        ref={material}
        color="#6FA6D6"
        roughness={0.4}
        metalness={0}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}

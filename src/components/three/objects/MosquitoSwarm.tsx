'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';
import { LowPolyMosquito } from '@/components/three/objects/LowPolyMosquito';

const HOMES = [0, 1, 2, 9] as const;

interface MosquitoSpec {
  base: THREE.Vector3;
  phase: number;
  speed: number;
  scale: number;
  radius: number;
  tilt: number;
}

export function MosquitoSwarm({ count, reduced }: { count: number; reduced: boolean }) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const wings = useRef<Array<[THREE.Mesh | null, THREE.Mesh | null]>>([]);
  const opacity = useRef(0);

  const specs = useMemo<MosquitoSpec[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        base: new THREE.Vector3(
          Math.cos(i * 2.4) * 1.7,
          0.45 + (i % 3) * 0.32,
          Math.sin(i * 1.7) * 1.25,
        ),
        phase: i * 1.7,
        speed: 0.32 + (i % 4) * 0.08,
        scale: 0.85 + (i % 3) * 0.15,
        radius: 0.35 + (i % 3) * 0.15,
        tilt: ((i % 5) - 2) * 0.08,
      })),
    [count],
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A3C4B',
        roughness: 0.75,
        metalness: 0.05,
        transparent: true,
        opacity: 0,
      }),
    [],
  );

  const legMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1A2934',
        roughness: 0.85,
        metalness: 0,
        transparent: true,
        opacity: 0,
      }),
    [],
  );

  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8F2FA',
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame((_, delta) => {
    const stage = stageFromProgress(scrollState.progress);
    const distance = stageDistance(stage, HOMES);
    const dt = Math.min(delta, 0.05);

    if (distance > ACTIVE_WINDOW) {
      for (const g of groups.current) if (g) g.visible = false;
      return;
    }

    const target = windowOpacity(distance);
    opacity.current = damp(opacity.current, target, 4, dt);
    bodyMaterial.opacity = opacity.current;
    legMaterial.opacity = opacity.current * 0.9;
    wingMaterial.opacity = opacity.current * 0.5;

    const time = performance.now() * 0.001;
    specs.forEach((spec, i) => {
      const group = groups.current[i];
      if (!group) return;
      group.visible = true;
      const t = time * spec.speed + spec.phase;
      group.position.set(
        spec.base.x + Math.cos(t) * spec.radius,
        spec.base.y + Math.sin(t * 1.4) * 0.14,
        spec.base.z + Math.sin(t * 0.8) * spec.radius,
      );
      group.rotation.y = Math.atan2(Math.cos(t), Math.sin(t * 0.8)) + Math.PI / 2;
      group.rotation.z = spec.tilt + Math.sin(t * 2.1) * 0.08;

      if (!reduced) {
        const flap = 0.5 + Math.sin(time * 42 + spec.phase) * 0.75;
        const pair = wings.current[i];
        if (pair) {
          if (pair[0]) pair[0].rotation.z = flap;
          if (pair[1]) pair[1].rotation.z = -flap;
        }
      }
    });
  });

  return (
    <group>
      {specs.map((spec, i) => (
        <LowPolyMosquito
          key={i}
          scale={spec.scale}
          bodyMaterial={bodyMaterial}
          legMaterial={legMaterial}
          wingMaterial={wingMaterial}
          registerRefs={({ group, wingLeft, wingRight }) => {
            groups.current[i] = group;
            const pair = wings.current[i] ?? [null, null];
            pair[0] = wingLeft;
            pair[1] = wingRight;
            wings.current[i] = pair;
          }}
        />
      ))}
    </group>
  );
}

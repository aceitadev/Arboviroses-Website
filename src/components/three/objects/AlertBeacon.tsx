'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [6] as const;

/** Sinal de alerta antecipado: anéis suaves que se expandem (sem neon). */
export function AlertBeacon({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
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

    const target = windowOpacity(distance);
    opacity.current = damp(opacity.current, target, 4, Math.min(delta, 0.05));
    if (coreMat.current) coreMat.current.opacity = opacity.current;

    const time = performance.now() * 0.001;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = reduced ? 0.5 : (time * 0.5 + i / rings.current.length) % 1;
      const scale = 0.4 + phase * 1.4;
      ring.scale.set(scale, scale, scale);
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity.current * (1 - phase) * 0.5;
    });
  });

  return (
    <group ref={group} position={[0, 0.7, 0]} visible={false}>
      {/* Núcleo do alerta */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial ref={coreMat} color="#DC4E2A" roughness={0.5} metalness={0} transparent opacity={0} />
      </mesh>
      {/* Anéis em expansão */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(node) => {
            rings.current[i] = node;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.4, 0.012, 8, 40]} />
          <meshBasicMaterial color="#DC4E2A" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

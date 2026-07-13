'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [2, 3] as const;
const CENTER = new THREE.Vector3(0, 0.55, 0);
// Chuva, temperatura e casos viram blocos de dados fluindo para o modelo.
const COLORS = ['#7FB4DB', '#E4B23C', '#1E6FB8'];

interface Particle {
  start: THREE.Vector3;
  phase: number;
  speed: number;
}

export function DataFlow({ count, reduced }: { count: number; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const opacity = useRef(0);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = i * 2.399;
        const radius = 2.1 + (i % 3) * 0.35;
        return {
          start: new THREE.Vector3(
            Math.cos(angle) * radius,
            0.55 + Math.sin(i * 1.1) * 0.7,
            Math.sin(angle) * radius * 0.6,
          ),
          phase: i / count,
          speed: 0.12 + (i % 4) * 0.02,
        };
      }),
    [count],
  );

  useLayoutEffect(() => {
    if (!mesh.current) return;
    particles.forEach((_, i) => {
      mesh.current!.setColorAt(i, new THREE.Color(COLORS[i % COLORS.length]));
    });
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [particles]);

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
    if (material.current) material.current.opacity = opacity.current;

    const time = performance.now() * 0.001;
    particles.forEach((particle, i) => {
      const t = reduced ? particle.phase : (time * particle.speed + particle.phase) % 1;
      const eased = t * t * (3 - 2 * t);
      dummy.position.lerpVectors(particle.start, CENTER, eased);
      const scale = 0.05 * (0.35 + 0.65 * (1 - t));
      dummy.scale.setScalar(scale);
      dummy.rotation.set(t * 6, t * 4, 0);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={material} roughness={0.6} metalness={0} transparent opacity={0} />
    </instancedMesh>
  );
}

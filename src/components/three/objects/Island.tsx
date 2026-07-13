'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [0, 1, 2, 3, 9] as const;

/** Base/ilha abstrata: maquete científica de baixa complexidade, matte. */
export function Island() {
  const group = useRef<THREE.Group>(null);
  const landMat = useRef<THREE.MeshStandardMaterial>(null);
  const waterMat = useRef<THREE.MeshStandardMaterial>(null);
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null);
  const opacity = useRef(0);

  const landGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.15, 1);
    geo.scale(1, 0.3, 1);
    return geo;
  }, []);

  // Sombra suave e barata (textura de gradiente radial, sem custo por frame).
  const shadowTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(26,46,62,0.32)');
    gradient.addColorStop(0.6, 'rgba(26,46,62,0.12)');
    gradient.addColorStop(1, 'rgba(26,46,62,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

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
    if (landMat.current) landMat.current.opacity = opacity.current;
    if (waterMat.current) waterMat.current.opacity = opacity.current * 0.85;
    if (shadowMat.current) shadowMat.current.opacity = opacity.current * 0.9;

    group.current.rotation.y += delta * 0.04;
    group.current.position.y = -0.5 + Math.sin(performance.now() * 0.0004) * 0.03;
  });

  return (
    <group ref={group} visible={false}>
      <mesh geometry={landGeometry} castShadow>
        <meshStandardMaterial
          ref={landMat}
          color="#B7CEC3"
          roughness={0.95}
          metalness={0}
          flatShading
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[3.3, 3.3, 0.14, 56]} />
        <meshStandardMaterial
          ref={waterMat}
          color="#9CC3E0"
          roughness={0.6}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.9, 48]} />
        <meshBasicMaterial
          ref={shadowMat}
          map={shadowTexture}
          transparent
          depthWrite={false}
          opacity={0}
        />
      </mesh>
    </group>
  );
}

'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [6, 9] as const;

/** Curva de previsão: um tubo ascendente com um marcador que avança sobre ela. */
export function ForecastCurve({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const tubeMat = useRef<THREE.MeshStandardMaterial>(null);
  const marker = useRef<THREE.Mesh>(null);
  const markerMat = useRef<THREE.MeshStandardMaterial>(null);
  const opacity = useRef(0);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.9, 0.15, 0.2),
        new THREE.Vector3(-1.0, 0.35, 0.1),
        new THREE.Vector3(-0.2, 0.3, 0),
        new THREE.Vector3(0.5, 0.7, -0.1),
        new THREE.Vector3(1.2, 1.15, -0.15),
        new THREE.Vector3(1.9, 1.7, -0.2),
      ]),
    [],
  );

  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 60, 0.035, 8, false), [curve]);

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
    if (tubeMat.current) tubeMat.current.opacity = opacity.current * 0.9;
    if (markerMat.current) markerMat.current.opacity = opacity.current;

    if (marker.current) {
      const t = reduced ? 0.7 : (Math.sin(performance.now() * 0.0004) * 0.5 + 0.5) * 0.85 + 0.1;
      curve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), marker.current.position);
    }
  });

  return (
    <group ref={group} position={[0, 0.1, 0.6]} visible={false}>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial ref={tubeMat} color="#1E6FB8" roughness={0.6} metalness={0} transparent opacity={0} />
      </mesh>
      <mesh ref={marker}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshStandardMaterial ref={markerMat} color="#3E9C7A" roughness={0.5} metalness={0} transparent opacity={0} />
      </mesh>
    </group>
  );
}

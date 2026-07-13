'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { ACTIVE_WINDOW, damp, stageDistance, stageFromProgress, windowOpacity } from '@/lib/three/scene';

const HOMES = [2, 3, 6] as const;

/**
 * Núcleo do "modelo": camadas translúcidas com nós conectados (representa
 * camadas/relações/processamento — NÃO um cérebro ou robô).
 */
export function ModelCore({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);

  const layers = useMemo(
    () => [
      { z: -0.42, color: '#7FB4DB', nodes: 5 },
      { z: 0, color: '#1E6FB8', nodes: 6 },
      { z: 0.42, color: '#3E9C7A', nodes: 5 },
    ],
    [],
  );

  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.05, 10, 10), []);

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
    group.current.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.opacity = mesh.geometry === nodeGeometry ? opacity.current : opacity.current * 0.85;
      }
    });

    if (!reduced) {
      group.current.rotation.y = Math.sin(performance.now() * 0.0002) * 0.4;
    }
  });

  return (
    <group ref={group} position={[0, 0.55, 0]} visible={false}>
      {layers.map((layer, li) => (
        <group key={li} position={[0, 0, layer.z]} rotation={[0, li * 0.12 - 0.12, 0]}>
          {/* Camada (placa arredondada translúcida) */}
          <mesh>
            <boxGeometry args={[1.15, 0.72, 0.04]} />
            <meshStandardMaterial color={layer.color} roughness={0.75} metalness={0} transparent opacity={0} />
          </mesh>
          {/* Nós na camada */}
          {Array.from({ length: layer.nodes }, (_, ni) => (
            <mesh
              key={ni}
              geometry={nodeGeometry}
              position={[(ni / (layer.nodes - 1) - 0.5) * 0.9, Math.sin(ni * 1.3 + li) * 0.22, 0.03]}
            >
              <meshStandardMaterial color="#12303F" roughness={0.6} metalness={0} transparent opacity={0} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

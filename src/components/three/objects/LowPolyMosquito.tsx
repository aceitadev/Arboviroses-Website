'use client';

import React from 'react';
import * as THREE from 'three';

export interface MosquitoAnatomyRefs {
  group: THREE.Group | null;
  wingLeft: THREE.Mesh | null;
  wingRight: THREE.Mesh | null;
}

interface LowPolyMosquitoProps {
  bodyMaterial: THREE.Material;
  wingMaterial: THREE.Material;
  legMaterial?: THREE.Material;
  scale?: number;
  registerRefs?: (refs: MosquitoAnatomyRefs) => void;
}

/**
 * Modelo anatômico low-poly estilizado de um mosquito (Aedes aegypti / arboviroses):
 * - Cabeça facetada com probóscide alongada
 * - Tórax robusto e angulado
 * - Abdômen segmentado em 4 anéis com afilamento
 * - 3 pares de pernas finas articuladas (frente, meio, trás)
 * - Duas asas translúcidas articuladas independentes
 */
export function LowPolyMosquito({
  bodyMaterial,
  wingMaterial,
  legMaterial,
  scale = 1,
  registerRefs,
}: LowPolyMosquitoProps) {
  const groupRef = React.useRef<THREE.Group | null>(null);
  const wingLeftRef = React.useRef<THREE.Mesh | null>(null);
  const wingRightRef = React.useRef<THREE.Mesh | null>(null);

  React.useEffect(() => {
    if (registerRefs) {
      registerRefs({
        group: groupRef.current,
        wingLeft: wingLeftRef.current,
        wingRight: wingRightRef.current,
      });
    }
  }, [registerRefs]);

  const effectiveLegMat = legMaterial || bodyMaterial;

  return (
    <group ref={groupRef} scale={scale}>
      {/* --- TÓRAX (Centro de massa do inseto) --- */}
      <mesh material={bodyMaterial} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
        <dodecahedronGeometry args={[0.075, 0]} />
      </mesh>

      {/* --- CABEÇA --- */}
      <group position={[0, 0.02, 0.11]}>
        <mesh material={bodyMaterial}>
          <icosahedronGeometry args={[0.045, 0]} />
        </mesh>
        {/* Olhos facetados sutis (esferas laterais menores) */}
        <mesh material={bodyMaterial} position={[0.03, 0.01, 0.01]}>
          <sphereGeometry args={[0.018, 4, 4]} />
        </mesh>
        <mesh material={bodyMaterial} position={[-0.03, 0.01, 0.01]}>
          <sphereGeometry args={[0.018, 4, 4]} />
        </mesh>
        {/* Probóscide fina voltada para a frente/baixo */}
        <mesh material={effectiveLegMat} position={[0, -0.015, 0.11]} rotation={[Math.PI / 2 + 0.15, 0, 0]}>
          <coneGeometry args={[0.007, 0.16, 5]} />
        </mesh>
      </group>

      {/* --- ABDÔMEN SEGMENTADO (4 segmentos afilando para trás) --- */}
      <group position={[0, -0.02, -0.07]} rotation={[-0.25, 0, 0]}>
        {/* Segmento 1 */}
        <mesh material={bodyMaterial} position={[0, 0, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.042, 0.065, 6]} />
        </mesh>
        {/* Segmento 2 */}
        <mesh material={bodyMaterial} position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.042, 0.033, 0.065, 6]} />
        </mesh>
        {/* Segmento 3 */}
        <mesh material={bodyMaterial} position={[0, 0, -0.145]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.033, 0.022, 0.055, 6]} />
        </mesh>
        {/* Segmento 4 (ponta terminal do abdômen) */}
        <mesh material={bodyMaterial} position={[0, 0, -0.19]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.022, 0.05, 5]} />
        </mesh>
      </group>

      {/* --- ASAS TRANSLÚCIDAS --- */}
      {/* Asa Esquerda */}
      <mesh
        ref={wingLeftRef}
        material={wingMaterial}
        position={[0.028, 0.065, 0.01]}
        rotation={[0.1, 0, 0.45]}
        scale={[1, 0.42, 1]}
      >
        <circleGeometry args={[0.185, 12]} />
      </mesh>
      {/* Asa Direita */}
      <mesh
        ref={wingRightRef}
        material={wingMaterial}
        position={[-0.028, 0.065, 0.01]}
        rotation={[0.1, 0, -0.45]}
        scale={[1, 0.42, 1]}
      >
        <circleGeometry args={[0.185, 12]} />
      </mesh>

      {/* --- PERNAS ARTICULADAS LOW-POLY (3 pares) --- */}
      {/* Par Dianteiro */}
      <group position={[0.04, -0.02, 0.05]} rotation={[0.4, 0, -0.6]}>
        <mesh material={effectiveLegMat} position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.005, 0.003, 0.13, 4]} />
        </mesh>
      </group>
      <group position={[-0.04, -0.02, 0.05]} rotation={[0.4, 0, 0.6]}>
        <mesh material={effectiveLegMat} position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.005, 0.003, 0.13, 4]} />
        </mesh>
      </group>

      {/* Par Intermediário */}
      <group position={[0.045, -0.03, -0.01]} rotation={[0, 0, -0.75]}>
        <mesh material={effectiveLegMat} position={[0, -0.065, 0]}>
          <cylinderGeometry args={[0.005, 0.003, 0.14, 4]} />
        </mesh>
      </group>
      <group position={[-0.045, -0.03, -0.01]} rotation={[0, 0, 0.75]}>
        <mesh material={effectiveLegMat} position={[0, -0.065, 0]}>
          <cylinderGeometry args={[0.005, 0.003, 0.14, 4]} />
        </mesh>
      </group>

      {/* Par Traseiro (mais longo e ligeiramente erguido para trás) */}
      <group position={[0.035, -0.02, -0.05]} rotation={[-0.5, 0, -0.65]}>
        <mesh material={effectiveLegMat} position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.005, 0.0025, 0.18, 4]} />
        </mesh>
      </group>
      <group position={[-0.035, -0.02, -0.05]} rotation={[-0.5, 0, 0.65]}>
        <mesh material={effectiveLegMat} position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.005, 0.0025, 0.18, 4]} />
        </mesh>
      </group>
    </group>
  );
}

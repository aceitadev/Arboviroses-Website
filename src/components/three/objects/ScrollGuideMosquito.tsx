'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { damp } from '@/lib/three/scene';
import { LowPolyMosquito, type MosquitoAnatomyRefs } from '@/components/three/objects/LowPolyMosquito';

/**
 * Mosquito protagonista que voa debaixo para cima ao longo da narrativa de scroll.
 * Possui trajetória curva 3D, inclinação dinâmica de voo e asas independentes do scroll.
 */
export function ScrollGuideMosquito({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const wingLeftRef = useRef<THREE.Mesh | null>(null);
  const wingRightRef = useRef<THREE.Mesh | null>(null);

  // Progresso suave amortecido para evitar saltos durante scroll rápido
  const currentProgress = useRef(0);
  const currentPos = useRef(new THREE.Vector3(0.5, 0.2, 1.2));

  // Trajetória curva 3D que atravessa a cena conectando as seções ao longo do scroll
  const flightPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.2, -0.2, 1.4),   // Seção inicial / inferior
      new THREE.Vector3(-1.1, 0.35, 1.0),  // Subindo pelas seções problema / ideia
      new THREE.Vector3(0.8, 0.6, 0.6),    // Atravessando o pipeline de dados
      new THREE.Vector3(-0.6, 0.85, 0.4),  // Região do mapa e previsão
      new THREE.Vector3(0.9, 1.15, 0.2),   // Benefícios / Limitações
      new THREE.Vector3(0.0, 1.35, 0.5),   // Topo / Encerramento
    ]);
  }, []);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E4B6E',
        roughness: 0.5,
        metalness: 0.15,
      }),
    [],
  );

  const legMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#112C40',
        roughness: 0.7,
        metalness: 0.1,
      }),
    [],
  );

  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D8ECF8',
        roughness: 0.25,
        metalness: 0.2,
        transparent: true,
        opacity: 0.68,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const nextPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const group = groupRef.current;
    if (!group) return;

    if (reduced) {
      // Sob movimento reduzido, repousa suavemente num ponto seguro da cena sem manobras de voo
      group.position.set(0.7, 0.45, 1.1);
      group.rotation.set(0, -0.4, 0);
      return;
    }

    // Amortecimento do progresso da rolagem para voo orgânico
    const targetP = THREE.MathUtils.clamp(scrollState.progress, 0, 0.999);
    currentProgress.current = damp(currentProgress.current, targetP, 3.2, dt);

    const time = performance.now() * 0.001;
    const p = currentProgress.current;

    // Amostra posição atual e ponto ligeiramente à frente para calcular orientação de voo
    flightPath.getPointAt(p, nextPoint);
    currentPos.current.x = damp(currentPos.current.x, nextPoint.x, 6, dt);
    currentPos.current.y = damp(currentPos.current.y, nextPoint.y, 6, dt);
    currentPos.current.z = damp(currentPos.current.z, nextPoint.z, 6, dt);

    // Oscilação secundária sutil simulando instabilidade aerodinâmica
    const hoverX = Math.sin(time * 2.3) * 0.04;
    const hoverY = Math.cos(time * 3.1) * 0.03;
    const hoverZ = Math.sin(time * 1.9) * 0.03;

    group.position.set(
      currentPos.current.x + hoverX,
      currentPos.current.y + hoverY,
      currentPos.current.z + hoverZ,
    );

    // Orientação na direção do próximo trecho da curva
    const forwardP = Math.min(p + 0.03, 0.999);
    flightPath.getPointAt(forwardP, lookTarget);
    group.lookAt(lookTarget);

    // Bancagem lateral (roll) dependente da variação de direção + ondulação das asas
    const bank = Math.sin(time * 2.7) * 0.12;
    group.rotation.z += bank;

    // Batimento contínuo de asas independentemente do scroll
    const flap = 0.55 + Math.sin(time * 48) * 0.72;
    if (wingLeftRef.current) wingLeftRef.current.rotation.z = flap;
    if (wingRightRef.current) wingRightRef.current.rotation.z = -flap;
  });

  return (
    <group>
      <LowPolyMosquito
        scale={1.35}
        bodyMaterial={bodyMaterial}
        legMaterial={legMaterial}
        wingMaterial={wingMaterial}
        registerRefs={({ group, wingLeft, wingRight }: MosquitoAnatomyRefs) => {
          groupRef.current = group;
          wingLeftRef.current = wingLeft;
          wingRightRef.current = wingRight;
        }}
      />
    </group>
  );
}

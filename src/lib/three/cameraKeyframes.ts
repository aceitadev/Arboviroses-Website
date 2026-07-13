import * as THREE from 'three';
import { STAGE_COUNT, stageFromProgress } from '@/lib/three/scene';

export interface CameraKey {
  pos: [number, number, number];
  target: [number, number, number];
}

/**
 * Keyframes suaves por seção (movimentos modestos, cinematográficos).
 * Índices 0..9 acompanham as 10 seções da narrativa.
 */
export const CAMERA_KEYS: readonly CameraKey[] = [
  { pos: [0, 1.6, 8.6], target: [0, 0.3, 0] }, // abertura
  { pos: [1.2, 1.15, 7.2], target: [0.2, 0.15, 0] }, // problema
  { pos: [-0.9, 1.0, 6.6], target: [0, 0.45, 0] }, // ideia
  { pos: [0.1, 1.35, 7.0], target: [0, 0.2, 0] }, // como funciona
  { pos: [0, 2.25, 9.0], target: [0, -0.25, 0] }, // mapa (recua)
  { pos: [0.6, 1.6, 8.8], target: [0, 0.1, 0] }, // previsão
  { pos: [-0.7, 1.15, 6.9], target: [0, 0.5, 0] }, // entrega
  { pos: [0, 1.5, 8.2], target: [0, 0.2, 0] }, // limitações
  { pos: [0, 1.8, 8.8], target: [0, 0.1, 0] }, // sobre
  { pos: [0, 1.35, 7.4], target: [0, 0.35, 0] }, // encerramento
];

/**
 * Amostra a câmera pelo progresso, escrevendo em vetores reutilizáveis.
 * `spread` reduz a amplitude do movimento (usado no mobile, correção #5).
 */
export function sampleCamera(
  progress: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
  spread = 1,
): void {
  const s = stageFromProgress(progress);
  const i0 = Math.floor(THREE.MathUtils.clamp(s, 0, STAGE_COUNT - 1));
  const i1 = Math.min(i0 + 1, STAGE_COUNT - 1);
  const t = s - i0;

  const a = CAMERA_KEYS[i0]!;
  const b = CAMERA_KEYS[i1]!;

  outPos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
  );
  outTarget.set(
    THREE.MathUtils.lerp(a.target[0], b.target[0], t),
    THREE.MathUtils.lerp(a.target[1], b.target[1], t),
    THREE.MathUtils.lerp(a.target[2], b.target[2], t),
  );

  if (spread !== 1) {
    // Reduz a amplitude horizontal/vertical mantendo o enquadramento geral.
    outPos.x *= spread;
    outPos.y = 1.5 + (outPos.y - 1.5) * spread;
    outPos.z += (1 - spread) * 1.1;
  }
}

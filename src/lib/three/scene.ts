import * as THREE from 'three';

/**
 * Constantes e utilitários da narrativa 3D (durações/janelas centralizadas).
 */

export const STAGE_COUNT = 10;

/** Amortecimento da câmera (lambda de THREE.MathUtils.damp). */
export const CAMERA_DAMP = 2.4;

/**
 * Um objeto só anima quando a distância (em estágios) até seu estágio "casa" é
 * menor que isto — garante que apenas seções vizinhas (±1) rodem useFrame.
 */
export const ACTIVE_WINDOW = 1.6;

/** Posição contínua na narrativa a partir do progresso global. */
export function stageFromProgress(progress: number): number {
  return progress * (STAGE_COUNT - 1);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Menor distância, em estágios, entre a posição atual e os estágios "casa". */
export function stageDistance(stage: number, homes: readonly number[]): number {
  let min = Infinity;
  for (const home of homes) min = Math.min(min, Math.abs(stage - home));
  return min;
}

/** Opacidade de janela: 1 perto do estágio casa, 0 ao se afastar. */
export function windowOpacity(distance: number, full = 0.7, fade = 1.5): number {
  if (distance <= full) return 1;
  if (distance >= fade) return 0;
  return 1 - smoothstep(full, fade, distance);
}

export const damp = THREE.MathUtils.damp;

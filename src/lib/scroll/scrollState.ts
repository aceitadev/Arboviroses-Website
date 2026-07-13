/**
 * Estado de scroll TRANSITÓRIO (mutável, fora do React). Lido a cada frame pela
 * cena 3D via useFrame — nunca dispara re-render. Atualizado pelo ScrollTrigger.
 */
export const scrollState = {
  /** Progresso global da narrativa (0..1). */
  progress: 0,
  /** Índice da seção ativa. */
  active: 0,
};

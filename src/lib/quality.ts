/**
 * Sistema de qualidade adaptativa. Combina vários sinais (não depende só de
 * hardwareConcurrency). A qualidade pode CAIR automaticamente em runtime, mas
 * nunca volta a subir na mesma sessão (ver useQualityTier).
 */

export type QualityTier = 'high' | 'medium' | 'low';

/** Ordem crescente de custo/qualidade. */
export const TIER_ORDER: readonly QualityTier[] = ['low', 'medium', 'high'];

export interface QualityInputs {
  width: number;
  dpr: number;
  reducedMotion: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export function resolveInitialTier(input: QualityInputs): QualityTier {
  let score = 0;

  if (input.width >= 1024) score += 2;
  else if (input.width >= 640) score += 1;

  if (input.dpr <= 1.5) score += 2;
  else if (input.dpr <= 2) score += 1;

  if (input.deviceMemory === undefined) score += 1;
  else if (input.deviceMemory >= 8) score += 2;
  else if (input.deviceMemory >= 4) score += 1;

  if (input.hardwareConcurrency !== undefined && input.hardwareConcurrency >= 8) {
    score += 1;
  }

  let tier: QualityTier = score >= 5 ? 'high' : score >= 3 ? 'medium' : 'low';

  // Preferência por movimento reduzido nunca usa o tier mais caro.
  if (input.reducedMotion && tier === 'high') tier = 'medium';

  return tier;
}

/** Rebaixa um nível (nunca sobe). */
export function lowerTier(tier: QualityTier): QualityTier {
  const idx = TIER_ORDER.indexOf(tier);
  return TIER_ORDER[Math.max(0, idx - 1)]!;
}

/** DPR máximo permitido por tier (limita densidade de pixels do canvas). */
export function maxDprForTier(tier: QualityTier): number {
  switch (tier) {
    case 'high':
      return 2;
    case 'medium':
      return 1.5;
    case 'low':
      return 1;
  }
}

/** Contagem de instâncias (mosquitos, chuva, pontos) por tier. */
export function instanceBudget(tier: QualityTier): { mosquitoes: number; rain: number; particles: number } {
  switch (tier) {
    case 'high':
      return { mosquitoes: 6, rain: 52, particles: 56 };
    case 'medium':
      return { mosquitoes: 5, rain: 36, particles: 38 };
    case 'low':
      return { mosquitoes: 3, rain: 22, particles: 22 };
  }
}

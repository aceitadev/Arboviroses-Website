import { describe, expect, it } from 'vitest';
import {
  instanceBudget,
  lowerTier,
  maxDprForTier,
  resolveInitialTier,
  TIER_ORDER,
} from '@/lib/quality';

describe('resolveInitialTier', () => {
  it('classifica desktop robusto como alta', () => {
    const tier = resolveInitialTier({
      width: 1440,
      dpr: 1,
      reducedMotion: false,
      deviceMemory: 8,
      hardwareConcurrency: 8,
    });
    expect(tier).toBe('high');
  });

  it('classifica celular modesto como baixa', () => {
    const tier = resolveInitialTier({
      width: 360,
      dpr: 3,
      reducedMotion: false,
      deviceMemory: 2,
    });
    expect(tier).toBe('low');
  });

  it('nunca usa alta com movimento reduzido', () => {
    const tier = resolveInitialTier({
      width: 1440,
      dpr: 1,
      reducedMotion: true,
      deviceMemory: 8,
      hardwareConcurrency: 8,
    });
    expect(tier).not.toBe('high');
  });
});

describe('lowerTier', () => {
  it('rebaixa um nível', () => {
    expect(lowerTier('high')).toBe('medium');
    expect(lowerTier('medium')).toBe('low');
  });

  it('não desce abaixo de baixa', () => {
    expect(lowerTier('low')).toBe('low');
  });

  it('nunca aumenta o índice do tier', () => {
    for (const tier of TIER_ORDER) {
      expect(TIER_ORDER.indexOf(lowerTier(tier))).toBeLessThanOrEqual(TIER_ORDER.indexOf(tier));
    }
  });
});

describe('orçamentos por tier', () => {
  it('DPR máximo cresce com o tier', () => {
    expect(maxDprForTier('low')).toBeLessThan(maxDprForTier('medium'));
    expect(maxDprForTier('medium')).toBeLessThan(maxDprForTier('high'));
  });

  it('instâncias diminuem em tiers mais baixos', () => {
    expect(instanceBudget('low').mosquitoes).toBeLessThan(instanceBudget('high').mosquitoes);
    expect(instanceBudget('low').rain).toBeLessThan(instanceBudget('high').rain);
  });
});

import { buildDataset, type DatasetConfig } from '@/lib/dataset';

/**
 * DADOS ILUSTRATIVOS — Zika.
 * O formato ecoa o comportamento real (pico por volta de 2016 e queda para
 * patamares muito baixos nos anos seguintes). Números fictícios, apenas para
 * demonstração. Não representam dados oficiais.
 */
export const zikaConfig: DatasetConfig = {
  id: 'zika',
  start: { month: 1, year: 2016 },
  // 20 meses (jan/16 → ago/17): um pico inicial e decaimento a quase zero.
  observed: [60, 140, 220, 180, 90, 40, 18, 9, 6, 8, 12, 20, 26, 34, 40, 22, 10, 4, 2, 1],
  // 4 meses de previsão (set/17 → dez/17): patamar baixo, sem surto.
  forecastPredicted: [2, 3, 5, 8],
  thresholds: { moderate: 40, high: 120 },
  bandRatio: 0.34,
};

export const zikaDataset = buildDataset(zikaConfig);

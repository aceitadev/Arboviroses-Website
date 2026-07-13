import { buildDataset, type DatasetConfig } from '@/lib/dataset';

/**
 * DADOS ILUSTRATIVOS — Chikungunya.
 * O formato ecoa o comportamento real (circulação baixa e esporádica, com
 * pequenas elevações sazonais). Números fictícios, apenas para demonstração.
 * Não representam dados oficiais.
 */
export const chikungunyaConfig: DatasetConfig = {
  id: 'chikungunya',
  start: { month: 1, year: 2022 },
  // 20 meses (jan/22 → ago/23): elevações baixas de outono.
  observed: [8, 14, 22, 18, 10, 5, 3, 2, 3, 6, 9, 12, 16, 24, 30, 21, 12, 6, 4, 3],
  // 4 meses de previsão (set/23 → dez/23): leve subida.
  forecastPredicted: [5, 9, 14, 20],
  thresholds: { moderate: 15, high: 28 },
  bandRatio: 0.38,
};

export const chikungunyaDataset = buildDataset(chikungunyaConfig);

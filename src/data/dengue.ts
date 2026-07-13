import { buildDataset, type DatasetConfig } from '@/lib/dataset';

/**
 * DADOS ILUSTRATIVOS — Dengue.
 * O formato ecoa a sazonalidade real observada no InfoDengue para Florianópolis
 * (picos no verão/outono, com escalada entre anos), mas os números são fictícios
 * e servem apenas à demonstração visual. Não representam dados oficiais.
 */
export const dengueConfig: DatasetConfig = {
  id: 'dengue',
  start: { month: 1, year: 2023 },
  // 20 meses de histórico (jan/23 → ago/24): dois picos de outono.
  observed: [
    240, 420, 780, 1150, 640, 210, 80, 45, 38, 70, 160, 380, 620, 1020, 1580, 1240, 690, 240, 95,
    60,
  ],
  // 4 meses de previsão (set/24 → dez/24): risco subindo rumo à próxima estação.
  forecastPredicted: [130, 290, 560, 980],
  thresholds: { moderate: 300, high: 800 },
  bandRatio: 0.28,
};

export const dengueDataset = buildDataset(dengueConfig);

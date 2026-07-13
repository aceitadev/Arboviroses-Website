import { describe, expect, it } from 'vitest';
import { buildDataset, climateSeries, deriveRiskLevel, type DatasetConfig } from '@/lib/dataset';

const sampleConfig: DatasetConfig = {
  id: 'dengue',
  start: { month: 11, year: 2023 },
  observed: [100, 200, 400, 300],
  forecastPredicted: [150, 260],
  thresholds: { moderate: 150, high: 350 },
  bandRatio: 0.3,
};

describe('deriveRiskLevel', () => {
  const thresholds = { moderate: 150, high: 350 };

  it('classifica abaixo do limiar como baixo', () => {
    expect(deriveRiskLevel(149, thresholds)).toBe('baixo');
  });

  it('classifica no limiar moderado como moderado', () => {
    expect(deriveRiskLevel(150, thresholds)).toBe('moderado');
    expect(deriveRiskLevel(349, thresholds)).toBe('moderado');
  });

  it('classifica no limiar alto como alto', () => {
    expect(deriveRiskLevel(350, thresholds)).toBe('alto');
    expect(deriveRiskLevel(9000, thresholds)).toBe('alto');
  });
});

describe('climateSeries', () => {
  it('respeita o comprimento pedido', () => {
    expect(climateSeries(1, 24)).toMatchObject({
      temperature: expect.any(Array),
      precipitation: expect.any(Array),
    });
    expect(climateSeries(1, 24).temperature).toHaveLength(24);
    expect(climateSeries(1, 24).precipitation).toHaveLength(24);
  });

  it('é determinística', () => {
    expect(climateSeries(3, 12)).toEqual(climateSeries(3, 12));
  });

  it('faz o ciclo dos meses (dezembro volta a janeiro)', () => {
    const { temperature } = climateSeries(12, 2);
    // dez (índice 11) e depois jan do ano seguinte (com leve drift anual de +0,15,
    // arredondado a 1 casa: 26,6 + 0,15 = 26,75 → 26,8).
    expect(temperature[0]).toBeCloseTo(24.7, 5);
    expect(temperature[1]).toBeCloseTo(26.8, 5);
  });
});

describe('buildDataset', () => {
  const dataset = buildDataset(sampleConfig);

  it('produz o total de pontos histórico + previsão', () => {
    expect(dataset.points).toHaveLength(6);
    expect(dataset.historyCount).toBe(4);
    expect(dataset.forecastCount).toBe(2);
  });

  it('marca observado apenas no histórico', () => {
    const history = dataset.points.filter((p) => p.phase === 'history');
    const future = dataset.points.filter((p) => p.phase === 'forecast');
    expect(history.every((p) => typeof p.observed === 'number')).toBe(true);
    expect(future.every((p) => p.observed === null)).toBe(true);
  });

  it('usa os valores previstos informados no trecho futuro', () => {
    const future = dataset.points.filter((p) => p.phase === 'forecast');
    expect(future.map((p) => p.predicted)).toEqual([150, 260]);
  });

  it('mantém faixa de incerteza coerente (0 <= lower <= upper)', () => {
    for (const p of dataset.points) {
      expect(p.lower).toBeGreaterThanOrEqual(0);
      expect(p.upper).toBeGreaterThanOrEqual(p.lower);
    }
  });

  it('escala do eixo cobre o pico observado e a faixa superior', () => {
    const maxUpper = Math.max(...dataset.points.map((p) => p.upper));
    expect(dataset.maxValue).toBeGreaterThanOrEqual(dataset.peakObserved);
    expect(dataset.maxValue).toBeGreaterThanOrEqual(maxUpper);
  });

  it('gera rótulos de mês no formato esperado', () => {
    expect(dataset.points[0]!.label).toBe('nov/23');
    expect(dataset.points[2]!.label).toBe('jan/24');
  });

  it('é determinística para a mesma configuração', () => {
    expect(buildDataset(sampleConfig)).toEqual(buildDataset(sampleConfig));
  });
});

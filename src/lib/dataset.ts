import { palette } from '@/lib/palette';
import type { DiseaseDataset, DiseaseId, RiskLevel, RiskThresholds, TimelinePoint } from '@/types';

/**
 * Construtor determinístico de datasets. Recebe séries fixas (nunca aleatórias)
 * e deriva o ajuste do "modelo", a faixa de incerteza e o nível de risco.
 * TODOS os valores resultantes são ILUSTRATIVOS — ver rótulos na interface.
 */

const MONTH_ABBR = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
] as const;

/** Normais climáticas mensais ILUSTRATIVAS de Florianópolis (jan..dez). */
const MONTHLY_TEMP = [26.6, 26.9, 25.5, 22.7, 20.2, 18.1, 17.2, 18.0, 18.8, 20.6, 22.7, 24.7];
const MONTHLY_PRECIP = [200, 210, 170, 130, 110, 92, 88, 88, 122, 152, 142, 182];

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Série climática determinística a partir de um mês/ano inicial. */
export function climateSeries(
  startMonth: number,
  length: number,
): { temperature: number[]; precipitation: number[] } {
  const temperature: number[] = [];
  const precipitation: number[] = [];
  for (let i = 0; i < length; i++) {
    const monthIndex = (startMonth - 1 + i) % 12;
    const yearOffset = Math.floor((startMonth - 1 + i) / 12);
    temperature.push(round1(MONTHLY_TEMP[monthIndex]! + yearOffset * 0.15));
    precipitation.push(Math.round(MONTHLY_PRECIP[monthIndex]! + yearOffset * 4));
  }
  return { temperature, precipitation };
}

export function deriveRiskLevel(value: number, thresholds: RiskThresholds): RiskLevel {
  if (value >= thresholds.high) return 'alto';
  if (value >= thresholds.moderate) return 'moderado';
  return 'baixo';
}

/** Ajuste suave (média ponderada dos vizinhos) simulando a curva do modelo. */
function fitHistory(observed: number[], i: number): number {
  const current = observed[i]!;
  const prev = observed[i - 1] ?? current;
  const next = observed[i + 1] ?? current;
  return Math.round(0.7 * current + 0.15 * prev + 0.15 * next);
}

/** Arredonda para um teto "agradável" de eixo. */
function niceCeil(value: number): number {
  if (value <= 10) return Math.ceil(value / 2) * 2;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const step = magnitude / 2;
  return Math.ceil(value / step) * step;
}

export interface DatasetConfig {
  id: DiseaseId;
  /** Mês/ano do primeiro ponto (1-12). */
  start: { month: number; year: number };
  /** Casos observados mensais (trecho histórico). */
  observed: number[];
  /** Valores previstos para o trecho futuro. */
  forecastPredicted: number[];
  thresholds: RiskThresholds;
  /** Largura relativa da faixa de incerteza. */
  bandRatio: number;
}

export function buildDataset(config: DatasetConfig): DiseaseDataset {
  const { observed, forecastPredicted, thresholds, bandRatio } = config;
  const historyCount = observed.length;
  const forecastCount = forecastPredicted.length;
  const total = historyCount + forecastCount;
  const { temperature, precipitation } = climateSeries(config.start.month, total);

  const points: TimelinePoint[] = [];
  let maxValue = 0;
  let peakObserved = 0;

  for (let i = 0; i < total; i++) {
    const monthIndex = (config.start.month - 1 + i) % 12;
    const year = config.start.year + Math.floor((config.start.month - 1 + i) / 12);
    const label = `${MONTH_ABBR[monthIndex]}/${String(year).slice(2)}`;
    const temp = temperature[i]!;
    const precip = precipitation[i]!;

    if (i < historyCount) {
      const obs = observed[i]!;
      const predicted = fitHistory(observed, i);
      const half = Math.max(2, predicted * bandRatio * 0.5);
      const lower = Math.max(0, Math.round(predicted - half));
      const upper = Math.round(predicted + half);
      peakObserved = Math.max(peakObserved, obs);
      maxValue = Math.max(maxValue, upper, obs);
      points.push({
        index: i,
        label,
        month: monthIndex + 1,
        year,
        phase: 'history',
        observed: obs,
        predicted,
        lower,
        upper,
        temperature: temp,
        precipitation: precip,
        risk: deriveRiskLevel(predicted, thresholds),
      });
    } else {
      const j = i - historyCount;
      const predicted = forecastPredicted[j]!;
      const half = predicted * bandRatio * (0.6 + 0.28 * j);
      const lower = Math.max(0, Math.round(predicted - half));
      const upper = Math.round(predicted + half);
      maxValue = Math.max(maxValue, upper);
      points.push({
        index: i,
        label,
        month: monthIndex + 1,
        year,
        phase: 'forecast',
        observed: null,
        predicted,
        lower,
        upper,
        temperature: temp,
        precipitation: precip,
        risk: deriveRiskLevel(predicted, thresholds),
      });
    }
  }

  return {
    id: config.id,
    points,
    historyCount,
    forecastCount,
    maxValue: niceCeil(maxValue),
    peakObserved,
    thresholds,
  };
}

export interface RiskMeta {
  level: RiskLevel;
  label: string;
  color: string;
  description: string;
}

export const RISK_META: Record<RiskLevel, RiskMeta> = {
  baixo: {
    level: 'baixo',
    label: 'Risco baixo',
    color: palette.prevent,
    description: 'Cenário estável no período.',
  },
  moderado: {
    level: 'moderado',
    label: 'Risco moderado',
    color: palette.temp,
    description: 'Sinais de atenção começando a se acumular.',
  },
  alto: {
    level: 'alto',
    label: 'Risco alto',
    color: palette.risk,
    description: 'Cenário mais favorável ao aumento de casos.',
  },
};

export const RISK_ORDER: readonly RiskLevel[] = ['baixo', 'moderado', 'alto'];

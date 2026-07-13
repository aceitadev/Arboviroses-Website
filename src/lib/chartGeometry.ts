import type { DiseaseDataset } from '@/types';

/**
 * Geometria pura do gráfico de previsão (sem React). Converte um dataset e uma
 * largura em coordenadas/paths SVG. Mantida separada para ser testável.
 */

export const CHART_PAD = { top: 18, right: 16, bottom: 6, left: 42 } as const;
const MAIN_H = 200;
const GAP = 12;
const TRACK_LABEL = 14;
const TRACK_H = 44;

const mainTop = CHART_PAD.top;
const mainBottom = mainTop + MAIN_H;
const tempTitleY = mainBottom + GAP + 10;
const tempTop = mainBottom + GAP + TRACK_LABEL;
const tempBottom = tempTop + TRACK_H;
const precipTitleY = tempBottom + GAP + 10;
const precipTop = tempBottom + GAP + TRACK_LABEL;
const precipBottom = precipTop + TRACK_H;
const axisY = precipBottom + 16;

export const CHART_HEIGHT = axisY + CHART_PAD.bottom; // 382

export const CHART_LAYOUT = {
  mainTop,
  mainBottom,
  tempTitleY,
  tempTop,
  tempBottom,
  precipTitleY,
  precipTop,
  precipBottom,
  axisY,
} as const;

export interface ChartNode {
  x: number;
  obsY: number | null;
  predY: number;
  upperY: number;
  lowerY: number;
  tempY: number;
  precipTopY: number;
}

export interface ChartGeometry {
  width: number;
  height: number;
  step: number;
  boundaryX: number;
  nodes: ChartNode[];
  caseTicks: { value: number; y: number }[];
  observedPath: string;
  predictedHistoryPath: string;
  predictedForecastPath: string;
  bandPath: string;
  observedMarkers: { x: number; y: number }[];
  tempPath: string;
  tempAreaPath: string;
  tempRange: { min: number; max: number };
  precipBars: { x: number; y: number; w: number; h: number }[];
  precipMax: number;
  monthTicks: { x: number; label: string }[];
}

function niceCeil(value: number): number {
  if (value <= 10) return Math.ceil(value / 2) * 2;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const step = magnitude / 2;
  return Math.ceil(value / step) * step;
}

function line(coords: Array<{ x: number; y: number }>): string {
  return coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
}

export function buildChartGeometry(dataset: DiseaseDataset, width: number): ChartGeometry {
  const { points, maxValue, historyCount } = dataset;
  const n = points.length;

  const innerLeft = CHART_PAD.left;
  const innerRight = Math.max(innerLeft + 10, width - CHART_PAD.right);
  const step = (innerRight - innerLeft) / (n - 1);
  const xs = points.map((_, i) => innerLeft + i * step);

  const yCase = (v: number) => mainBottom - (v / maxValue) * MAIN_H;

  // Faixas de clima.
  const temps = points.map((p) => p.temperature);
  const tMinRaw = Math.min(...temps);
  const tMaxRaw = Math.max(...temps);
  const tMin = Math.floor(tMinRaw - 1);
  const tMax = Math.ceil(tMaxRaw + 1);
  const yTemp = (v: number) =>
    tempBottom - ((v - tMin) / Math.max(1, tMax - tMin)) * TRACK_H;

  const precipMax = niceCeil(Math.max(...points.map((p) => p.precipitation)));
  const yPrecip = (v: number) => precipBottom - (v / precipMax) * TRACK_H;

  const nodes: ChartNode[] = points.map((p, i) => ({
    x: xs[i]!,
    obsY: p.observed === null ? null : yCase(p.observed),
    predY: yCase(p.predicted),
    upperY: yCase(p.upper),
    lowerY: yCase(p.lower),
    tempY: yTemp(p.temperature),
    precipTopY: yPrecip(p.precipitation),
  }));

  // Ticks do eixo de casos (0, 25, 50, 75, 100%).
  const caseTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    value: Math.round(maxValue * f),
    y: yCase(maxValue * f),
  }));

  // Linha observada (apenas histórico).
  const observedCoords = points
    .slice(0, historyCount)
    .map((p, i) => ({ x: xs[i]!, y: yCase(p.observed ?? 0) }));
  const observedPath = line(observedCoords);
  const observedMarkers = observedCoords;

  // Linha prevista: histórico e futuro (futuro "cresce" a partir do histórico).
  const predictedHistoryCoords = points
    .slice(0, historyCount)
    .map((p, i) => ({ x: xs[i]!, y: yCase(p.predicted) }));
  const predictedHistoryPath = line(predictedHistoryCoords);

  const predictedForecastCoords = points
    .slice(historyCount - 1)
    .map((p, k) => ({ x: xs[historyCount - 1 + k]!, y: yCase(p.predicted) }));
  const predictedForecastPath = line(predictedForecastCoords);

  // Faixa de incerteza (área entre lower e upper).
  const upperCoords = points.map((p, i) => ({ x: xs[i]!, y: yCase(p.upper) }));
  const lowerCoords = points.map((p, i) => ({ x: xs[i]!, y: yCase(p.lower) })).reverse();
  const bandPath = `${line(upperCoords)} ${lowerCoords
    .map((c) => `L${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(' ')} Z`;

  // Trilha de temperatura.
  const tempCoords = points.map((p, i) => ({ x: xs[i]!, y: yTemp(p.temperature) }));
  const tempPath = line(tempCoords);
  const tempAreaPath = `${tempPath} L${xs[n - 1]!.toFixed(1)},${tempBottom} L${xs[0]!.toFixed(
    1,
  )},${tempBottom} Z`;

  // Trilha de precipitação (barras).
  const barW = Math.min(step * 0.5, 10);
  const precipBars = points.map((p, i) => {
    const y = yPrecip(p.precipitation);
    return { x: xs[i]! - barW / 2, y, w: barW, h: precipBottom - y };
  });

  // Rótulos de mês (menos densos em telas estreitas).
  const stride = width < 420 ? 4 : 3;
  const monthTicks = points
    .map((p, i) => ({ x: xs[i]!, label: p.label, i }))
    .filter((t) => t.i % stride === 0)
    .map(({ x, label }) => ({ x, label }));

  const boundaryX = (xs[historyCount - 1]! + xs[historyCount]!) / 2;

  return {
    width,
    height: CHART_HEIGHT,
    step,
    boundaryX,
    nodes,
    caseTicks,
    observedPath,
    predictedHistoryPath,
    predictedForecastPath,
    bandPath,
    observedMarkers,
    tempPath,
    tempAreaPath,
    tempRange: { min: tMin, max: tMax },
    precipBars,
    precipMax,
    monthTicks,
  };
}

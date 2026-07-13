/** Tipos centrais do domínio (dados demonstrativos de arboviroses). */

export type DiseaseId = 'dengue' | 'zika' | 'chikungunya';

export type RiskLevel = 'baixo' | 'moderado' | 'alto';

export type Phase = 'history' | 'forecast';

/** Um ponto mensal da série temporal (observado + previsto + clima). */
export interface TimelinePoint {
  index: number;
  /** Rótulo curto, ex.: "mar/24". */
  label: string;
  month: number; // 1-12
  year: number;
  phase: Phase;
  /** Casos observados; null no trecho de previsão (futuro sem observação). */
  observed: number | null;
  /** Valor estimado pelo modelo (ilustrativo). */
  predicted: number;
  /** Limite inferior da faixa de incerteza. */
  lower: number;
  /** Limite superior da faixa de incerteza. */
  upper: number;
  /** Temperatura média mensal (°C). */
  temperature: number;
  /** Precipitação acumulada mensal (mm). */
  precipitation: number;
  risk: RiskLevel;
}

export interface DiseaseDataset {
  id: DiseaseId;
  points: TimelinePoint[];
  historyCount: number;
  forecastCount: number;
  /** Máximo "arredondado" para escala do eixo Y. */
  maxValue: number;
  peakObserved: number;
  thresholds: RiskThresholds;
}

export interface RiskThresholds {
  moderate: number;
  high: number;
}

export interface DiseaseMeta {
  id: DiseaseId;
  name: string;
  /** Vetor (ex.: "Aedes aegypti"). */
  vector: string;
  /** Cor de destaque do dataset. */
  accent: string;
  /** Descrição curta para o seletor. */
  blurb: string;
  /** Nota sazonal ilustrativa. */
  seasonalNote: string;
}

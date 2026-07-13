import { palette } from '@/lib/palette';
import type { DiseaseDataset, DiseaseId, DiseaseMeta } from '@/types';
import { chikungunyaDataset } from '@/data/chikungunya';
import { dengueDataset } from '@/data/dengue';
import { zikaDataset } from '@/data/zika';

/** Ordem de exibição no seletor. */
export const DISEASE_IDS: readonly DiseaseId[] = ['dengue', 'zika', 'chikungunya'];

export const DISEASE_META: Record<DiseaseId, DiseaseMeta> = {
  dengue: {
    id: 'dengue',
    name: 'Dengue',
    vector: 'Aedes aegypti',
    accent: palette.risk,
    blurb: 'A arbovirose mais frequente, com picos fortes no verão e outono.',
    seasonalNote: 'Padrão sazonal marcado, sensível a calor e chuva.',
  },
  zika: {
    id: 'zika',
    name: 'Zika',
    vector: 'Aedes aegypti',
    accent: palette.science,
    blurb: 'Teve um grande pico por volta de 2016 e depois recuou bastante.',
    seasonalNote: 'Circulação baixa após o pico histórico.',
  },
  chikungunya: {
    id: 'chikungunya',
    name: 'Chikungunya',
    vector: 'Aedes aegypti',
    accent: palette.prevent,
    blurb: 'Circulação mais baixa e esporádica, com pequenas elevações sazonais.',
    seasonalNote: 'Poucos casos, mas com atenção nos meses quentes.',
  },
};

const DATASETS: Record<DiseaseId, DiseaseDataset> = {
  dengue: dengueDataset,
  zika: zikaDataset,
  chikungunya: chikungunyaDataset,
};

export function getDataset(id: DiseaseId): DiseaseDataset {
  return DATASETS[id];
}

export function getDiseaseMeta(id: DiseaseId): DiseaseMeta {
  return DISEASE_META[id];
}

export function isDiseaseId(value: string): value is DiseaseId {
  return (DISEASE_IDS as readonly string[]).includes(value);
}

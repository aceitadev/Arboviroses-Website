import { describe, expect, it } from 'vitest';
import { DISEASE_IDS, getDataset, getDiseaseMeta, isDiseaseId } from '@/data/diseases';
import { buildDataset } from '@/lib/dataset';
import { dengueConfig } from '@/data/dengue';

describe('registro de doenças', () => {
  it('expõe as três arboviroses na ordem esperada', () => {
    expect(DISEASE_IDS).toEqual(['dengue', 'zika', 'chikungunya']);
  });

  it('retorna o dataset correspondente ao id', () => {
    for (const id of DISEASE_IDS) {
      expect(getDataset(id).id).toBe(id);
    }
  });

  it('retorna metadados com o mesmo id', () => {
    for (const id of DISEASE_IDS) {
      expect(getDiseaseMeta(id).id).toBe(id);
    }
  });

  it('valida ids de doença', () => {
    expect(isDiseaseId('dengue')).toBe(true);
    expect(isDiseaseId('malaria')).toBe(false);
  });

  it('cada dataset tem 20 meses de histórico e 4 de previsão', () => {
    for (const id of DISEASE_IDS) {
      const dataset = getDataset(id);
      expect(dataset.historyCount).toBe(20);
      expect(dataset.forecastCount).toBe(4);
      expect(dataset.points).toHaveLength(24);
    }
  });

  it('os datasets são determinísticos (reconstrução idêntica)', () => {
    expect(getDataset('dengue')).toEqual(buildDataset(dengueConfig));
  });
});

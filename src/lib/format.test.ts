import { describe, expect, it } from 'vitest';
import { capitalize, formatMillimeters, formatNumber, formatTemperature } from '@/lib/format';

describe('formatNumber', () => {
  it('usa separador de milhar pt-BR', () => {
    expect(formatNumber(1580)).toBe('1.580');
  });

  it('arredonda valores fracionários', () => {
    expect(formatNumber(12.6)).toBe('13');
  });
});

describe('formatTemperature', () => {
  it('usa vírgula decimal e a unidade °C', () => {
    expect(formatTemperature(22.6)).toBe('22,6 °C');
  });
});

describe('formatMillimeters', () => {
  it('inclui a unidade mm', () => {
    expect(formatMillimeters(200)).toBe('200 mm');
  });
});

describe('capitalize', () => {
  it('capitaliza a primeira letra', () => {
    expect(capitalize('março')).toBe('Março');
  });

  it('lida com string vazia', () => {
    expect(capitalize('')).toBe('');
  });
});

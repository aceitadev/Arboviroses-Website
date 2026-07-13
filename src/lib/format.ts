/** Formatação numérica e de unidades no padrão pt-BR. */

const numberFormatter = new Intl.NumberFormat('pt-BR');

export function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export function formatTemperature(value: number): string {
  return `${value.toFixed(1).replace('.', ',')} °C`;
}

export function formatMillimeters(value: number): string {
  return `${numberFormatter.format(Math.round(value))} mm`;
}

/** Capitaliza a primeira letra (ex.: rótulos de mês). */
export function capitalize(value: string): string {
  return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
}

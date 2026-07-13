/** Cores do gráfico. Observado × Previsto têm forte separação sob daltonismo
 * (validado) e são reforçados por estilo de traço + marcadores + legenda. */
export const CHART_COLORS = {
  observed: '#12303F',
  predicted: '#1E6FB8',
  band: 'rgba(30, 111, 184, 0.14)',
  forecastZone: 'rgba(30, 111, 184, 0.05)',
  temp: '#C8901A',
  tempFill: 'rgba(228, 178, 60, 0.22)',
  rain: '#6AA0CB',
  grid: '#DDE6EF',
  axis: '#6C8194',
  boundary: '#9DB2C4',
} as const;

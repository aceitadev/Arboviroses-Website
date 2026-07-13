import type { DiseaseDataset } from '@/types';
import { getDiseaseMeta } from '@/data/diseases';
import { forecast } from '@/data/content';
import { formatMillimeters, formatNumber, formatTemperature } from '@/lib/format';

function describeTrend(dataset: DiseaseDataset): string {
  const forecastPoints = dataset.points.filter((p) => p.phase === 'forecast');
  const first = forecastPoints[0];
  const last = forecastPoints[forecastPoints.length - 1];
  if (!first || !last) return 'estabilidade';
  const ratio = last.predicted / Math.max(1, first.predicted);
  if (ratio > 1.25) return 'uma tendência de aumento';
  if (ratio < 0.8) return 'uma tendência de queda';
  return 'relativa estabilidade';
}

/** Resumo textual equivalente + tabela acessível dos dados ilustrativos. */
export function ChartSummary({ dataset }: { dataset: DiseaseDataset }) {
  const meta = getDiseaseMeta(dataset.id);
  const last = dataset.points[dataset.points.length - 1]!;

  return (
    <div className="mt-4">
      <p className="sr-only" aria-live="polite">
        {`${forecast.summaryLabel}: cenário ilustrativo de ${meta.name}. Pico observado de ${formatNumber(
          dataset.peakObserved,
        )} casos. A previsão do modelo aponta ${describeTrend(dataset)} rumo à próxima estação, terminando com risco ${last.risk}.`}
      </p>

      <details className="group rounded-2xl border border-line bg-white/50">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-sm font-medium text-ink">
          Ver tabela de dados (ilustrativos)
          <span className="text-ink-faint transition-transform group-open:rotate-180">▾</span>
        </summary>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full min-w-[34rem] border-collapse text-left text-xs">
            <caption className="sr-only">
              {forecast.tableCaptionPrefix} {meta.name} (valores ilustrativos)
            </caption>
            <thead>
              <tr className="border-b border-line text-ink-soft">
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Mês
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  {forecast.series.observed}
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  {forecast.series.predicted}
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Faixa
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Temp.
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Chuva
                </th>
                <th scope="col" className="py-2 font-semibold">
                  Risco
                </th>
              </tr>
            </thead>
            <tbody>
              {dataset.points.map((point) => (
                <tr key={point.index} className="border-b border-line/50 text-ink">
                  <th scope="row" className="py-1.5 pr-3 font-medium">
                    {point.label}
                  </th>
                  <td className="py-1.5 pr-3">
                    {point.observed === null ? '—' : formatNumber(point.observed)}
                  </td>
                  <td className="py-1.5 pr-3">{formatNumber(point.predicted)}</td>
                  <td className="py-1.5 pr-3 text-ink-soft">
                    {formatNumber(point.lower)}–{formatNumber(point.upper)}
                  </td>
                  <td className="py-1.5 pr-3">{formatTemperature(point.temperature)}</td>
                  <td className="py-1.5 pr-3">{formatMillimeters(point.precipitation)}</td>
                  <td className="py-1.5 capitalize">{point.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

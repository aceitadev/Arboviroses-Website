import { CHART_COLORS } from '@/lib/chartColors';
import { forecast } from '@/data/content';

/** Legenda do gráfico (sempre presente — identidade nunca só por cor). */
export function ChartLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft">
      <li className="flex items-center gap-1.5">
        <svg width="22" height="10" aria-hidden="true">
          <line x1="1" y1="5" x2="21" y2="5" stroke={CHART_COLORS.observed} strokeWidth="2" />
          <circle cx="11" cy="5" r="2.5" fill={CHART_COLORS.observed} />
        </svg>
        {forecast.series.observed}
      </li>
      <li className="flex items-center gap-1.5">
        <svg width="22" height="10" aria-hidden="true">
          <line
            x1="1"
            y1="5"
            x2="21"
            y2="5"
            stroke={CHART_COLORS.predicted}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </svg>
        {forecast.series.predicted}
      </li>
      <li className="flex items-center gap-1.5">
        <span
          className="inline-block h-3 w-5 rounded-sm"
          style={{ backgroundColor: CHART_COLORS.band }}
          aria-hidden="true"
        />
        {forecast.series.band}
      </li>
    </ul>
  );
}

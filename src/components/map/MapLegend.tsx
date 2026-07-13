import { map } from '@/data/content';

export function MapLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft">
      <li className="flex items-center gap-1.5">
        <span
          className="inline-block h-3 w-4 rounded-sm border border-science/30"
          style={{ backgroundColor: 'rgba(30,111,184,0.16)' }}
          aria-hidden="true"
        />
        {map.focusLabel}
      </li>
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-full bg-science" aria-hidden="true" />
        {map.card.place}
      </li>
      <li className="flex items-center gap-1.5">
        <span
          className="inline-block h-3 w-4 rounded-sm"
          style={{ backgroundColor: 'rgba(220,78,42,0.18)', border: '1px solid rgba(220,78,42,0.5)' }}
          aria-hidden="true"
        />
        Área de risco ilustrativa
      </li>
    </ul>
  );
}

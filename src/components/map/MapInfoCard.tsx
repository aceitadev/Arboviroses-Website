'use client';

import { CloudRain, Thermometer, TrendingUp, X } from 'lucide-react';
import { map } from '@/data/content';
import { CANASVIEIRAS_METRICS } from '@/data/mapData';
import { Badge } from '@/components/ui/Badge';

export function MapInfoCard({ id, onClose }: { id: string; onClose: () => void }) {
  return (
    <div
      id={id}
      role="dialog"
      aria-label={`${map.card.place} — ${map.card.subtitle}`}
      className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-line bg-white/95 p-4 shadow-xl shadow-ink/10 backdrop-blur sm:inset-x-auto sm:right-3 sm:w-64"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{map.card.place}</h3>
          <p className="text-sm text-ink-soft">{map.card.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-bg-deep"
        >
          <X aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
      </div>

      <div className="mt-3">
        <Badge>{map.card.tag}</Badge>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="flex items-center gap-2 text-ink-soft">
            <Thermometer aria-hidden="true" className="h-4 w-4 text-temp" />
            Temperatura
          </dt>
          <dd className="font-medium text-ink">{CANASVIEIRAS_METRICS.temperature}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="flex items-center gap-2 text-ink-soft">
            <CloudRain aria-hidden="true" className="h-4 w-4 text-rain" />
            Chuva
          </dt>
          <dd className="font-medium text-ink">{CANASVIEIRAS_METRICS.precipitation}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="flex items-center gap-2 text-ink-soft">
            <TrendingUp aria-hidden="true" className="h-4 w-4 text-risk" />
            Tendência
          </dt>
          <dd className="font-medium text-ink">{CANASVIEIRAS_METRICS.trend}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-ink-faint">{map.card.note}</p>
    </div>
  );
}

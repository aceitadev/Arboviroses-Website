'use client';

import { useId, useState } from 'react';
import { map } from '@/data/content';
import {
  BRIDGES,
  CANASVIEIRAS_MARKER,
  ISLAND_PATH,
  LAGOA,
  MAINLAND_PATH,
  MAP_VIEWBOX,
  NORTE_REGION_PATH,
  RISK_ZONE,
} from '@/data/mapData';
import { MapInfoCard } from '@/components/map/MapInfoCard';

const VIEW_W = 120;
const VIEW_H = 170;

export function FloripaMap() {
  const [open, setOpen] = useState(false);
  const clipId = useId();
  const cardId = useId();

  const markerLeft = `${(CANASVIEIRAS_MARKER.x / VIEW_W) * 100}%`;
  const markerTop = `${(CANASVIEIRAS_MARKER.y / VIEW_H) * 100}%`;
  const norteLeft = `${(50 / VIEW_W) * 100}%`;
  const norteTop = `${(34 / VIEW_H) * 100}%`;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg
        viewBox={MAP_VIEWBOX}
        className="h-auto w-full"
        role="img"
        aria-label={map.sceneAlt}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={ISLAND_PATH} />
          </clipPath>
        </defs>

        {/* Continente (contexto) e pontes. */}
        <path d={MAINLAND_PATH} fill="#EEF3F8" stroke="#DCE7F0" strokeWidth="0.8" />
        {BRIDGES.map((bridge, i) => (
          <line
            key={i}
            x1={bridge.x1}
            y1={bridge.y1}
            x2={bridge.x2}
            y2={bridge.y2}
            stroke="#C4D4E2"
            strokeWidth="1.2"
          />
        ))}

        {/* Ilha. */}
        <path d={ISLAND_PATH} fill="#E4EDF6" stroke="#B4C8DB" strokeWidth="1.2" strokeLinejoin="round" />

        {/* Elementos recortados contra a ilha. */}
        <g clipPath={`url(#${clipId})`}>
          <path d={NORTE_REGION_PATH} fill="rgba(30,111,184,0.16)" />
          <ellipse
            cx={RISK_ZONE.cx}
            cy={RISK_ZONE.cy}
            rx={RISK_ZONE.rx}
            ry={RISK_ZONE.ry}
            fill="rgba(220,78,42,0.18)"
            stroke="rgba(220,78,42,0.45)"
            strokeWidth="0.8"
          />
        </g>

        {/* Lagoa da Conceição (referência). */}
        <ellipse cx={LAGOA.cx} cy={LAGOA.cy} rx={LAGOA.rx} ry={LAGOA.ry} fill="#CFE0EE" />
      </svg>

      {/* Rótulo do Norte da Ilha. */}
      <span
        aria-hidden="true"
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-science-deep"
        style={{ left: norteLeft, top: norteTop }}
      >
        {map.focusLabel}
      </span>

      {/* Marcador de Canasvieiras (botão HTML sobreposto — alvo de toque grande). */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={cardId}
        className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-science"
        style={{ left: markerLeft, top: markerTop }}
      >
        <span className="absolute h-5 w-5 rounded-full bg-science/25 motion-safe:animate-ping" />
        <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-science shadow" />
        <span className="sr-only">
          {map.card.place} — {map.card.tag}. {map.markerApproxNote}
        </span>
      </button>

      {open && <MapInfoCard id={cardId} onClose={() => setOpen(false)} />}
    </div>
  );
}

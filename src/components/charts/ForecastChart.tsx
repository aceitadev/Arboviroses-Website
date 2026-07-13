'use client';

import { useMemo, useState } from 'react';
import type { DiseaseDataset } from '@/types';
import { getDiseaseMeta } from '@/data/diseases';
import { forecast } from '@/data/content';
import { buildChartGeometry, CHART_HEIGHT, CHART_LAYOUT, CHART_PAD } from '@/lib/chartGeometry';
import { CHART_COLORS } from '@/lib/chartColors';
import { formatMillimeters, formatNumber, formatTemperature } from '@/lib/format';
import { RISK_META } from '@/lib/dataset';
import { useElementWidth } from '@/hooks/useElementSize';

interface ForecastChartProps {
  dataset: DiseaseDataset;
  /** Quando verdadeiro, a linha de previsão é revelada (crescendo do histórico). */
  reveal: boolean;
  reduced: boolean;
}

export function ForecastChart({ dataset, reveal, reduced }: ForecastChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const geometry = useMemo(
    () => (width > 0 ? buildChartGeometry(dataset, width) : null),
    [dataset, width],
  );

  const meta = getDiseaseMeta(dataset.id);
  const drawn = reveal;

  const ariaSummary = useMemo(() => {
    const last = dataset.points[dataset.points.length - 1]!;
    return `Gráfico ilustrativo de ${meta.name}: pico observado de ${formatNumber(
      dataset.peakObserved,
    )} casos no período histórico e previsão do modelo terminando em cerca de ${formatNumber(
      last.predicted,
    )} casos, com risco ${last.risk}.`;
  }, [dataset, meta.name]);

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!geometry || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) * geometry.width) / rect.width;
    const index = Math.round((localX - CHART_PAD.left) / geometry.step);
    setActive(Math.max(0, Math.min(dataset.points.length - 1, index)));
  };

  const handleKey = (event: React.KeyboardEvent) => {
    const n = dataset.points.length;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      setActive((prev) => {
        const base = prev ?? (event.key === 'ArrowRight' ? -1 : n);
        return Math.max(0, Math.min(n - 1, base + (event.key === 'ArrowRight' ? 1 : -1)));
      });
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(n - 1);
    } else if (event.key === 'Escape') {
      setActive(null);
    }
  };

  const activePoint = active === null ? null : dataset.points[active]!;
  const activeNode = active === null || !geometry ? null : geometry.nodes[active]!;

  return (
    <div className="relative">
      <div
        ref={ref}
        role="img"
        tabIndex={0}
        aria-label={ariaSummary}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        onPointerLeave={() => setActive(null)}
        onKeyDown={handleKey}
        className="touch-pan-y rounded-2xl border border-line bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-science"
        style={{ minHeight: CHART_HEIGHT }}
      >
        {geometry && (
          <svg
            width={geometry.width}
            height={CHART_HEIGHT}
            viewBox={`0 0 ${geometry.width} ${CHART_HEIGHT}`}
            className="block"
          >
            <defs>
              <clipPath id={`forecast-reveal-${dataset.id}`}>
                <rect
                  x={geometry.boundaryX}
                  y={CHART_LAYOUT.mainTop - 4}
                  width={geometry.width - geometry.boundaryX}
                  height={CHART_LAYOUT.precipBottom - CHART_LAYOUT.mainTop + 8}
                  style={{
                    transformBox: 'view-box',
                    transformOrigin: `${geometry.boundaryX}px 0px`,
                    transform: `scaleX(${drawn ? 1 : 0})`,
                    transition: reduced ? 'none' : 'transform 1.05s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
              </clipPath>
            </defs>

            {/* Zona de previsão (fundo sutil). */}
            <rect
              x={geometry.boundaryX}
              y={CHART_LAYOUT.mainTop - 4}
              width={geometry.width - geometry.boundaryX - CHART_PAD.right}
              height={CHART_LAYOUT.precipBottom - CHART_LAYOUT.mainTop + 8}
              fill={CHART_COLORS.forecastZone}
            />

            {/* Grade e ticks do eixo de casos. */}
            {geometry.caseTicks.map((tick) => (
              <g key={tick.value}>
                <line
                  x1={CHART_PAD.left}
                  y1={tick.y}
                  x2={geometry.width - CHART_PAD.right}
                  y2={tick.y}
                  stroke={CHART_COLORS.grid}
                  strokeWidth="1"
                />
                <text x={CHART_PAD.left - 6} y={tick.y + 3} textAnchor="end" fontSize="9" fill={CHART_COLORS.axis}>
                  {formatNumber(tick.value)}
                </text>
              </g>
            ))}

            {/* Faixa de incerteza. */}
            <path d={geometry.bandPath} fill={CHART_COLORS.band} stroke="none" />

            {/* Linha prevista — histórico (sólida). */}
            <path
              d={geometry.predictedHistoryPath}
              fill="none"
              stroke={CHART_COLORS.predicted}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Linha prevista — futuro (tracejada, revelada por clip). */}
            <path
              d={geometry.predictedForecastPath}
              fill="none"
              stroke={CHART_COLORS.predicted}
              strokeWidth="2.5"
              strokeDasharray="5 4"
              strokeLinecap="round"
              clipPath={`url(#forecast-reveal-${dataset.id})`}
            />

            {/* Linha observada (sólida, com marcadores). */}
            <path
              d={geometry.observedPath}
              fill="none"
              stroke={CHART_COLORS.observed}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {geometry.observedMarkers.map((m, i) => (
              <circle key={i} cx={m.x} cy={m.y} r="2.4" fill={CHART_COLORS.observed} />
            ))}

            {/* Divisor "início da previsão". */}
            <line
              x1={geometry.boundaryX}
              y1={CHART_LAYOUT.mainTop - 4}
              x2={geometry.boundaryX}
              y2={CHART_LAYOUT.mainBottom}
              stroke={CHART_COLORS.boundary}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={geometry.boundaryX + 4}
              y={CHART_LAYOUT.mainTop + 6}
              fontSize="9"
              fill={CHART_COLORS.axis}
            >
              previsão →
            </text>

            {/* Trilha de temperatura. */}
            <text x={CHART_PAD.left} y={CHART_LAYOUT.tempTitleY} fontSize="9" fill={CHART_COLORS.axis}>
              Temperatura (°C)
            </text>
            <path d={geometry.tempAreaPath} fill={CHART_COLORS.tempFill} stroke="none" />
            <path
              d={geometry.tempPath}
              fill="none"
              stroke={CHART_COLORS.temp}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Trilha de precipitação. */}
            <text
              x={CHART_PAD.left}
              y={CHART_LAYOUT.precipTitleY}
              fontSize="9"
              fill={CHART_COLORS.axis}
            >
              Chuva (mm)
            </text>
            {geometry.precipBars.map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={bar.y}
                width={bar.w}
                height={bar.h}
                rx="1.5"
                fill={CHART_COLORS.rain}
              />
            ))}

            {/* Rótulos de mês. */}
            {geometry.monthTicks.map((tick) => (
              <text
                key={tick.label}
                x={tick.x}
                y={CHART_LAYOUT.axisY}
                textAnchor="middle"
                fontSize="9"
                fill={CHART_COLORS.axis}
              >
                {tick.label}
              </text>
            ))}

            {/* Crosshair + destaque do ponto ativo. */}
            {activeNode && (
              <g>
                <line
                  x1={activeNode.x}
                  y1={CHART_LAYOUT.mainTop - 4}
                  x2={activeNode.x}
                  y2={CHART_LAYOUT.precipBottom}
                  stroke={CHART_COLORS.boundary}
                  strokeWidth="1"
                />
                {activeNode.obsY !== null && (
                  <circle cx={activeNode.x} cy={activeNode.obsY} r="4" fill={CHART_COLORS.observed} stroke="#fff" strokeWidth="1.5" />
                )}
                <circle cx={activeNode.x} cy={activeNode.predY} r="4" fill={CHART_COLORS.predicted} stroke="#fff" strokeWidth="1.5" />
              </g>
            )}
          </svg>
        )}
      </div>

      {activePoint && activeNode && geometry && (
        <div
          className="pointer-events-none absolute top-2 z-10 w-44 -translate-x-1/2 rounded-xl border border-line bg-white/95 p-3 text-xs shadow-lg shadow-ink/10 backdrop-blur"
          style={{
            left: Math.max(90, Math.min(geometry.width - 90, activeNode.x)),
          }}
        >
          <p className="font-display text-sm font-semibold text-ink">{activePoint.label}</p>
          <dl className="mt-1.5 space-y-1 text-ink-soft">
            <div className="flex justify-between gap-2">
              <dt>{forecast.series.observed}</dt>
              <dd className="font-medium text-ink">
                {activePoint.observed === null ? '—' : formatNumber(activePoint.observed)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>{forecast.series.predicted}</dt>
              <dd className="font-medium text-science-deep">{formatNumber(activePoint.predicted)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Incerteza</dt>
              <dd>
                {formatNumber(activePoint.lower)}–{formatNumber(activePoint.upper)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Temp. / Chuva</dt>
              <dd>
                {formatTemperature(activePoint.temperature)} · {formatMillimeters(activePoint.precipitation)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <dt>Risco</dt>
              <dd className="flex items-center gap-1 font-medium text-ink">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: RISK_META[activePoint.risk].color }}
                />
                {activePoint.risk}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {activePoint
          ? `${activePoint.label}: observado ${
              activePoint.observed === null ? 'sem dado' : formatNumber(activePoint.observed)
            }, previsto ${formatNumber(activePoint.predicted)}, risco ${activePoint.risk}.`
          : ''}
      </div>
    </div>
  );
}

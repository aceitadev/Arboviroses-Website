'use client';

import { useState } from 'react';
import { Cpu } from 'lucide-react';
import type { DiseaseId } from '@/types';
import { getDataset } from '@/data/diseases';
import { forecast, ILLUSTRATIVE_LABEL } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { SectionShell } from '@/components/sections/SectionShell';
import { DiseaseToggle } from '@/components/charts/DiseaseToggle';
import { ChartLegend } from '@/components/charts/ChartLegend';
import { ForecastChart } from '@/components/charts/ForecastChart';
import { ChartSummary } from '@/components/charts/ChartSummary';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function S6Forecast() {
  const [disease, setDisease] = useState<DiseaseId>('dengue');
  const dataset = getDataset(disease);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.15 });

  return (
    <SectionShell id="previsao" labelledBy="previsao-title" fullHeight={false}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{forecast.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="previsao-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {forecast.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
            {forecast.body}
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DiseaseToggle value={disease} onChange={setDisease} label={forecast.selectLabel} />
          <Badge>{ILLUSTRATIVE_LABEL}</Badge>
        </div>

        <div className="mt-5 rounded-3xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur-md">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-4">
            <ChartLegend />
            <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-science">
              <Cpu className="h-3.5 w-3.5" />
              SÉRIE TEMPORAL 52 SEMANAS • INTERV. CONFIANÇA 95%
            </span>
          </div>

          <div className="mt-2">
            <ForecastChart dataset={dataset} reveal={inView} reduced={reduced} />
          </div>

          <div className="mt-6">
            <ChartSummary dataset={dataset} />
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-2xl border border-science/25 bg-science/5 p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-science-deep">
              Propósito Operacional do Algoritmo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">
              {forecast.purpose}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Disclaimer>{forecast.disclaimer}</Disclaimer>
        </div>
      </div>
    </SectionShell>
  );
}

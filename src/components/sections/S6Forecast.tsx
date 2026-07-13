'use client';

import { useState } from 'react';
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
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.2 });

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

      <div ref={ref} className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DiseaseToggle value={disease} onChange={setDisease} label={forecast.selectLabel} />
          <Badge>{ILLUSTRATIVE_LABEL}</Badge>
        </div>

        <div className="mt-4">
          <ChartLegend />
        </div>

        <div className="mt-3">
          <ForecastChart dataset={dataset} reveal={inView} reduced={reduced} />
        </div>

        <ChartSummary dataset={dataset} />

        <div className="mt-6 grid gap-3">
          <Disclaimer>{forecast.disclaimer}</Disclaimer>
          <p className="max-w-prose rounded-2xl border border-science/20 bg-science/5 px-4 py-3 text-sm leading-relaxed text-ink sm:text-base">
            {forecast.purpose}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

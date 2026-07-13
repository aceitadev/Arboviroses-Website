import { Activity, CloudRain, Thermometer } from 'lucide-react';
import { problem } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

const FACTOR_ICONS = {
  chuva: CloudRain,
  temperatura: Thermometer,
  casos: Activity,
} as const;

const FACTOR_COLORS = {
  chuva: 'text-rain',
  temperatura: 'text-temp',
  casos: 'text-science',
} as const;

export function S2Problem() {
  return (
    <SectionShell id="problema" labelledBy="problema-title" sceneAlt={problem.sceneAlt}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{problem.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="problema-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {problem.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
            {problem.body}
          </p>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-3">
        {problem.factors.map((factor, index) => {
          const Icon = FACTOR_ICONS[factor.key as keyof typeof FACTOR_ICONS];
          const color = FACTOR_COLORS[factor.key as keyof typeof FACTOR_COLORS];
          return (
            <Reveal as="li" key={factor.key} delay={index * 90}>
              <div className="h-full rounded-2xl border border-line bg-white/60 p-5">
                <Icon aria-hidden="true" className={`h-6 w-6 ${color}`} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{factor.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{factor.caption}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </SectionShell>
  );
}

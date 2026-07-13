import { GitBranch, Layers, LineChart } from 'lucide-react';
import { idea } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

const PILLAR_ICONS = [LineChart, GitBranch, Layers];

export function S3Idea() {
  return (
    <SectionShell id="ideia" labelledBy="ideia-title" sceneAlt={idea.sceneAlt}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{idea.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="ideia-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {idea.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
            {idea.body}
          </p>
        </Reveal>
      </div>

      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {idea.pillars.map((pillar, index) => {
          const Icon = PILLAR_ICONS[index] ?? Layers;
          return (
            <Reveal key={pillar.label} delay={index * 90}>
              <div className="flex h-full gap-3 rounded-2xl border border-line bg-white/60 p-5">
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-science" />
                <div>
                  <dt className="font-display text-base font-semibold text-ink">{pillar.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{pillar.caption}</dd>
                </div>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </SectionShell>
  );
}

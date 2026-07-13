import { GitBranch, Layers, LineChart, Cpu } from 'lucide-react';
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

      {/* Diagramação editorial em fluxo contínuo de convergência analítica */}
      <div className="mt-12">
        <div className="grid gap-5 md:grid-cols-3">
          {idea.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Layers;
            return (
              <Reveal key={pillar.label} delay={index * 90}>
                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-line bg-white/75 p-6 shadow-sm backdrop-blur-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-science/10 text-science">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-bg-deep px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-science-deep">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{pillar.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.caption}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-line/60 pt-4 text-xs font-medium text-ink-faint">
                    <Cpu aria-hidden="true" className="h-3.5 w-3.5 text-science" />
                    <span>Camada preditiva ativa</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

import { Activity, CloudRain, Thermometer, ArrowRight } from 'lucide-react';
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
  chuva: {
    icon: 'text-rain',
    border: 'border-rain/30 hover:border-rain/60',
    bgBadge: 'bg-rain/10 text-rain',
  },
  temperatura: {
    icon: 'text-temp',
    border: 'border-temp/30 hover:border-temp/60',
    bgBadge: 'bg-temp/10 text-temp',
  },
  casos: {
    icon: 'text-science',
    border: 'border-science/30 hover:border-science/60',
    bgBadge: 'bg-science/10 text-science',
  },
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

      {/* Sistema conectado de variáveis climáticas e epidemiológicas */}
      <div className="mt-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {problem.factors.map((factor, index) => {
            const key = factor.key as keyof typeof FACTOR_ICONS;
            const Icon = FACTOR_ICONS[key];
            const theme = FACTOR_COLORS[key];

            return (
              <Reveal key={factor.key} delay={index * 90}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  {/* Canto superior com rótulo técnico */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.bgBadge}`}>
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block font-display text-xs font-semibold uppercase tracking-wider text-ink-faint">
                          Variável 0{index + 1}
                        </span>
                        <h3 className="font-display text-lg font-bold text-ink">{factor.label}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="inline-block rounded-md bg-bg-deep px-2.5 py-1 font-mono text-xs font-medium text-ink-soft">
                      {factor.metric}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{factor.caption}</p>
                  </div>

                  {/* Linha indicadora inferior */}
                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-semibold text-science">
                    <span>Vetor de transmissão</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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

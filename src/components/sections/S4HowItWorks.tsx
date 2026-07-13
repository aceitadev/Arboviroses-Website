import { CheckCircle2, Database, GaugeCircle, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { howItWorks } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

const STEP_ICONS = [Database, SlidersHorizontal, GaugeCircle, CheckCircle2];

export function S4HowItWorks() {
  return (
    <SectionShell id="como-funciona" labelledBy="como-funciona-title" sceneAlt={howItWorks.sceneAlt}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="como-funciona-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {howItWorks.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
            {howItWorks.intro}
          </p>
        </Reveal>
      </div>

      {/* Pipeline contínuo de processamento ML */}
      <ol className="mt-12 grid gap-5 md:grid-cols-4">
        {howItWorks.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Database;
          const isLast = index === howItWorks.steps.length - 1;

          return (
            <Reveal as="li" key={step.number} delay={index * 90}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-line bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-science/50">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-science">
                      Etapa {step.number}
                    </span>
                    <span className="rounded bg-science/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-science">
                      {step.badge}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-deep text-ink">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5 text-science" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.caption}</p>
                </div>

                <div className="mt-5 border-t border-line/60 pt-3">
                  <p className="text-xs leading-relaxed text-ink-faint">{step.detail}</p>
                </div>

                {!isLast && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-white p-1 text-science md:block">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </SectionShell>
  );
}

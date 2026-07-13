import { CheckCircle2, Database, GaugeCircle, SlidersHorizontal } from 'lucide-react';
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

      {/* Sequência vertical no mobile; quatro etapas conectadas no desktop. */}
      <ol className="mt-12 grid gap-4 md:grid-cols-4">
        {howItWorks.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Database;
          return (
            <Reveal as="li" key={step.number} delay={index * 90}>
              <div className="relative flex h-full flex-col rounded-2xl border border-line bg-white/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-science">
                    {step.number}
                  </span>
                  <Icon aria-hidden="true" className="h-5 w-5 text-science" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.caption}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">{step.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </SectionShell>
  );
}

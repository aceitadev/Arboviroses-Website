import { ArrowUp } from 'lucide-react';
import { closing } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/sections/SectionShell';

export function S10Closing() {
  return (
    <SectionShell
      id="encerramento"
      labelledBy="encerramento-title"
      sceneAlt={closing.sceneAlt}
      innerClassName="items-center text-center justify-center"
    >
      <div className="max-w-3xl">
        <Reveal>
          <span className="inline-block rounded-full border border-line bg-white/80 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-science">
            Conclusão do Projeto
          </span>
          <h2
            id="encerramento-title"
            className="mt-6 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {closing.title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-xl">
            {closing.subtitle}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button toId="abertura" variant="outline">
              <ArrowUp aria-hidden="true" className="h-4 w-4" />
              <span>{closing.backToTop}</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

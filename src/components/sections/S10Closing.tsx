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
      innerClassName="items-center text-center"
    >
      <div className="max-w-3xl">
        <Reveal>
          <h2
            id="encerramento-title"
            className="text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {closing.title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {closing.subtitle}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 flex justify-center">
            <Button toId="abertura" variant="outline">
              <ArrowUp aria-hidden="true" className="h-4 w-4" />
              {closing.backToTop}
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

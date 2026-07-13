import { opening } from '@/data/content';
import { Badge } from '@/components/ui/Badge';
import { ScrollHint } from '@/components/ui/ScrollHint';
import { SectionShell } from '@/components/sections/SectionShell';

export function S1Opening() {
  return (
    <SectionShell
      id="abertura"
      labelledBy="abertura-title"
      sceneAlt={opening.sceneAlt}
      scrim={false}
      innerClassName="items-start"
    >
      <div className="max-w-2xl">
        <Badge>Projeto de pesquisa</Badge>
        <h1
          id="abertura-title"
          className="mt-6 text-[clamp(3.25rem,15vw,7rem)] font-bold leading-[0.92] text-ink"
        >
          {opening.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {opening.subtitle}
        </p>
        <p className="mt-8 text-sm font-medium uppercase tracking-wide text-ink-faint">
          {opening.meta}
        </p>
      </div>

      <div className="mt-16 flex justify-center sm:absolute sm:inset-x-0 sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:mt-0">
        <ScrollHint />
      </div>
    </SectionShell>
  );
}

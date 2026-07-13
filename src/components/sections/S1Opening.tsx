import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { opening, site } from '@/data/content';
import { Badge } from '@/components/ui/Badge';
import { ScrollHint } from '@/components/ui/ScrollHint';
import { SectionShell } from '@/components/sections/SectionShell';
import { Button } from '@/components/ui/Button';

export function S1Opening() {
  return (
    <SectionShell
      id="abertura"
      labelledBy="abertura-title"
      sceneAlt={opening.sceneAlt}
      scrim={false}
      innerClassName="items-start justify-center"
    >
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge>
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-prevent animate-pulse" />
            Projeto de Pesquisa Científica
          </Badge>
          <span className="rounded-full border border-line/80 bg-white/70 px-3 py-1 font-display text-xs font-semibold tracking-wide text-ink-soft backdrop-blur-sm">
            {site.productName}
          </span>
        </div>

        <h1
          id="abertura-title"
          className="mt-6 text-[clamp(3.5rem,15vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-ink"
        >
          {opening.title}
        </h1>

        <p className="mt-4 font-display text-lg font-medium text-science sm:text-2xl">
          {opening.tagline}
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-xl">
          {opening.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button toId="previsao" variant="primary">
            <span>{opening.ctaPrimary}</span>
            <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
          <span>{opening.meta}</span>
        </div>
      </div>

      <div className="mt-16 flex justify-center sm:absolute sm:inset-x-0 sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:mt-0">
        <ScrollHint />
      </div>
    </SectionShell>
  );
}

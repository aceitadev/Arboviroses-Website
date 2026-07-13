import { Dot } from 'lucide-react';
import { limitations } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

export function S8Limitations() {
  return (
    <SectionShell id="limitacoes" labelledBy="limitacoes-title" fullHeight={false}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{limitations.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="limitacoes-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {limitations.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            {limitations.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-8 max-w-2xl space-y-3">
        {limitations.points.map((point, index) => (
          <Reveal as="li" key={point} delay={index * 70}>
            <div className="flex items-start gap-2 rounded-xl border border-line bg-white/50 px-4 py-3">
              <Dot aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-science" />
              <span className="text-sm leading-relaxed text-ink sm:text-base">{point}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}

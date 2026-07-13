import { Megaphone, ShieldCheck, TrendingUp } from 'lucide-react';
import { delivers } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { SectionShell } from '@/components/sections/SectionShell';

const ITEM_ICONS = [TrendingUp, ShieldCheck, Megaphone];

export function S7Delivers() {
  return (
    <SectionShell id="entrega" labelledBy="entrega-title" sceneAlt={delivers.sceneAlt}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{delivers.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="entrega-title"
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {delivers.title}
          </h2>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-3">
        {delivers.items.map((item, index) => {
          const Icon = ITEM_ICONS[index] ?? TrendingUp;
          return (
            <Reveal as="li" key={item.title} delay={index * 90}>
              <div className="h-full rounded-2xl border border-line bg-white/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-science/10">
                  <Icon aria-hidden="true" className="h-5 w-5 text-science" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.caption}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={120} className="mt-8 max-w-prose">
        <Disclaimer>{delivers.note}</Disclaimer>
      </Reveal>
    </SectionShell>
  );
}

import { Megaphone, ShieldCheck, TrendingUp, CheckCircle } from 'lucide-react';
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

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {delivers.items.map((item, index) => {
          const Icon = ITEM_ICONS[index] ?? TrendingUp;
          return (
            <Reveal key={item.title} delay={index * 90}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-science/60 hover:shadow-md">
                {/* Detalhe de canto superior */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-science/10 text-science">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                    0{index + 1} / METRICA
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.caption}</p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-line/60 pt-4 text-xs font-semibold text-prevent">
                  <CheckCircle className="h-4 w-4" />
                  <span>Aporte preventivo acionável</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120} className="mt-10 max-w-2xl">
        <Disclaimer>{delivers.note}</Disclaimer>
      </Reveal>
    </SectionShell>
  );
}

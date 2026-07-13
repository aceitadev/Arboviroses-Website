import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { limitations } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

export function S8Limitations() {
  return (
    <SectionShell id="limitacoes" labelledBy="limitacoes-title" fullHeight={false}>
      <div className="max-w-3xl">
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

      <Reveal delay={160}>
        <div className="mt-10 max-w-3xl overflow-hidden rounded-3xl border border-line bg-white/80 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2.5 border-b border-line bg-bg-deep/60 px-6 py-4">
            <ShieldAlert className="h-5 w-5 text-risk" />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-ink">
              ESPECIFICAÇÃO DE CAUTELA TÉCNICA & VALIDAÇÃO
            </span>
          </div>

          <ul className="divide-y divide-line/60">
            {limitations.points.map((point, index) => (
              <li key={index} className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-risk/10 font-mono text-xs font-bold text-risk">
                  0{index + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink sm:text-base">{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 bg-bg/70 px-6 py-3.5 text-xs text-ink-faint">
            <AlertTriangle className="h-4 w-4 shrink-0 text-temp" />
            <span>
              A interpretação das projeções deve ser complementada pela vigilância epidemiológica local em tempo real.
            </span>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

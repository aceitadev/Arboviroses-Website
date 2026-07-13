import { MapPin, Navigation } from 'lucide-react';
import { map } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { SectionShell } from '@/components/sections/SectionShell';
import { FloripaMap } from '@/components/map/FloripaMap';
import { MapLegend } from '@/components/map/MapLegend';

export function S5Map() {
  return (
    <SectionShell id="mapa" labelledBy="mapa-title" sceneAlt={map.sceneAlt} fullHeight={false}>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{map.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="mapa-title"
              className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
            >
              {map.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
              {map.body}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 rounded-2xl border border-line bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2.5 text-science">
                <MapPin aria-hidden="true" className="h-4.5 w-4.5" />
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  Validação Territorial
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Pressione o marcador georreferenciado em Canasvieiras no mapa interativo para consultar variáveis locais simuladas de temperatura, chuva e tendência epidemiológica.
              </p>
              <div className="mt-4">
                <MapLegend />
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-6 max-w-prose">
            <Disclaimer>{map.disclaimer}</Disclaimer>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-2 text-xs text-ink-faint">{map.markerApproxNote}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <div className="relative rounded-3xl border border-line bg-white/60 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between border-b border-line/60 pb-3">
                <span className="flex items-center gap-2 font-mono text-xs font-semibold text-ink-soft">
                  <Navigation className="h-3.5 w-3.5 text-science" />
                  GEO-VIEWPORT • NORTE DA ILHA (SC)
                </span>
                <span className="rounded bg-science/10 px-2 py-0.5 font-mono text-[10px] font-bold text-science">
                  INTERATIVO
                </span>
              </div>
              <FloripaMap />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}

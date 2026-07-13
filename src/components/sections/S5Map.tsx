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
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="max-w-xl">
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
          <Reveal delay={160} className="mt-6">
            <MapLegend />
          </Reveal>
          <Reveal delay={200} className="mt-4 max-w-prose">
            <Disclaimer>{map.disclaimer}</Disclaimer>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-2 text-xs text-ink-faint">{map.markerApproxNote}</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <FloripaMap />
        </Reveal>
      </div>
    </SectionShell>
  );
}

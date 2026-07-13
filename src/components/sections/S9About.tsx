import { BookOpen, GraduationCap, MapPin, Users } from 'lucide-react';
import { about } from '@/data/content';
import { advisor, institution, teamMembers } from '@/data/team';
import { references } from '@/data/references';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';

export function S9About() {
  return (
    <SectionShell id="sobre" labelledBy="sobre-title" fullHeight={false}>
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id="sobre-title"
            className="mt-4 text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl"
          >
            {about.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-white/60 p-6">
            <div className="flex items-center gap-2 text-science">
              <Users aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                {about.teamLabel}
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {teamMembers.map((member) => (
                <li key={member} className="text-base text-ink">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={60}>
            <div className="rounded-2xl border border-line bg-white/60 p-6">
              <div className="flex items-center gap-2 text-science">
                <GraduationCap aria-hidden="true" className="h-5 w-5" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                  {about.advisorLabel}
                </h3>
              </div>
              <p className="mt-3 text-base text-ink">{advisor}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white/60 p-6">
              <div className="flex items-center gap-2 text-science">
                <MapPin aria-hidden="true" className="h-5 w-5" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                  {about.institutionLabel}
                </h3>
              </div>
              <p className="mt-3 text-base text-ink">
                {institution.name} • {institution.group}
              </p>
              <p className="text-sm text-ink-soft">
                {institution.city} • {institution.year}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={60} className="mt-4">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="flex items-center gap-2 text-science">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              {about.referencesLabel}
            </h3>
          </div>
          <p className="mt-2 text-sm text-ink-faint">{about.referencesNote}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {references.map((reference) => (
              <li
                key={reference.source}
                className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-ink"
                title={reference.detail}
              >
                {reference.source}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}

import { BookOpen, GraduationCap, MapPin, Users, Code2, ExternalLink, GitPullRequest } from 'lucide-react';
import { about, site } from '@/data/content';
import { advisor, institution, teamMembers } from '@/data/team';
import { references } from '@/data/references';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/sections/SectionShell';
import { GithubIcon } from '@/components/ui/GithubIcon';

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
            className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {about.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Coluna Equipe & Pesquisadores */}
        <div className="flex flex-col lg:col-span-6">
          <Reveal className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-between rounded-3xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between border-b border-line/60 pb-3">
                  <div className="flex items-center gap-2 text-science">
                    <Users aria-hidden="true" className="h-5 w-5" />
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide">
                      {about.teamLabel}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-ink-faint">
                    {institution.group} • {institution.year}
                  </span>
                </div>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {teamMembers.map((member) => (
                    <li
                      key={member}
                      className="flex items-center gap-2.5 rounded-xl border border-line/50 bg-bg/50 px-3.5 py-2.5 text-sm font-medium text-ink"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-science" />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-line/60 pt-4">
                <p className="text-xs text-ink-faint">
                  Equipe de estudantes pesquisadores responsáveis pela modelagem, coleta de dados e desenvolvimento de software.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Coluna Instituição, Orientação & Repositório no GitHub */}
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={60}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white/80 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-science">
                  <GraduationCap aria-hidden="true" className="h-5 w-5" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide">
                    {about.advisorLabel}
                  </h3>
                </div>
                <p className="mt-4 font-display text-xl font-bold text-ink">{advisor}</p>
                <p className="mt-1 text-xs text-ink-soft">Professora orientadora da pesquisa escolar</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white/80 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-science">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide">
                    {about.institutionLabel}
                  </h3>
                </div>
                <p className="mt-3 font-display text-base font-bold text-ink">{institution.name}</p>
                <p className="text-xs font-medium text-ink-soft">
                  {institution.group} • {institution.city} ({institution.year})
                </p>
              </div>
            </Reveal>
          </div>

          {/* Destaque de Repositório do Modelo no GitHub */}
          <Reveal delay={160} className="flex flex-1 flex-col">
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-science/30 bg-gradient-to-br from-white/90 to-science/5 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5 text-science">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-science/10">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                      OPEN SOURCE • PESQUISA ACADÊMICA
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {about.codeLabel}
                    </h3>
                  </div>
                </div>
                <GitPullRequest className="h-5 w-5 text-science/40" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {about.codeDescription}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-display text-xs font-semibold text-white shadow-sm transition-all hover:bg-science"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Ver modelo no GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="font-mono text-xs text-ink-faint">github.com/aceitadev</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Seção de Referências Bibliográficas */}
      <Reveal delay={200} className="mt-6">
        <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2 text-science">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wide">
              {about.referencesLabel}
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-faint">{about.referencesNote}</p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {references.map((reference) => (
              <li
                key={reference.source}
                className="rounded-2xl border border-line bg-bg/60 p-4 transition-colors hover:bg-white"
              >
                <h4 className="font-display text-sm font-bold text-ink">{reference.source}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{reference.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}

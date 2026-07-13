import { ExternalLink } from 'lucide-react';
import { site } from '@/data/content';
import { BrandMark } from '@/components/ui/BrandMark';
import { GithubIcon } from '@/components/ui/GithubIcon';

export function Footer() {
  return (
    <footer className="px-safe pb-safe relative z-10 border-t border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-shell flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark className="h-6 w-6" />
          <div>
            <span className="block font-display text-sm font-bold text-ink">{site.productName}</span>
            <span className="block text-xs text-ink-faint">
              {site.projectTitle}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-display text-xs font-semibold text-ink shadow-sm transition-all hover:border-science hover:bg-science hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span>Ver modelo no GitHub</span>
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
          <p className="text-xs leading-relaxed text-ink-faint">
            {site.institution} • {site.group} • {site.city} • {site.year}. Projeto escolar com dados ilustrativos.
          </p>
        </div>
      </div>
    </footer>
  );
}

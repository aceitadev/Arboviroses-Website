import { site } from '@/data/content';
import { BrandMark } from '@/components/ui/BrandMark';

export function Footer() {
  return (
    <footer className="px-safe pb-safe relative z-10 border-t border-line bg-bg/70">
      <div className="mx-auto flex max-w-shell flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BrandMark className="h-5 w-5" />
          <span className="font-display text-sm font-semibold text-ink">{site.brand}</span>
        </div>
        <p className="text-xs leading-relaxed text-ink-faint">
          {site.institution} • {site.group} • {site.city} • {site.year}. Projeto escolar com dados
          ilustrativos.
        </p>
      </div>
    </footer>
  );
}

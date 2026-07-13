'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/sections';
import { nav as navContent, site } from '@/data/content';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToId } from '@/lib/scrollTo';
import { useNarrativeStore } from '@/lib/scroll/store';
import { BrandMark } from '@/components/ui/BrandMark';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { GithubIcon } from '@/components/ui/GithubIcon';

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const activeId = useNarrativeStore((state) => state.activeId);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToId(id, reduced);
    setOpen(false);
  };

  return (
    <header className="pt-safe fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/90 backdrop-blur-md">
      <div className="px-safe mx-auto flex h-16 max-w-shell items-center justify-between">
        <a
          href="#abertura"
          onClick={(event) => go(event, 'abertura')}
          aria-label={navContent.brandAria}
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-science"
        >
          <BrandMark />
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold leading-tight tracking-tight text-ink">
              {site.shortTitle}
            </span>
            <span className="hidden text-[10px] font-semibold text-science sm:inline">
              ML & Previsão
            </span>
          </div>
        </a>

        <nav aria-label={navContent.menuLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => go(event, link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={cn(
                    'inline-flex min-h-9 items-center rounded-full px-3 text-sm font-medium transition-colors',
                    activeId === link.id
                      ? 'bg-science/10 font-semibold text-science'
                      : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Botão Oficial e Bem Integrado para o Repositório do GitHub no Topo */}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Acessar código-fonte e modelo no GitHub"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink px-4 py-2 font-display text-xs font-semibold text-white shadow-sm transition-all hover:bg-science hover:border-science hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-science"
          >
            <GithubIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Ver modelo no GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-white md:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            <span className="sr-only">{open ? navContent.closeMenu : navContent.openMenu}</span>
          </button>
        </div>
      </div>

      <MobileMenu
        id="mobile-menu"
        open={open}
        activeId={activeId}
        onClose={() => setOpen(false)}
        onNavigate={go}
      />
    </header>
  );
}

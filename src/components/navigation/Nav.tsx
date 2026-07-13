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
    <header className="pt-safe fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="px-safe mx-auto flex h-14 max-w-shell items-center justify-between">
        <a
          href="#abertura"
          onClick={(event) => go(event, 'abertura')}
          aria-label={navContent.brandAria}
          className="flex items-center gap-2 rounded-full"
        >
          <BrandMark />
          <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">
            {site.shortTitle}
          </span>
        </a>

        <nav aria-label={navContent.menuLabel} className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => go(event, link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={cn(
                    'inline-flex min-h-9 items-center rounded-full px-3 text-sm font-medium transition-colors',
                    activeId === link.id
                      ? 'text-science'
                      : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
        >
          {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          <span className="sr-only">{open ? navContent.closeMenu : navContent.openMenu}</span>
        </button>
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

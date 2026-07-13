'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { NAV_LINKS, type SectionId } from '@/lib/sections';
import { cn } from '@/lib/cn';
import { site } from '@/data/content';
import { GithubIcon } from '@/components/ui/GithubIcon';

interface MobileMenuProps {
  id: string;
  open: boolean;
  activeId?: SectionId;
  onClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => void;
}

export function MobileMenu({ id, open, activeId, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useFramerReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          ref={panelRef}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden"
        >
          <nav
            aria-label="Navegação principal"
            className="px-safe mx-auto max-w-shell pb-3"
          >
            <ul className="overflow-hidden rounded-2xl border border-line bg-bg/95 shadow-lg shadow-ink/5 backdrop-blur">
              {NAV_LINKS.map((link) => (
                <li key={link.id} className="border-b border-line/60">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => onNavigate(event, link.id)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={cn(
                      'flex min-h-12 items-center px-4 text-base font-medium',
                      activeId === link.id ? 'text-science font-semibold' : 'text-ink',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between bg-ink/5 px-4 text-base font-semibold text-science"
                >
                  <span className="flex items-center gap-2.5">
                    <GithubIcon className="h-4.5 w-4.5" />
                    <span>Ver modelo no GitHub</span>
                  </span>
                  <span className="text-xs font-mono text-ink-faint">↗</span>
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { opening } from '@/data/content';

/** Indicação discreta de scroll, exibida apenas no topo da página. */
export function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex flex-col items-center gap-2 text-ink-faint transition-opacity duration-500"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <span className="text-xs font-medium uppercase tracking-[0.16em]">{opening.scrollHint}</span>
      <ChevronDown className="h-5 w-5 motion-safe:animate-bounce" />
    </div>
  );
}

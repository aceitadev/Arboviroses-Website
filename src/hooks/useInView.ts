'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** Observa a entrada de um elemento na viewport (barato, pausa fora da tela). */
export function useInView<T extends Element>(options?: UseInViewOptions) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;
  const rootMargin = options?.rootMargin ?? '0px 0px -12% 0px';
  const threshold = options?.threshold ?? 0.12;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}

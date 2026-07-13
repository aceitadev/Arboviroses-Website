'use client';

import { createElement, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Atraso em ms para escalonar entradas. */
  delay?: number;
}

/**
 * Revela o conteúdo ao entrar na viewport. Sem JS, o conteúdo aparece normalmente
 * (a classe `reveal` só age sob `html.js`). Com movimento reduzido, aparece já.
 */
export function Reveal({ children, className, as, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true });
  const reduced = useReducedMotion();
  const visible = inView || reduced;

  return createElement(
    as ?? 'div',
    {
      ref,
      className: cn('reveal', visible && 'is-visible', className),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}

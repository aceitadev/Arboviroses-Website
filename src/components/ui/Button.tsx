'use client';

import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToId } from '@/lib/scrollTo';

type Variant = 'primary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Quando definido, o botão rola suavemente até a seção com este id. */
  toId?: string;
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-science focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-science text-white hover:bg-science-deep',
  outline: 'border border-ink/20 bg-white/70 text-ink hover:border-ink/40 hover:bg-white',
};

/** Botão acessível (alvo de toque ≥ 44px). Pode rolar até uma seção via `toId`. */
export function Button({
  variant = 'primary',
  toId,
  className,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion();

  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      onClick={(event) => {
        if (toId) scrollToId(toId, reduced);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

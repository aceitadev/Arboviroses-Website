import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { SectionId } from '@/lib/sections';

interface SectionShellProps {
  id: SectionId;
  labelledBy: string;
  /** Descrição textual equivalente da cena 3D (lida por leitores de tela). */
  sceneAlt?: string;
  /** Usa altura mínima de uma viewport (padrão) ou cresce conforme o conteúdo. */
  fullHeight?: boolean;
  /** Clarão sutil atrás do texto (legibilidade sobre a cena 3D). */
  scrim?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Casca padronizada de seção: âncora, rótulo ARIA, ritmo vertical e altura
 * estável em mobile (usa svh, cresce com o conteúdo — sem altura fixa arbitrária).
 */
export function SectionShell({
  id,
  labelledBy,
  sceneAlt,
  fullHeight = true,
  scrim = true,
  className,
  innerClassName,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-16', className)}
    >
      {sceneAlt && <p className="sr-only">{sceneAlt}</p>}
      {scrim && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(125% 80% at 50% 42%, rgba(244,247,251,0.72) 0%, rgba(244,247,251,0.40) 46%, rgba(244,247,251,0) 78%)',
          }}
        />
      )}
      <div
        className={cn(
          'px-safe relative z-10 mx-auto flex w-full max-w-shell flex-col justify-center py-20 sm:py-24',
          fullHeight && 'min-h-screen-safe',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

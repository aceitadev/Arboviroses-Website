import { cn } from '@/lib/cn';

/**
 * Símbolo do projeto: uma gota (clima/água) atravessada por uma curva de dados
 * ascendente (previsão/tendência). Abstrato, sóbrio, sem glow.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn('h-7 w-7', className)}
    >
      <path
        d="M16 3.5c4.4 5 7.5 8.7 7.5 13a7.5 7.5 0 0 1-15 0c0-4.3 3.1-8 7.5-13Z"
        fill="none"
        stroke="var(--science)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 18.5c2.2 0 2.6-4 4.6-4 2.2 0 2.4 5.4 4.6 5.4 1.7 0 2.2-3 3.8-3"
        fill="none"
        stroke="var(--risk)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

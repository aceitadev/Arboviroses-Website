import { cn } from '@/lib/cn';

/** Rótulo curto acima dos títulos de seção. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'font-display text-xs font-semibold uppercase tracking-[0.18em] text-science',
        className,
      )}
    >
      {children}
    </span>
  );
}

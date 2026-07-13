import { FlaskConical } from 'lucide-react';
import { cn } from '@/lib/cn';

type BadgeTone = 'demo' | 'neutral';

/** Selo compacto — usado para marcar conteúdo ilustrativo/demonstrativo. */
export function Badge({
  children,
  tone = 'demo',
  icon = true,
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tone === 'demo'
          ? 'border-science/25 bg-science/10 text-science-deep'
          : 'border-line bg-white/70 text-ink-soft',
        className,
      )}
    >
      {icon && <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

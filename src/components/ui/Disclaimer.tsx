import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Aviso sóbrio para reforçar que os dados são ilustrativos. */
export function Disclaimer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-xl border border-line bg-white/60 px-3.5 py-2.5 text-sm text-ink-soft',
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-science" />
      <span>{children}</span>
    </p>
  );
}

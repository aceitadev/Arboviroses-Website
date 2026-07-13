'use client';

import { useRef } from 'react';
import { DISEASE_IDS, DISEASE_META } from '@/data/diseases';
import type { DiseaseId } from '@/types';
import { cn } from '@/lib/cn';

interface DiseaseToggleProps {
  value: DiseaseId;
  onChange: (id: DiseaseId) => void;
  label: string;
}

/** Seletor acessível (radiogroup) para alternar entre as arboviroses. */
export function DiseaseToggle({ value, onChange, label }: DiseaseToggleProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const dir = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + DISEASE_IDS.length) % DISEASE_IDS.length;
    const nextId = DISEASE_IDS[next]!;
    onChange(nextId);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-full border border-line bg-white/70 p-1"
    >
      {DISEASE_IDS.map((id, index) => {
        const selected = id === value;
        return (
          <button
            key={id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              'min-h-10 rounded-full px-4 text-sm font-semibold transition-colors',
              selected ? 'bg-science text-white' : 'text-ink-soft hover:text-ink',
            )}
          >
            {DISEASE_META[id].name}
          </button>
        );
      })}
    </div>
  );
}

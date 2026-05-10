'use client';

import { cn } from '@/lib/utils';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ModeToggleProps<T extends string> {
  value: T;
  options: ToggleOption<T>[];
  onChange: (next: T) => void;
}

export const ModeToggle = <T extends string>({ value, options, onChange }: ModeToggleProps<T>) => (
  <div className="bg-muted flex w-fit rounded-full p-0.5">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={cn(
          'rounded-full px-3 py-0.5 text-xs font-medium transition-colors',
          value === opt.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

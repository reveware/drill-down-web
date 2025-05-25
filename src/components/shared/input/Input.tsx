import * as React from 'react';

import { cn } from '@/lib/utils';

export const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `bg-surface dark:bg-secondary text-foreground file:text-foreground checked:bg-accent
         placeholder:text-muted selection:bg-primary selection:text-primary-foreground 
         border-none flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] 
        outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium 
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        'focus-visible:border-accent',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
};

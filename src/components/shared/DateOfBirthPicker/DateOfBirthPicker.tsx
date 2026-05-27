'use client';

import { useState } from 'react';
import { format, isValid, parse, subYears } from 'date-fns';
import { Calendar as CalendarIcon } from '@/components/shared/Icons';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateOfBirthPickerProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  minAgeYears?: number;
  className?: string;
  placeholder?: string;
}

export function DateOfBirthPicker({
  value,
  onChange,
  onBlur,
  minAgeYears = 18,
  className,
  placeholder = 'Date of birth',
}: DateOfBirthPickerProps) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const maxDate = subYears(today, minAgeYears);
  const minDate = subYears(today, 80);

  const parsed = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
  const selected = parsed && isValid(parsed) ? parsed : undefined;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="input"
          className={cn(
            'border-input dark:bg-input/30 flex h-9 w-full min-w-0 items-center rounded-md border bg-transparent px-3 py-1 text-left text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px]',
            'cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            !selected && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, 'MMM do, yyyy') : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? maxDate}
          startMonth={minDate}
          endMonth={maxDate}
          captionLayout="dropdown"
          disabled={(d) => d > maxDate || d < minDate}
          onSelect={(d) => {
            if (d) {
              onChange(format(d, 'yyyy-MM-dd'));
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

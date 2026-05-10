'use client';

import { useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ConfirmOptions {
  /** Optional emoji shown above the title */
  emoji?: string;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

interface ConfirmDialogProps {
  options: ConfirmOptions | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({ options, onConfirm, onCancel }: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the safe option when the dialog opens
  useEffect(() => {
    if (options) cancelRef.current?.focus();
  }, [options]);

  return (
    <Dialog open={!!options} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center gap-1 text-center sm:items-center sm:text-center">
          {options?.emoji && <div className="mb-2 text-4xl">{options.emoji}</div>}
          <DialogTitle className="text-center">{options?.title ?? ''}</DialogTitle>
          {options?.description && (
            <DialogDescription className="mt-1 text-center">
              {options.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-2 flex justify-end gap-2">
          <Button ref={cancelRef} variant="ghost" onClick={onCancel}>
            {options?.cancelLabel ?? 'Cancel'}
          </Button>
          <Button variant={options?.destructive ? 'destructive' : 'default'} onClick={onConfirm}>
            {options?.confirmLabel ?? 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

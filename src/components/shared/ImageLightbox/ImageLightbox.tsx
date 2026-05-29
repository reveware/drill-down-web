'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
}

const FULLSCREEN_CONTENT =
  'h-screen w-screen max-w-none gap-0 rounded-none border-0 bg-transparent p-0 shadow-none sm:max-w-none';

export const ImageLightbox = ({ open, onOpenChange, src, alt }: ImageLightboxProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={FULLSCREEN_CONTENT}>
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <div className="relative h-full w-full cursor-zoom-out" onClick={() => onOpenChange(false)}>
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
      </div>
    </DialogContent>
  </Dialog>
);

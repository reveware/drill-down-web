import { ImagePost } from '@/types/post';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from '@/components/shared/Icons';
import { ImageLightbox } from '@/components/shared';

export const ImagePostContent = ({ post }: { post: ImagePost }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const { images } = post;
  if (!images.length) return null;

  const count = images.length;
  const active = images[current];

  return (
    <div className="relative w-full">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-4">
          {images.map((img, idx) => (
            <CarouselItem key={img.url} className={idx === 0 ? 'pl-0' : 'pl-4'}>
              <div
                className="relative w-full cursor-zoom-in overflow-hidden"
                style={{ aspectRatio: `${img.meta.width}/${img.meta.height}` }}
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={img.url}
                  alt={`Post photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {count > 1 && <OverlayNavigation api={api} />}
      </Carousel>
      {count > 1 && <OverlayIndicators total={count} current={current} />}
      <ImageLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        src={active.url}
        alt={`Post photo ${current + 1}`}
      />
    </div>
  );
};

const OverlayNavigation = ({ api }: { api: CarouselApi }) => (
  <>
    <button
      type="button"
      className="bg-background/60 text-foreground hover:bg-background/80 absolute top-1/2 left-2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full opacity-80 focus:outline-none sm:flex"
      onClick={() => api?.scrollPrev()}
      aria-label="Previous image"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      type="button"
      className="bg-background/60 text-foreground hover:bg-background/80 absolute top-1/2 right-2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full opacity-80 focus:outline-none sm:flex"
      onClick={() => api?.scrollNext()}
      aria-label="Next image"
    >
      <ChevronRight size={20} />
    </button>
  </>
);

const OverlayIndicators = ({ total, current }: { total: number; current: number }) => (
  <div className="absolute bottom-2 left-1/2 z-10 mb-4 flex -translate-x-1/2 gap-1">
    {Array.from({ length: total }).map((_, idx) => (
      <span
        key={idx}
        className={`h-2 w-2 rounded-full transition-all ${
          current === idx ? 'bg-foreground opacity-90' : 'bg-foreground/50 opacity-60'
        }`}
      />
    ))}
  </div>
);

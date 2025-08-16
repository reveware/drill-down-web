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

export const ImagePostContent = ({ post }: { post: ImagePost }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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

  // --- Single image case ---
  if (count === 1) {
    const { url, meta } = images[0];
    return (
      <div className="relative w-full overflow-hidden">
        <div style={{ aspectRatio: `${meta.width}/${meta.height}` }}>
          <Image
            src={url}
            alt="Post photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    );
  }

  // --- Multiple images (carousel) ---
  return (
    <div className="relative w-full">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-4">
          {images.map((img, idx) => (
            <CarouselItem key={img.url} className={idx === 0 ? 'pl-0' : 'pl-4'}>
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: `${img.meta.width}/${img.meta.height}` }}
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
        <OverlayNavigation api={api} />
      </Carousel>
      <OverlayIndicators total={count} current={current} />
    </div>
  );
};

const OverlayNavigation = ({ api }: { api: CarouselApi }) => (
  <>
    <button
      type="button"
      className="absolute top-1/2 left-2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-80 hover:bg-black/60 focus:outline-none sm:flex"
      onClick={() => api?.scrollPrev()}
      aria-label="Previous image"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      type="button"
      className="absolute top-1/2 right-2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-80 hover:bg-black/60 focus:outline-none sm:flex"
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
          current === idx ? 'bg-white opacity-90' : 'bg-white/60 opacity-60'
        }`}
      />
    ))}
  </div>
);

import { useEffect, RefObject } from 'react';

interface Props<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  onLoadMore: () => void;
  enabled: boolean;
}

export const useInfiniteScrollObserver = <T extends HTMLElement = HTMLElement>({
  ref,
  onLoadMore,
  enabled,
}: Props<T>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '100px', // Trigger 100px before the element comes into view
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, onLoadMore, enabled]);
};

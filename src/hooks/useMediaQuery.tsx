// hooks/use-media-query.ts
import { useEffect, useState } from 'react';

const breakpointQueries = {
  mobile: '(max-width: 767px)', // < md
  tablet: '(min-width: 768px) and (max-width: 1023px)', // md only
  desktop: '(min-width: 1024px)', // ≥ lg
} as const;

type BreakpointKey = keyof typeof breakpointQueries;

export const useMediaQuery = (queryOrKey: BreakpointKey | string) => {
  const query = breakpointQueries[queryOrKey as BreakpointKey] ?? queryOrKey;

  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);

    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

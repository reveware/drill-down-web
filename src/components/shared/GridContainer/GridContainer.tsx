import { CSSProperties, ReactNode } from 'react';

interface GridContainerProps {
  children: ReactNode;
  /** Smallest an item may get before the grid drops a column. */
  minItemWidth?: string;
}

export const GridContainer = ({ children, minItemWidth = '6rem' }: GridContainerProps) => (
  <div
    style={{ '--grid-min': minItemWidth } as CSSProperties}
    className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(var(--grid-min),1fr))] gap-3"
  >
    {children}
  </div>
);

export const GridContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  /* 3 cols on ≥640 px, 4 cols on ≥1280 px */
  <div className="grid auto-rows-fr grid-cols-3 gap-2 xl:grid-cols-4">{children}</div>
);

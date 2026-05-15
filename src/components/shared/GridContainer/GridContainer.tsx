export const GridContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid auto-rows-fr grid-cols-3 gap-2 xl:grid-cols-4">{children}</div>
);

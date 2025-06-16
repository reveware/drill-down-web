export const GridContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  /* 2×2 on phones */ /* 3×4 on ≥640 px */ /* 4×3 on ≥1280 px */
  <div className="grid min-h-[208px] auto-rows-fr grid-cols-2 gap-2 sm:min-h-[312px] sm:grid-cols-3 xl:min-h-[208px] xl:grid-cols-4">
    {children}
  </div>
);

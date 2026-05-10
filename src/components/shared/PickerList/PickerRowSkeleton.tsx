export const PickerRowSkeleton = ({ count = 5 }: { count?: number }) => (
  <ul className="flex flex-col">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="flex items-center gap-3 p-3">
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-3 w-32 animate-pulse rounded" />
          <div className="bg-muted h-3 w-20 animate-pulse rounded" />
        </div>
      </li>
    ))}
  </ul>
);

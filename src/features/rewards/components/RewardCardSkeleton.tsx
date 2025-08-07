interface RewardCardSkeletonProps {
  className?: string;
}

export const RewardCardSkeleton = ({ className = '' }: RewardCardSkeletonProps) => {
  return (
    <div className={`bg-card h-full overflow-hidden rounded-lg ${className}`}>
      <div className="relative h-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
};

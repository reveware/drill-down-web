interface RewardCardSkeletonProps {
  className?: string;
}

export const RewardCardSkeleton = ({ className = '' }: RewardCardSkeletonProps) => {
  return (
    <div className={`bg-card h-full overflow-hidden rounded-lg ${className}`}>
      <div className="bg-muted relative h-full animate-pulse"></div>
    </div>
  );
};

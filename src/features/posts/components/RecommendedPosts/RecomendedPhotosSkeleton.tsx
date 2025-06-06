import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendedPhotosSkeletonProps {
  isMobile: boolean;
}

export const RecommendedPhotosSkeleton = ({ isMobile }: RecommendedPhotosSkeletonProps) => {
  const skeletonCount = isMobile ? 4 : 12;

  return (
    <GridContainer>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-md">
          <Skeleton className="h-full w-full animate-pulse" />
        </div>
      ))}
    </GridContainer>
  );
};

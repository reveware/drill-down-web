import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendedImagesSkeletonProps {
  isMobile: boolean;
}

export const RecommendedImagesSkeleton = ({ isMobile }: RecommendedImagesSkeletonProps) => {
  const skeletonCount = isMobile ? 6 : 12;

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

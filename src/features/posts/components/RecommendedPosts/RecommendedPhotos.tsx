'use client';

import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { useRecommendedPosts } from '../../hooks/useRecommendedPosts';
import { RecommendedPhotosSkeleton } from './RecomendedPhotosSkeleton';
import { PhotoPost, PostTypes } from '@/types/post';

interface RecommendedPhotosProps {
  userId: string;
}

export const RecommendedPhotos = ({ userId }: RecommendedPhotosProps) => {
  const title = 'Recommended Photos';
  const isMobile = useMediaQuery('mobile'); // < 768 px
  const { recommendations, isLoading } = useRecommendedPosts(userId);

  const posts = recommendations
    .map((recommendation) => recommendation.post)
    .filter((post) => post.type === PostTypes.PHOTO);

  const visiblePosts = posts.slice(0, isMobile ? 6 : 12);
  console.log('visiblePosts', visiblePosts);
  return (
    <Card className="card max-w-lg">
      <CardHeader>
        <CardTitle className="font-title text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="h-full px-4">
        {isLoading ? (
          <RecommendedPhotosSkeleton isMobile={isMobile} />
        ) : visiblePosts.length === 0 ? (
          <EmptyState />
        ) : (
          <PhotoGrid posts={visiblePosts} />
        )}
      </CardContent>
    </Card>
  );
};

const PhotoGrid: React.FC<{ posts: PhotoPost[] }> = ({ posts }) => (
  <GridContainer>
    {posts.map((post) => (
      <button
        key={post.id}
        type="button"
        className="bg-muted/20 relative aspect-square overflow-hidden rounded-md"
      >
        <Image
          src={post.urls[0]}
          alt={`Photo by ${post.author.username}`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="photo object-cover"
        />
      </button>
    ))}
  </GridContainer>
);

const EmptyState: React.FC = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <div>
      <div className="font-title mb-2 text-2xl font-bold">No photos available</div>
      <div className="text-accent text-sm">Check back later for recommendations!</div>
    </div>
  </div>
);

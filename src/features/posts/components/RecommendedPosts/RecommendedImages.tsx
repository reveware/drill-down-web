'use client';

import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { EmptyState } from '@/components/shared';
import { useRecommendedPosts } from '../../hooks/useRecommendedPosts';
import { RecommendedImagesSkeleton } from './RecomendedImagesSkeleton';
import { ImagePost, PostTypes } from '@/types/post';

interface RecommendedImagesProps {
  userId: string;
}

export const RecommendedImages = ({ userId }: RecommendedImagesProps) => {
  const title = 'Recommended Photos';
  const isMobile = useMediaQuery('mobile'); // < 768 px
  const { recommendations, isLoading } = useRecommendedPosts(userId);

  const posts = recommendations
    .map((recommendation) => recommendation.post)
    .filter((post) => post.type === PostTypes.IMAGE);

  const visiblePosts = posts.slice(0, isMobile ? 6 : 12);

  return (
    <Card className="card max-w-lg">
      <CardHeader>
        <CardTitle className="font-sans text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="h-full px-4">
        {isLoading ? (
          <RecommendedImagesSkeleton isMobile={isMobile} />
        ) : visiblePosts.length === 0 ? (
          <EmptyState
            emoji="🔭"
            title="No Photos Available"
            subtitle="Check back later for recommendations!"
          />
        ) : (
          <ImageGrid posts={visiblePosts} />
        )}
      </CardContent>
    </Card>
  );
};

const ImageGrid: React.FC<{ posts: ImagePost[] }> = ({ posts }) => (
  <GridContainer>
    {posts.map((post) => (
      <button
        key={post.id}
        type="button"
        className="bg-muted/20 relative aspect-square overflow-hidden rounded-md"
      >
        <Image
          src={post.images[0].url}
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

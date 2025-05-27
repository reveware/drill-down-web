// features/posts/RecommendedPhotoPosts.tsx
'use client';

import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PhotoPost } from '@/types/post';

interface Props {
  posts: PhotoPost[];
}

export const RecommendedPhotoPosts: React.FC<Props> = ({ posts }) => {
  const title = 'Recommended Photos';
  const isMobile = useMediaQuery('mobile'); // < 768 px
  const visiblePosts = posts.slice(0, isMobile ? 4 : 12);

  if (visiblePosts.length === 0) {
    return <EmptyState title={title} />;
  }

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-4">
        <div
          className="grid gap-2 auto-rows-fr
            grid-cols-2               /* 2×2 on phones        */
            sm:grid-cols-3            /* 3×4 on ≥640 px       */
            xl:grid-cols-4            /* 4×3 on ≥1280 px      */
          "
        >
          {visiblePosts.map((post) => (
            <button
              key={post.id}
              type="button"
              className="
                group relative aspect-square
                overflow-hidden rounded-md bg-muted/20
                transition-opacity hover:opacity-80
              "
            >
              <Image
                src={post.content.urls[0]}
                alt={`Photo by ${post.author.username}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState: React.FC<{ title: string; height?: string }> = ({ title, height = 'h-48' }) => (
  <Card className="card">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div
        className={`${height} bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm`}
      >
        No photo posts available
      </div>
    </CardContent>
  </Card>
);

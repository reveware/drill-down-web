import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TagCount } from '@/types/tag';
import { useUserTags } from '../hooks/useUserTags';
import { EmptyState, Spinner } from '@/components/shared';

export const UserTags = ({ userId }: { userId: string }) => {
  const { data: tags, isPending: isLoading } = useUserTags(userId);

  return (
    <Card className="card w-full max-w-lg">
      <CardHeader>
        <CardTitle className="font-sans text-lg font-semibold">Popular Tags</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading && tags && tags.length > 0 && <TagCloud tags={tags} />}
        {!isLoading && (!tags || tags.length === 0) && (
          <EmptyState
            emoji="🌿"
            title="No tags yet"
            subtitle="Your interests will surface here as you post."
          />
        )}
      </CardContent>
    </Card>
  );
};

export const TagCloud = ({ tags }: { tags: TagCount[] }) => {
  const max = Math.max(...tags.map((tag) => tag.count));
  const min = Math.min(...tags.map((tag) => tag.count));

  return (
    <div className="max-w-md">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag, i) => {
          const weight = (tag.count - min) / (max - min || 1);
          const fontSize = 12 + weight * 34;
          const opacity = 0.4 + weight * 0.6;
          const delay = i * 50; // ms

          return (
            <Link
              key={tag.slug}
              href={`/posts/search?tags=${encodeURIComponent(tag.slug)}`}
              className={cn(
                'text-foreground inline-block cursor-pointer font-sans transition-transform select-none',
                'hover:text-primary animate-fade-in-up hover:scale-110'
              )}
              style={{
                fontSize: `${fontSize}px`,
                opacity,
                lineHeight: 1,
                animationDelay: `${delay}ms`,
              }}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

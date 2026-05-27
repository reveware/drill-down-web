'use client';
import { useState } from 'react';
import { MasonryGallery } from '@/components/shared/MasonryGallery';
import { EmptyState } from '@/components/shared';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { PostOverview, PostSearchParams } from '@/types/post';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { PostCard } from '../PostCard';
import { PostThumbnail } from '../PostThumbnail/PostThumbnail';
import { PostThumbnailSkeleton } from '../PostThumbnail/PostThumbnailSkeleton';

interface PostSearchGalleryProps {
  search: PostSearchParams;
}

export const PostSearchGallery = ({ search }: PostSearchGalleryProps) => {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchPosts(search);

  const [selectedPost, setSelectedPost] = useState<PostOverview | null>(null);

  return (
    <>
      <MasonryGallery<PostOverview>
        items={posts}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => setSelectedPost(post)}
            className="focus-visible:ring-ring h-full w-full cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Open post"
          >
            <PostThumbnail post={post} />
          </button>
        )}
        renderSkeleton={() => <PostThumbnailSkeleton />}
        renderEmptyState={() => (
          <EmptyState
            emoji="🔎"
            title="No posts match"
            subtitle="Try a different tag or broaden your search."
          />
        )}
      />

      <Sheet open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-4 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Post details</SheetTitle>
          </VisuallyHidden>
          <div className="flex min-h-full items-center">
            {selectedPost && <PostCard post={selectedPost} />}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

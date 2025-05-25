import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

import { PostOverview } from '@/types/post';
import { PostSkeleton } from '../post-card/PostSkeleton';
import { PostCard } from '../post-card';
import { fetchMockPosts } from '@/mocks/posts';
import { ScrollArea } from '@/components/ui/scroll-area';

const PAGE_SIZE = 5;

export const PostFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchMockPosts(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(loader);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="min-h-full flex flex-col items-center justify-start gap-6 py-6 px-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
          : data?.pages.flat().map((post: PostOverview) => <PostCard key={post.id} post={post} />)}

        {hasNextPage && <div ref={loaderRef}>{isFetchingNextPage && <PostSkeleton />}</div>}
      </div>
    </ScrollArea>
  );
};

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

import { PostOverview } from '@/types/post';
import { PostSkeleton } from '../post-card/PostSkeleton';
import { PostCard } from '../post-card';
import { fetchMockPosts } from '@/mocks/posts';

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

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {data?.pages.flat().map((post: PostOverview) => {
        return (
          <React.Fragment key={post.id}>
            <PostCard post={post} />
            <PostSkeleton />
          </React.Fragment>
        );
      })}

      {hasNextPage && <div ref={loaderRef}>{isFetchingNextPage && <PostSkeleton />}</div>}
    </div>
  );
};

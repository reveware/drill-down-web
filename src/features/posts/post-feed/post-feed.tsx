import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { PostOverview } from '@/types/post';
import { PostSkeleton } from '../post-card/post-skeleton';
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
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.pages.flat().map((post: PostOverview) => <PostCard key={post.id} post={post} />)}

      {hasNextPage && <div ref={loaderRef}>{isFetchingNextPage && <PostSkeleton />}</div>}
    </div>
  );
};

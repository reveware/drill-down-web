import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMockPosts } from '@/mocks/posts';
import { PostOverview } from '@/types/post';

const PAGE_SIZE = 5;

export const useFeedPosts = () => {
  return useInfiniteQuery<PostOverview[]>({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchMockPosts(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
};

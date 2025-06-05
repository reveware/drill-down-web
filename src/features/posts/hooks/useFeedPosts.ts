import { useInfiniteQuery } from '@tanstack/react-query';
import { PostOverview } from '@/types/post';
import { postApi } from '@/lib/api/endpoints/post.api';
const PAGE_SIZE = 5;

export const useFeedPosts = () => {
  return useInfiniteQuery<PostOverview[]>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) =>
      await postApi.getFeedPosts(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
};

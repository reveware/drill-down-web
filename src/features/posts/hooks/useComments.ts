import { useInfiniteQuery } from '@tanstack/react-query';
import { Comment } from '@/types/comment';
import { CommentApi } from '@/api/endpoints/comment.api';
import { PaginatedResponse } from '@/types/pagination';

export const useComments = (postId: string) => {
  const query = useInfiniteQuery<PaginatedResponse<Comment>>({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam }) => await CommentApi.getComments(postId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.is_last_page ? undefined : lastPage.page + 1;
    },
    enabled: !!postId,
  });

  const comments = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    comments,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};

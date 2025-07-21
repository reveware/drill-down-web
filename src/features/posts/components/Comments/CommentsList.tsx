import { useRef } from 'react';
import { useComments } from '../../hooks/useComments';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { SingleComment } from './SingleComment';
import { CommentSkeleton } from './CommentSkeleton';
import { cn } from '@/lib/utils';

interface CommentsListProps {
  className?: string;
  postId: string;
  onReply: (commentId: string, authorUsername: string) => void;
}

export const CommentsList = ({ className, postId, onReply }: CommentsListProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { comments, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useComments(postId);

  useInfiniteScrollObserver({
    ref: loaderRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  // Filter out replies to show only top-level comments
  const topLevelComments = comments.filter((comment) => !comment.reply_to);

  return (
    <div className={cn('space-y-4', className)}>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : topLevelComments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {topLevelComments.map((comment) => (
            <SingleComment key={comment.id} comment={comment} postId={postId} onReply={onReply} />
          ))}
        </div>
      )}

      {/* Infinite scroll loader */}
      <div ref={loaderRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="w-full space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="text-muted-foreground py-8 text-center">
      <p>No comments yet. Be the first to comment!</p>
    </div>
  );
};

import { useState } from 'react';
import { CreateCommentForm } from './CreateCommentForm';
import { CommentsList } from './CommentsList';
import { Separator } from '@/components/ui/separator';
import { useCreateComment } from '../../hooks/useCreateComment';

interface CommentsProps {
  postId: string;
}

export const Comments = ({ postId }: CommentsProps) => {
  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment(postId);

  const [replyTo, setReplyTo] = useState<{
    commentId: string;
    username: string;
  } | null>(null);

  const handleReply = (commentId: string, username: string) => {
    setReplyTo({ commentId, username });
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 min-h-0 flex-1 overflow-y-auto">
        <CommentsList className="h-full" postId={postId} onReply={handleReply} />
      </div>
      <Separator className="mb-4" />
      <CreateCommentForm
        postId={postId}
        replyTo={replyTo || undefined}
        onCancelReply={handleCancelReply}
        onSubmit={createComment}
        isCreatingComment={isCreatingComment}
      />
    </div>
  );
};

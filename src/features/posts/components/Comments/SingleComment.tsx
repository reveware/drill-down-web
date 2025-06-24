import { useState } from 'react';
import { Comment } from '@/types/comment';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronDown, ChevronRight } from '@/components/shared/Icons';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textbox } from '@/components/shared/TextBox/Textbox';

import Link from 'next/link';

interface SingleCommentProps {
  comment: Comment;
  postId: string;
  onReply: (commentId: string, username: string) => void;
  depth?: number;
}

export const SingleComment = ({ comment, postId, onReply, depth = 0 }: SingleCommentProps) => {
  const [isShowingReplies, setIsShowingReplies] = useState(true);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 5; // Limit nesting depth

  const handleToggleReplies = () => {
    setIsShowingReplies(!isShowingReplies);
  };

  const handleReply = () => {
    onReply(comment.id, comment.author.username);
  };

  const CommentContent = ({ comment }: { comment: Comment }) => {
    return (
      <Textbox text={comment.message} maxLength={100} className="text-foreground mb-2 text-xs" />
    );
  };

  return (
    <div className={cn('space-y-4', depth > 0 && 'ml-6')}>
      <div className="mb-2 flex items-start gap-2">
        <UserAvatar user={comment.author} />

        <div className="min-w-0 flex-1">
          <Link className="flex items-center gap-2" href={`/user/${comment.author.id}`}>
            <span className="text-muted-foreground flex-1 text-sm font-bold">
              @{comment.author.username}
            </span>
            <span className="text-muted text-xs font-light">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </Link>

          <CommentContent comment={comment} />

          <div className="flex items-center justify-baseline gap-2 text-xs">
            <Button variant="link" size="sm" onClick={handleReply} className="h-6 text-xs">
              <MessageCircle size={14} />
              Reply
            </Button>

            {hasReplies && (
              <Button
                variant="link"
                size="sm"
                onClick={handleToggleReplies}
                className="h-6 text-xs"
              >
                {isShowingReplies ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && isShowingReplies && depth < maxDepth && (
        <div className="border-muted/20 ml-6 border-l-1">
          {comment.replies?.map((reply: Comment) => (
            <SingleComment
              key={reply.id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

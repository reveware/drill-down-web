import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Trash } from '@/components/shared/Icons';
import { Like } from '@/types/like';
import { PostTypes } from '@/types/post';
import { PostPhotoContent } from '@/features/posts/components/PostCard/PostCardContent/PostPhotoContent';
import { PostQuoteContent } from '@/features/posts/components/PostCard/PostCardContent/PostQuoteContent';
import {} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LikeFeedProps {
  user: UserOverview;
  likes: Like[];
}

export const LikeFeed = ({ user, likes }: LikeFeedProps) => {
  return (
    <div className="space-y-4">
      {likes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="text-sm text-muted-foreground">Recent activity</div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {likes.map((like) => (
              <LikeItem key={like.id} like={like} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const LikeItem = ({ like, user }: { like: Like; user: UserOverview }) => {
  const post = like.post;

  const Content = () => {
    switch (post.type) {
      case PostTypes.PHOTO:
        return <PostPhotoContent content={post.content} />;
      case PostTypes.QUOTE:
        return <PostQuoteContent content={post.content} />;
    }
  };
  return (
    <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
      <div className="flex-shrink-0 mt-1">
        <Heart size={16} className="text-muted-foreground" />
        {user.is_self && (
          <Button variant="ghost" size="icon">
            <Trash size={16} className="text-muted-foreground" />
          </Button>
        )}
      </div>
      <div className="flex-1">
        <div>
          <Content />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(like.created_at, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center text-muted-foreground py-8">
      <div className="text-lg mb-2">No recent activity</div>
      <div className="text-sm">Start interacting with posts and friends!</div>
    </div>
  );
};

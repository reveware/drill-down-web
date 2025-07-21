import { Heart, MessageCircle } from '@/components/shared/Icons';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TagList } from './TagList';
import { useModal } from '@/hooks/useModal';
import { Comments } from '../Comments/Comments';
import { PostOverview } from '@/types/post';
import { useLikePost } from '../../hooks/useLikePost';
import { useUnlikePost } from '../../hooks/useUnlikePost';

interface PostCardFooterProps {
  post: PostOverview;
  onLike: () => void;
  onUnlike: () => void;
}

export const PostCardFooter = ({ post, onLike, onUnlike }: PostCardFooterProps) => {
  const { openModal } = useModal();

  const handleViewComments = () => {
    openModal({
      id: 'comments',
      title: 'Comments',
      content: <Comments postId={post.id} />,
    });
  };

  const handleToggleLike = () => {
    if (post.is_liked) {
      onUnlike();
    } else {
      onLike();
    }
  };

  const { like_count, comment_count, tags } = post;
  return (
    <CardFooter className="flex flex-col gap-3 px-2 text-sm">
      <TagList tags={tags} />

      <Separator />

      <div className="flex items-center gap-6">
        <span className="flex cursor-pointer items-center gap-1" onClick={handleToggleLike}>
          <Heart size={20} className={post.is_liked ? 'liked-heart' : ''} />
          {like_count} likes
        </span>
        <span className="flex cursor-pointer items-center gap-1" onClick={handleViewComments}>
          <MessageCircle size={20} />
          {comment_count} comments
        </span>
      </div>
    </CardFooter>
  );
};

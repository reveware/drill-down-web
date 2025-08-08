import { Heart, MessageCircle } from '@/components/shared/Icons';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TagList } from './TagList';
import { useModal } from '@/hooks/useModal';
import { Comments } from '../Comments/Comments';
import { PostOverview } from '@/types/post';
import { PostLikesFeed } from '@/features/likes';

interface PostCardFooterProps {
  post: PostOverview;
  onHeartClick: () => void;
}

export const PostCardFooter = ({ post, onHeartClick }: PostCardFooterProps) => {
  const { openModal } = useModal();

  const handleViewComments = () => {
    openModal({
      id: 'comments',
      title: 'Comments',
      content: <Comments postId={post.id} />,
    });
  };

  const handleViewLikes = () => {
    openModal({
      id: 'likes',
      title: 'Likes',
      content: <PostLikesFeed postId={post.id} />,
    });
  };

  const { like_count, comment_count, tags } = post;
  return (
    <CardFooter className="flex flex-col gap-3 px-2 text-sm">
      <TagList tags={tags} />

      <Separator />

      <div className="flex items-center gap-6">
        <span className="flex cursor-pointer items-center gap-1">
          <Heart size={20} className={post.is_liked ? 'liked-heart' : ''} onClick={onHeartClick} />
          <span className="text-sm" onClick={handleViewLikes}>
            {like_count} likes
          </span>
        </span>
        <span className="flex cursor-pointer items-center gap-1" onClick={handleViewComments}>
          <MessageCircle size={20} />
          {comment_count} comments
        </span>
      </div>
    </CardFooter>
  );
};

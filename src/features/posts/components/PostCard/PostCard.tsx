import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { PostOverview } from '@/types/post';
import { PostCardHeader } from './PostCardHeader';
import { PostCardFooter } from './PostCardFooter';
import { PostCardContent } from './PostCardContent/PostCardContent';
import { useDeletePost } from '../../hooks/useDeletePost';
import { useLikePost } from '../../../likes/hooks/useLikePost';
import { useUnlikePost } from '../../../likes/hooks/useUnlikePost';

interface PostCardProps {
  post: PostOverview;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();

  const lastTap = useRef<number>(0);

  const handleLike = () => {
    if (post.is_liked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleTouchEnd = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      handleLike();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  if (isDeleting) {
    return null;
  }
  return (
    <Card className="card w-full">
      <PostCardHeader
        user={post.author}
        createdAt={new Date(post.created_at)}
        onDelete={() => deletePost(post.id)}
      />

      <div
        onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
        onDoubleClick={!isTouchDevice ? handleLike : undefined}
        className="cursor-pointer"
      >
        <PostCardContent post={post} />
      </div>

      <PostCardFooter post={post} onHeartClick={handleLike} />
    </Card>
  );
};

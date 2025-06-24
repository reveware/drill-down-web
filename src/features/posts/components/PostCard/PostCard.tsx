import React from 'react';
import { Card } from '@/components/ui/card';
import { PostOverview } from '@/types/post';
import { PostCardHeader } from './PostCardHeader';
import { PostCardFooter } from './PostCardFooter';
import { PostCardContent } from './PostCardContent/PostCardContent';
import { useDeletePost } from '../../hooks/useDeletePost';

interface PostCardProps {
  post: PostOverview;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

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
      <PostCardContent post={post} />
      <PostCardFooter post={post} />
    </Card>
  );
};

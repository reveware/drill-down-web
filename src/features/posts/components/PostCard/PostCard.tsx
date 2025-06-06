import React from 'react';
import { Card } from '@/components/ui/card';
import { PostOverview } from '@/types/post';
import { PostCardHeader } from './PostCardHeader';
import { PostCardFooter } from './PostCardFooter';
import { PostCardContent } from './PostCardContent/PostCardContent';

interface PostCardProps {
  post: PostOverview;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="card w-full">
      <PostCardHeader user={post.author} date={new Date(post.created_at)} />
      <PostCardContent post={post} />
      <PostCardFooter
        likeCount={post.like_count}
        commentCount={post.comment_count}
        tags={post.tags}
      />
    </Card>
  );
};

import React from 'react';
import { Card } from '@/components/ui/card';
import { PostOverview } from '@/types/post';
import PostHeader from './post-header';
import { PostContent } from './post-content';
import PostFooter from './post-footer';

interface PostCardProps {
  post: PostOverview;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="p-4 space-y-3 bg-surface rounded-md shadow-sm shadow-secondary">
      <PostHeader user={post.author} date={new Date(post.created_at)} />
      <PostContent post={post} />
      <PostFooter likeCount={post.like_count} commentCount={post.comment_count} />
    </Card>
  );
};

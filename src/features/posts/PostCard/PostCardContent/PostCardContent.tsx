import React from 'react';
import { PostOverview, PostTypes } from '@/types/post';
import { PostPhotoContent } from './PostPhotoContent';
import { PostQuoteContent } from './PostQuoteContent';

export const PostCardContent = ({ post }: { post: PostOverview }) => {
  if (post.type === PostTypes.PHOTO) {
    return <PostPhotoContent content={post.content} />;
  }
  if (post.type === PostTypes.QUOTE) {
    return <PostQuoteContent content={post.content} />;
  }
  return null;
};

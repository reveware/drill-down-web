import React from 'react';
import { PostOverview, PostTypes } from '@/types/post';
import { PostPhotoContent } from './PostPhotoContent';
import { PostQuoteContent } from './PostQuoteContent';

export const PostCardContent = ({ post }: { post: PostOverview }) => {
  if (post.type === PostTypes.PHOTO) {
    return <PostPhotoContent post={post} />;
  }
  if (post.type === PostTypes.QUOTE) {
    return <PostQuoteContent post={post} />;
  }
  return null;
};

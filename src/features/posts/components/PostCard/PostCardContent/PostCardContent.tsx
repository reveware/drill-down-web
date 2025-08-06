import React from 'react';
import { PostOverview, PostTypes } from '@/types/post';
import { ImagePostContent } from './ImagePostContent';
import { QuotePostContent } from './QuotePostContent';

export const PostCardContent = ({ post }: { post: PostOverview }) => {
  if (post.type === PostTypes.IMAGE) {
    return <ImagePostContent post={post} />;
  }
  if (post.type === PostTypes.QUOTE) {
    return <QuotePostContent post={post} />;
  }
  return null;
};

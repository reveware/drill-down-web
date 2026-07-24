import { PostOverview } from '@/types/post.types';
import { ImagePostContent } from './ImagePostContent';

export const PostCardContent = ({ post }: { post: PostOverview }) => {
  return <ImagePostContent post={post} />;
};

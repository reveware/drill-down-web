'use client';
import { PostOverview } from '@/types/post.types';
import { ImagePostForm } from './ImagePostForm';

interface CreatePostProps {
  onSuccess: (post: PostOverview) => void;
}

export const CreatePost = ({ onSuccess }: CreatePostProps) => {
  return <ImagePostForm onSuccess={onSuccess} />;
};

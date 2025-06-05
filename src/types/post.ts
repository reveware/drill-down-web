import { UserOverview } from './user';

export type PostOverview = {
  id: number;
  author: UserOverview;
  description: string | null;
  like_count: number;
  comment_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
} & PostContent;

export enum PostTypes {
  PHOTO = 'PHOTO',
  QUOTE = 'QUOTE',
}

export type PostContent =
  | { type: PostTypes.PHOTO; content: PhotoPostContent }
  | { type: PostTypes.QUOTE; content: QuotePostContent };

export interface PhotoPostContent {
  urls: string[];
  keys?: string[];
}

export interface QuotePostContent {
  quote: string;
  author: string;
  date?: Date;
  location?: string; // contry
}

export type PhotoPost = PostOverview & { type: PostTypes.PHOTO };

export type PostSearchParams = {
  id?: number;
  tags?: string[];
  author?: string;
  created_before?: string;
  created_after?: string;
};

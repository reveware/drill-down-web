import { PhotoPostContent, QuotePostContent } from './post';
import { UserOverview } from './user';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: PhotoPostContent | QuotePostContent | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

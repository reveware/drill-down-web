import { PhotoPost, QuotePost } from './post';
import { UserOverview } from './user';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: PhotoPost | QuotePost | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

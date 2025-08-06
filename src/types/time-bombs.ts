import { ImagePost, QuotePost } from './post';
import { UserOverview } from './user';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: ImagePost | QuotePost | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

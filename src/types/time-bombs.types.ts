import { ImagePost, QuotePost } from './post.types';
import { UserOverview } from './user.types';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: ImagePost | QuotePost | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

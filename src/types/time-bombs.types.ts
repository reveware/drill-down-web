import { PostOverview } from './post.types';
import { UserOverview } from './user.types';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: PostOverview | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

import { PostContent } from './post';
import { UserOverview } from './user';

export interface TimeBomb {
  id: number;
  author: UserOverview;
  recipient: UserOverview;
  content: PostContent | null;
  unlocks_at: string;
  created_at: string;
  updated_at: string;
}

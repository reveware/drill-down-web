import { PostOverview } from './post';
import { UserOverview } from './user';

export interface Like {
  id: string;
  post: PostOverview;
  author: UserOverview;
  created_at: Date;
  updated_at: Date;
}

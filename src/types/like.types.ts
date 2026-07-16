import { PostOverview } from './post.types';
import { UserOverview } from './user.types';

export interface Like {
  id: string;
  post: PostOverview;
  author: UserOverview;
  created_at: Date;
  updated_at: Date;
}

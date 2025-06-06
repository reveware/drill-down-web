import { UserDetail } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowersTab } from './ContentTabs/FollowersTab';
import { LikesTab } from './ContentTabs/LikesTab';
import { PostsTab } from './ContentTabs/PostsTab';

interface ProfileContentProps {
  user: UserDetail;
}

export const ProfileContent = ({ user }: ProfileContentProps) => {
  return (
    <Card className="card h-full w-full">
      <CardContent className="flex h-full w-full flex-col">
        <Tabs defaultValue="posts" className="flex h-full w-full flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="bg-primary/5 flex-1 overflow-hidden rounded-lg">
            <PostsTab user={user} />
          </TabsContent>

          <TabsContent value="followers" className="bg-primary/5 flex-1 overflow-hidden rounded-lg">
            <FollowersTab user={user} />
          </TabsContent>

          <TabsContent value="likes" className="bg-primary/5 flex-1 overflow-hidden rounded-lg">
            <LikesTab user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

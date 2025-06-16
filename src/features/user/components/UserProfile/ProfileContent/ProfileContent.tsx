import { UserDetail } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostsTab } from './PostsTab';
import { FollowersTab } from './FollowersTab';
import { LikesTab } from './LikesTab';

interface ProfileContentProps {
  user: UserDetail;
}

const TabContent = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <TabsContent value={value} className="bg-muted/10 flex-1 overflow-hidden rounded-lg">
    {children}
  </TabsContent>
);

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

          <TabContent value="posts">
            <PostsTab user={user} />
          </TabContent>

          <TabContent value="followers">
            <FollowersTab user={user} />
          </TabContent>

          <TabContent value="likes">
            <LikesTab user={user} />
          </TabContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

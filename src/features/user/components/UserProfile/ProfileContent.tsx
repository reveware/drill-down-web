import { UserDetail, UserOverview } from '@/types/user';
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
    <Card className="w-full card min-w-lg h-full">
      <CardContent>
        <Tabs defaultValue="posts" className="w-full ">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="bg-primary/5 rounded-lg h-full">
            <PostsTab user={user} />
          </TabsContent>

          <TabsContent value="followers" className="bg-primary/5 rounded-lg h-full">
            <FollowersTab user={user} />
          </TabsContent>

          <TabsContent value="likes" className="bg-primary/5 rounded-lg h-full">
            <LikesTab user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

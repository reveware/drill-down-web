'use client';
import { UserOverview } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';
import { FriendsList } from '../FriendsList';
import { ActivityFeed } from '../ActivityFeed';

interface ProfileContentProps {
  user: UserOverview;
  isOwnProfile?: boolean;
}

export const ProfileContent = ({ user, isOwnProfile = false }: ProfileContentProps) => {
  return (
    <Card className="card flex-1">
      <CardContent className="p-6">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="text-lg font-semibold mb-4">
              {isOwnProfile ? 'My Posts' : `${user.first_name}'s Posts`}
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              <PostFeed />
            </div>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <div className="text-lg font-semibold mb-4">Friends</div>
            <FriendsList user={user} isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="text-lg font-semibold mb-4">Recent Activity</div>
            <ActivityFeed user={user} isOwnProfile={isOwnProfile} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

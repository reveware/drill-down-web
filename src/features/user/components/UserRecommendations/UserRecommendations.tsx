import React from 'react';
import { UserRecommendation, RecommendationReason } from '@/types/recommendations';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useUserRecommendations } from '@/features/user/hooks/useUserRecommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import Link from 'next/link';
import { useFollowUser } from '@/features/follow/hooks/useFollowUser';
import { Dna } from '@/components/shared/Icons';

interface UserRecommendationsProps {
  userId: string;
}

export const UserRecommendations: React.FC<UserRecommendationsProps> = ({ userId }) => {
  const affinityQuery = useUserRecommendations(userId, RecommendationReason.AFFINITY);
  const popularQuery = useUserRecommendations(userId, RecommendationReason.POPULAR);

  const { mutate: followUser, isPending: isFollowing } = useFollowUser();

  const loading = affinityQuery.isLoading || popularQuery.isLoading;
  const affinityData = affinityQuery.data?.data || [];
  const popularData = popularQuery.data?.data || [];

  const all: UserRecommendation[] = [...popularData, ...affinityData];
  const recommendations = Array.from(new Map(all.map((r) => [r.user.id, r])).values());

  const handleFollow = (userToFollow: UserRecommendation) => {
    followUser(userToFollow.user.id);
  };

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="card mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="font-title text-lg font-semibold">Recommended users</CardTitle>
      </CardHeader>

      <CardContent className="h-full">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {recommendations.map((rec) => (
              <CarouselItem key={rec.user.id} className="basis-1/2 pl-4 sm:basis-1/2 lg:basis-1/3">
                <UserRecommendationCard
                  userRecommendation={rec}
                  onFollow={handleFollow}
                  isFollowing={isFollowing}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

const UserRecommendationCard: React.FC<{
  userRecommendation: UserRecommendation;
  onFollow: (recommendation: UserRecommendation) => void;
  isFollowing: boolean;
}> = ({ userRecommendation, onFollow, isFollowing }) => {
  const { user, reason, match } = userRecommendation;

  const MatchLabel = () => (
    <div className="mb-4 self-end">
      {reason === RecommendationReason.AFFINITY ? (
        <div className="text-accent flex items-center gap-2 text-xs font-extrabold">
          <Dna className="mr-1 h-4 w-4" />
          {match?.overall || 0}%
        </div>
      ) : (
        <div className="h-6 w-16"></div> // Placeholder to maintain layout
      )}
    </div>
  );

  return (
    <div className="card flex w-full max-w-48 flex-col items-center rounded-lg p-3 shadow-sm">
      <MatchLabel />

      <UserAvatar user={user} className="mb-2 h-12 w-12 rounded-full" />

      <Link href={`/user/${user.id}`}>
        <div className="text-on-surface text-foreground text-center text-sm font-bold">
          @{user.username}
        </div>
        <div className="text-muted mb-2 text-center text-xs">
          {user.first_name} {user.last_name}
        </div>
      </Link>

      <div className="text-accent mb-3 text-center text-xs font-medium tracking-widest uppercase">
        {reason}
      </div>

      <div className="mt-auto">
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={() => onFollow(userRecommendation)}
          disabled={isFollowing}
        >
          {isFollowing ? 'Following...' : 'Follow'}
        </Button>
      </div>
    </div>
  );
};

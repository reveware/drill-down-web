import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import { UserInfo } from '@/components/shared/UserInfo/UserInfo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FollowRequest } from '@/types/follow';
import { useApproveFollowRequest, useRejectFollowRequests } from '@/features/follow/hooks';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface FollowRequestItemProps {
  followRequest: FollowRequest;
}

export const FollowRequestItem = ({ followRequest }: FollowRequestItemProps) => {
  const { mutate: approveFollowRequest } = useApproveFollowRequest(followRequest.requester.id);
  const { mutate: rejectFollowRequest } = useRejectFollowRequests(followRequest.requester.id);

  return (
    <Card className="card max-w-md border-1">
      <div className="flex flex-col px-4 py-2">
        <div className="text-muted self-end text-xs">
          {formatDistanceToNow(new Date(followRequest.created_at), { addSuffix: true })}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <UserAvatar user={followRequest.requester} />
          <div className="flex-1">
            <UserInfo user={followRequest.requester} />
          </div>
        </div>

        <Separator />

        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => rejectFollowRequest(followRequest.id)}
            className="flex-1"
          >
            Reject
          </Button>
          <Button
            size="sm"
            variant="accent"
            onClick={() => approveFollowRequest(followRequest.id)}
            className="flex-1"
          >
            Approve
          </Button>
        </div>
      </div>
    </Card>
  );
};

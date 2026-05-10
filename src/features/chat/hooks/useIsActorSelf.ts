import { useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ActorRef {
  user?: { id: string };
}

/**
 * Returns a stable predicate that decides whether a given actor or
 * participant represents the authenticated user.
 * Single source of truth for "is this me?" across the chat feature
 */
export const useIsActorSelf = () => {
  const { user } = useAuth();
  const myUserId = user?.id;

  return useCallback(
    (actor: ActorRef | null | undefined) => {
      if (!myUserId || !actor?.user?.id) return false;
      return actor.user.id === myUserId;
    },
    [myUserId]
  );
};

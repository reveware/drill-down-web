'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/shared';

// A session is always in exactly one stage, and each route group belongs to one.
// When stage doesn't match the rendering group they're sent to the home of their actual stage.
export type SessionStage = 'guest' | 'incompleteAccount' | 'completeAccount';

const STAGE_HOME: Record<SessionStage, string> = {
  guest: '/login',
  incompleteAccount: '/onboarding',
  completeAccount: '/home',
};

const stageOf = (isAuthenticated: boolean, isOnboarded: boolean): SessionStage => {
  if (!isAuthenticated) {
    return 'guest';
  }
  return isOnboarded ? 'completeAccount' : 'incompleteAccount';
};

interface RouteGuardProps {
  stage: SessionStage;
  children: React.ReactNode;
}

export const RouteGuard = ({ stage, children }: RouteGuardProps) => {
  const { isAuthenticated, isOnboarded, isLoading } = useAuth();
  const router = useRouter();

  const current = isLoading ? null : stageOf(isAuthenticated, isOnboarded);

  useEffect(() => {
    if (current && current !== stage) {
      router.replace(STAGE_HOME[current]);
    }
  }, [current, stage, router]);

  if (isLoading) {
    return <Spinner className="min-h-screen" />;
  }

  if (current !== stage) {
    return null;
  }

  return <>{children}</>;
};

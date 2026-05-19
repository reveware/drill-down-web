'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserApi } from '@/api/endpoints/user.api';
import { OnboardingDto } from '@/types/user';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useOnboarding = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: OnboardingDto) => {
      if (!user?.id) {
        throw new Error('Your session has expired. Please sign in again.');
      }
      return await UserApi.updateUser(user.id, data);
    },
    onSuccess: (updatedUser) => {
      // The original token stays valid — no re-authentication needed.
      setUser(updatedUser);
      toast.success('Profile complete. Welcome!');
      router.replace('/home');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

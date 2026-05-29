'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from '@/api/endpoints/auth.api';
import { UserApi } from '@/api/endpoints/user.api';
import { SetPasswordDto } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useChangePassword = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SetPasswordDto) => AuthApi.setPassword(data),
    onSuccess: async () => {
      try {
        const refreshed = await UserApi.getCurrentUser();
        setUser(refreshed);
        queryClient.invalidateQueries({ queryKey: ['user', refreshed.id] });
      } catch {
        // password updated successfully; refresh is best-effort
        if (user) queryClient.invalidateQueries({ queryKey: ['user', user.id] });
      }
      toast.success('Password updated');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

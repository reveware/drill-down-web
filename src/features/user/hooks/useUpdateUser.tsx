'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserApi } from '@/api/endpoints/user.api';
import { UpdateUserDto } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useUpdateUser = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      if (!user?.id) {
        throw new Error('Your session has expired. Please sign in again.');
      }
      return await UserApi.updateUser(user.id, data);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });
      toast.success('Settings saved');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

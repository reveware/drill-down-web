'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { authApi } from '@/lib/api/endpoints/auth.api';
import { LoginDto } from '@/types/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginDto) => await authApi.login(data),
    onSuccess: (response) => {
      const token = response.data.token;

      login(token);

      toast.success('Welcome back!');
    },
  });
};

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
    onError: (error: any) => {
      // Error is already handled by axios interceptor, but we can add specific handling
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

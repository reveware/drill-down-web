'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { authApi } from '@/api/endpoints/auth.api';
import { LoginDto } from '@/types/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginDto) => await authApi.login(data),
    onSuccess: (response) => {
      toast.success('Welcome back!');
      const token = response.token;
      login(token);
    },
    onError: (error) => {
      console.log('Login failed', error);
      toast.error(error.message);
    },
  });
};

'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/providers/auth-provider';
import { authApi } from '@/lib/api/endpoints/auth';
import { LoginDto } from '@/types/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginDto) => await authApi.login(data),
    onSuccess: (response) => {
      const token = response.data.token;

      login(token);

      toast.success('Welcome back!');

      // Redirect to protected route
      router.push('/home');
    },
    onError: (error: any) => {
      // Error is already handled by axios interceptor, but we can add specific handling
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

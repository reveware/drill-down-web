'use client';

import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/api/endpoints/auth.api';
import { RegisterDto } from '@/types/auth';
import { toast } from '@/lib/toast';
import { useAuth } from '@/hooks/useAuth';

export const useRegister = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      return AuthApi.register(data);
    },
    onSuccess: (response) => {
      toast.success('Account created successfully!');
      const token = response.token;
      login(token);
    },
    onError: (error) => {
      console.log('Register failed', error);
      toast.error(error.message);
    },
  });
};

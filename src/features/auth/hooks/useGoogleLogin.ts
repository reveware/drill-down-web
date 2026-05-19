'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { AuthApi } from '@/api/endpoints/auth.api';
import { GoogleSsoDto } from '@/types/auth';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useGoogleLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: GoogleSsoDto) => await AuthApi.loginWithGoogle(payload),
    onSuccess: (response) => {
      toast.success('Welcome back!');
      login(response.token);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

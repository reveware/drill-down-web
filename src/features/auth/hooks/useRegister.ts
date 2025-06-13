'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth.api';
import { RegisterDto, CreateUserDto } from '@/types/auth';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';

export const useRegister = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      const createUserData: CreateUserDto = {
        avatar: data.avatar,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        date_of_birth: data.date_of_birth,
        tagline: data.tagline,
      };

      return authApi.register(createUserData);
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

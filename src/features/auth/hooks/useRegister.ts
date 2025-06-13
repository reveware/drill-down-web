'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth.api';
import { RegisterDto, CreateUserDto } from '@/types/auth';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { formatISO, startOfDay } from 'date-fns';

export const useRegister = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      const formData = new FormData();
      const dateOfBirth = startOfDay(new Date(data.date_of_birth));
      const formattedDate = formatISO(dateOfBirth);
      formData.append('avatar', data.avatar);
      formData.append('username', data.username);
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('date_of_birth', formattedDate);
      if (data.tagline) {
        formData.append('tagline', data.tagline);
      }

      return authApi.register(formData);
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

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/endpoints/auth.api';
import { RegisterDto, CreateUserDto } from '@/types/auth';
import { toast } from 'sonner';

export const useRegister = () => {
  const router = useRouter();

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

      router.push('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

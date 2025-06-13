import { apiClient } from '../client';
import { LoginDto, LoginResult, CreateUserDto } from '@/types/auth';
import { mockLogin, mockRegister } from '@/mocks/auth';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const authApi = {
  login: async (loginAttempt: LoginDto): Promise<LoginResult> => {
    console.log('login', { useMocks, loginAttempt });
    if (useMocks) {
      return mockLogin(loginAttempt);
    }
    return (await apiClient.post<LoginResult>('/auth/login', loginAttempt)).data;
  },

  register: async (formData: FormData): Promise<LoginResult> => {
    if (useMocks) {
      return mockRegister(formData);
    }
    return (
      await apiClient.post<LoginResult>('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  },
};

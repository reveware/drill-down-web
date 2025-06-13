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

  register: async (user: CreateUserDto): Promise<LoginResult> => {
    if (useMocks) {
      return mockRegister(user);
    }
    return (await apiClient.post<LoginResult>('/auth/register', user)).data;
  },
};

import { apiClient } from '../client';
import { LoginDto, LoginResult, CreateUserDto, RegisterResult } from '@/types/auth';
import { ApiResponse } from '@/types/response';
import { mockLogin, mockRegister } from '@/mocks/auth';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const authApi = {
  login: async (loginAttempt: LoginDto): Promise<ApiResponse<LoginResult>> => {
    console.log('login', { useMocks, loginAttempt });
    if (useMocks) {
      return mockLogin(loginAttempt);
    }
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth', loginAttempt)).data;
  },

  register: async (user: CreateUserDto): Promise<ApiResponse<RegisterResult>> => {
    if (useMocks) {
      return mockRegister(user);
    }
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth/register', user)).data;
  },
};

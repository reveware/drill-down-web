import { mockLogin, mockRegister } from '@/mocks/auth';
import { apiClient } from '../client';
import { LoginDto, LoginResult, CreateUserDto } from '@/types/auth';
import { ApiResponse } from '@/types/response';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const authApi = {
  login: async (loginAttempt: LoginDto): Promise<ApiResponse<LoginResult>> => {
    console.log('login', { useMocks, loginAttempt });
    if (useMocks) {
      return mockLogin(loginAttempt);
    }
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth', loginAttempt)).data;
  },

  // TODO: change return type to RegisterResult
  register: async (user: CreateUserDto): Promise<ApiResponse<any>> => {
    if (useMocks) {
      return mockRegister(user);
    }
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth/register', user)).data;
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    return (await apiClient.get<ApiResponse<any>>('/auth/me')).data;
  },
};

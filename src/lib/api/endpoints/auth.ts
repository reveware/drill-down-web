import { apiClient } from '../client';
import { LoginDto, RegisterDto, LoginResult } from '@/types/auth';
import { ApiResponse } from '@/types/response';

export const authApi = {
  login: async (loginAttempt: LoginDto): Promise<ApiResponse<LoginResult>> => {
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth', loginAttempt)).data;
  },

  register: async (user: RegisterDto): Promise<ApiResponse<LoginResult>> => {
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth/register', user)).data;
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    return (await apiClient.get<ApiResponse<any>>('/auth/me')).data;
  },
};

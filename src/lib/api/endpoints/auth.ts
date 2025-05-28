import { apiClient } from '../client';
import { LoginCredentials, RegisterCredentials, LoginResult, ApiResponse } from '@/types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResult>> => {
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth', credentials)).data;
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<LoginResult>> => {
    return (await apiClient.post<ApiResponse<LoginResult>>('/auth/register', credentials)).data;
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    return (await apiClient.get<ApiResponse<any>>('/auth/me')).data;
  },
};

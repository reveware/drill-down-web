import { apiClient } from '../client';
import { LoginDto, LoginResult, CreateUserDto, GoogleSsoDto, SetPasswordDto } from '@/types/auth';
import { mockLogin, mockRegister, mockSetPassword } from '@/mocks/auth';
import { USE_MOCKS } from '../constants';

export const AuthApi = {
  login: async (loginAttempt: LoginDto): Promise<LoginResult> => {
    if (USE_MOCKS) {
      return mockLogin(loginAttempt);
    }
    return (
      await apiClient.post<LoginResult>('/auth/login', {
        email: loginAttempt.email,
        password: loginAttempt.password,
      })
    ).data;
  },

  register: async (user: CreateUserDto): Promise<LoginResult> => {
    if (USE_MOCKS) {
      return mockRegister(user);
    }

    const formData = new FormData();

    if (user.avatar) {
      formData.append('avatar', user.avatar);
    }
    formData.append('username', user.username);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('date_of_birth', new Date(user.date_of_birth).toISOString());

    if (user.tagline) {
      formData.append('tagline', user.tagline);
    }

    return (
      await apiClient.post<LoginResult>('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  },

  // No USE_MOCKS branch: SSO requires the real GIS widget + backend verification
  loginWithGoogle: async (payload: GoogleSsoDto): Promise<LoginResult> => {
    return (await apiClient.post<LoginResult>('/auth/sso/google', payload)).data;
  },

  setPassword: async (payload: SetPasswordDto): Promise<void> => {
    if (USE_MOCKS) {
      return mockSetPassword(payload);
    }
    await apiClient.put('/auth/password', payload);
  },
};

import { apiClient } from '../client';
import { LoginDto, LoginResult, CreateUserDto } from '@/types/auth';
import { mockLogin, mockRegister } from '@/mocks/auth';
import { formatISO, startOfDay } from 'date-fns';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const AuthApi = {
  login: async (loginAttempt: LoginDto): Promise<LoginResult> => {
    if (useMocks) {
      return mockLogin(loginAttempt);
    }
    return (await apiClient.post<LoginResult>('/auth/login', loginAttempt)).data;
  },

  register: async (user: CreateUserDto): Promise<LoginResult> => {
    if (useMocks) {
      return mockRegister(user);
    }

    const formData = new FormData();
    const dateOfBirth = startOfDay(new Date(user.date_of_birth));
    const formattedDate = formatISO(dateOfBirth);

    formData.append('avatar', user.avatar);
    formData.append('username', user.username);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('date_of_birth', formattedDate);

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
};
